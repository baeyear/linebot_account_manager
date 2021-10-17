<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Events\CallbackEvent;
use App\OfficialAccount;
use App\LineUser;
use App\Chat;

class CallbackController extends Controller
{
    /**
     * function called when event in LINE happens.
     *
     * @return \Illuminate\Http\Response
     */
    public function callback(Request $request, $id)
    {
        $official_account = OfficialAccount::find($id)->first();
        $httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient($official_account->access_token);
        $bot = new \LINE\LINEBot($httpClient, ['channelSecret' => $official_account->channel_secret]);

        $inputs = $request->all();

        if ($inputs['events'] == []) {
            return response()->json([], 200);
        }

        $message_type = $inputs['events'][0]['type'];

        if ($message_type == 'message') {
            $reply_token = $inputs['events'][0]['replyToken'];

            $reply_message = 'メッセージありがとうございます';

            $reply = $bot->replyText($reply_token, $reply_message);

            $userId = $request['events'][0]['source']['userId'];
            $message = $request['events'][0]['message']['text'];
            $user = $official_account->line_users->where('line_id', $userId)->first();
            if ($user == NULL) {
                $profile = $bot->getProfile($userId)->getJSONDecodedBody();

                $user = new LineUser();
                $user->line_id = $userId;
                $user->account_id = $official_account->id;
                $user->displayname = $profile['displayName'];
                $user->user_picture_url = $profile['pictureUrl'];
                $user->save();
            }
            $user->current_chat = $message;
            $user->is_read_by_admin = false;
            $user->is_replied_by_admin = false;
            $user->save();

            $chat = new Chat();
            $chat->line_id = $user->id;
            $chat->chat = $message;
            $chat->is_sent_by_admin = false;
            $chat->save();

            event(new CallbackEvent($chat, $user->id));

            return 'ok';
        }
    }

    /**
     * function called when event in LINE happens.
     *
     * @return \Illuminate\Http\Response
     */
    public function push_message(Request $request)
    {
        $official_account = OfficialAccount::find($request->official_account_id)->first();
        $httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient($official_account->access_token);
        $bot = new \LINE\LINEBot($httpClient, ['channelSecret' => $official_account->channel_secret]);

        $message = $request->chat;
        $line_id = $request->line_id;
        $textMessageBuilder = new \LINE\LINEBot\MessageBuilder\TextMessageBuilder($message);
        $bot->pushMessage($line_id, $textMessageBuilder);

        $user = $official_account->line_users->where('line_id', $line_id)->first();
        $user->current_chat = $message;
        $user->is_read_by_admin = true;
        $user->is_replied_by_admin = true;
        $user->save();

        $chat = new Chat();
        $chat->line_id = $user->id;
        $chat->chat = $message;
        $chat->is_sent_by_admin = true;
        $chat->save();

        return response()->json($chat, 200);
    }
}
