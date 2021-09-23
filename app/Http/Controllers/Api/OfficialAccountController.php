<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\OfficialAccount;
use App\User;
use App\UserOfficialAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $official_account = new OfficialAccount();
        $official_account->name = $request->name;
        // need to fix #一致判定
        $official_account->webhook_url = Str::random(50);
        $official_account->access_token = $request->access_token;
        $official_account->channel_secret = $request->channel_secret;
        $official_account->channel_id = $request->channel_id;
        $official_account->save();

        $official_account_id = $official_account->id;
        $user_id = Auth::id();
        $permission_id = 1;

        $user_official_account = new UserOfficialAccount();
        $user_official_account->user_id = $user_id;
        $user_official_account->official_account_id = $official_account_id;
        $user_official_account->permission_id = $permission_id;
        $user_official_account->save();

        return response()->json($official_account, 200);
    }

    /**
     * Display the specified resource.
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
}
