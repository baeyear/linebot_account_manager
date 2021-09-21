<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserOfficialAccount extends Model
{
    protected $table = 'user_official_account';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];
}
