<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
    public function callback(Request $request, $account)
    {
        $official_account = OfficialAccount::where('webhook_url', $account)->first();
        $httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient($official_account->access_token);
        $bot = new \LINE\LINEBot($httpClient, ['channelSecret' => $official_account->channel_secret]);

        $inputs = $request->all();
        $message_type = $inputs['events'][0]['type'];

        if ($message_type == 'message') {
            $reply_token = $inputs['events'][0]['replyToken'];

            $reply_message = 'メッセージありがとうございます';

            $reply = $bot->replyText($reply_token, $reply_message);

            $userId = $request['events'][0]['source']['userId'];
            $message = $request['events'][0]['message']['text'];
            $user = LineUser::where('line_id', $userId)->first();
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

            $lineUser = $official_account->line_users->where('line_id', $userId)->first();

            $chat = new Chat();
            $chat->line_id = $lineUser->id;
            $chat->chat = $message;
            $chat->is_sent_by_admin = false;
            $chat->save();

            return 'ok';
        }
    }
}
