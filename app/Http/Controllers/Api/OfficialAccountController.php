<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateOfficialAccountRequest;
use Illuminate\Support\Facades\DB;
use App\OfficialAccount;
use App\User;
use App\UserOfficialAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class OfficialAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * display official accounts whose owner is user logins in the site.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(Auth::id());
        $official_accounts = $user->official_accounts;
        $official_accounts->map(function ($official_account) {
            $official_account['permission_name'] = $official_account->pivot->official_account_permission->name;
        });
        return response()->json($official_accounts->all(), 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOfficialAccountRequest $request)
    {
        DB::beginTransaction();
        try {
            // DBに同一データがないか確認
            $official_account = OfficialAccount::create(
                [
                    'access_token' => $request->access_token,
                    'channel_id' => $request->channel_id,
                    'channel_secret' => $request->channel_secret
                ]
            );

            // LINEにリクエスト
            $update_status = $this->updateWebhook($official_account);
            $bot_json = $this->getBotName($official_account);

            // webhook, botnameの登録
            $official_account->name = json_decode($bot_json, true)['displayName'];
            $official_account->webhook_url = url('/api/callback/' . $official_account->id);
            $official_account->save();

            // 中間テーブルへの登録
            $permission_id = 1;
            $user_official_account = new UserOfficialAccount();
            $user_official_account->user_id = Auth::id();
            $user_official_account->official_account_id = $official_account->id;
            $user_official_account->permission_id = $permission_id;
            $user_official_account->save();

            $official_account['permission_name'] = $official_account->pivot->official_account_permission->name;
            DB::commit();
            return response()->json($official_account, 200);
        } catch (\Throwable $th) {
            Log::debug($th);
            DB::rollback();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Display an official account.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $official_account = OfficialAccount::find($id);
        return response()->json($official_account, 200);
    }

    /**
     * Display users an official account has.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showUsers($id)
    {
        $official_account = OfficialAccount::find($id);
        $users = $official_account->users;
        foreach ($users as $user) {
            $user['permission_name'] = $user->pivot->official_account_permission->name;
        }

        return response()->json($users, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Update webhook url
     *
     * @param  \App\OfficialAccount  $official_account
     *
     * @return int $status
     */
    public function updateWebhook($official_account)
    {
        try {
            $webhook = url('/api/callback/' . $official_account->id);
            $access_token = $official_account->access_token;

            $client = new Client();
            $options = [
                'headers' => [
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type' => 'application/json'
                ],
                'json' => [
                    'endpoint' => $webhook
                ]
            ];

            $response = $client->put('https://api.line.me/v2/bot/channel/webhook/endpoint', $options);
            $status = $response->getStatusCode();

            if ($status == 200) {
                return $status;
            } else {
                return abort(500, 'webhook URLをLINEに登録できませんでした。');
            }
        } catch (\Throwable $th) {
            Log::error($th);
            abort(500, 'webhook URLをLINEに登録できませんでした。');
        }
    }

    /**
     * fetch bot name from LINE
     *
     * @param  \App\OfficialAccount  $official_account
     *
     * @return string $response
     */
    public function getBotName($official_account)
    {
        try {
            $access_token = $official_account->access_token;

            $client = new Client();
            $options = [
                'headers' => [
                    'Authorization' => 'Bearer ' . $access_token,
                ]
            ];

            $response = $client->get('https://api.line.me/v2/bot/info', $options);
            $status = $response->getStatusCode();

            if ($status == 200) {
                return $response->getBody();
            } else {
                return abort('アカウント名をLINEから取得できませんでした。', 500);
            }
        } catch (\Throwable $th) {
            Log::error($th);
            return abort('アカウント名をLINEから取得できませんでした。', 500);
        }
    }

    /**
     * fetch bot name, and update webhook of LINE
     *
     * @param  \App\OfficialAccount  $official_account
     *
     * @return string $response
     */
    public function checkAccount(Request $request)
    {
        DB::beginTransaction();
        try {
            // DBに同一データがないか確認
            $official_account = OfficialAccount::find($request->id);

            // LINEにリクエスト
            $update_status = $this->updateWebhook($official_account);
            $bot_json = $this->getBotName($official_account);

            // webhook, botnameの登録
            $official_account->name = json_decode($bot_json, true)['displayName'];
            $official_account->webhook_url = url('/api/callback/' . $official_account->id);
            $official_account->save();

            DB::commit();
            return response()->json(['message' => 'webhookURLとアカウント名を更新しました。', 'officialAccount' => $official_account], 200);
        } catch (\Throwable $th) {
            Log::debug($th);
            DB::rollback();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
