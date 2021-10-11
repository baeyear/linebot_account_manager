<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public $successStatus = 200;
    public $TRUE = 1;
    public $FALSE = 1;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyPermission(Request $request)
    {
        try {
            $user = User::find($request->user_id);
            $user->official_accounts()->detach($request->official_account_id);
            if (Auth::id() == $request->user_id) {
                return response()->json([
                    'message' => '権限が削除されました。',
                    'deletedOwn' => $this->TRUE
                ], 200);
            } else {
                return response()->json([
                    'message' => '権限が削除されました。',
                    'deletedOwn' => $this->FALSE
                ], 200);
            }
        } catch (\Throwable $th) {
            Log::error($th);
            return response()->json([
                'message' => '権限を削除できませんでした。'
            ], 500);
        }
    }
}
