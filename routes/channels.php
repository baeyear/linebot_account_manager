<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\LineUser;

Broadcast::channel('callbackChannel.{line_user_id}', function ($user, $line_user_id) {
    $authenticated_users = LineUser::find($line_user_id)->official_accounts()->users;
    if ($authenticated_users->find($user->id) == null) {
        return false;
    } else {
        return true;
    }
});
