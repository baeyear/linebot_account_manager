<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OfficialAccount extends Model
{
    protected $guarded = [
        'id'
    ];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_official_account');
    }

    public function line_users()
    {
        return $this->hasMany('App\LineUser');
    }
}
