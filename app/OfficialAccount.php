<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\UserOfficialAccount;

class OfficialAccount extends Model
{
    protected $guarded = [
        'id'
    ];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_official_account')
            ->using(UserOfficialAccount::class)->withPivot(['permission_id']);
    }

    public function line_users()
    {
        return $this->hasMany('App\LineUser', 'account_id');
    }
}
