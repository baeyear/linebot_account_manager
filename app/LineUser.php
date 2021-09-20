<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LineUser extends Model
{
    protected $guarded = [
        'id'
    ];

    public function official_accounts()
    {
        return $this->belongsTo('App\OfficialAccount', 'account_id');
    }

    public function chats()
    {
        return $this->hasMany('App\Chat', 'line_id');
    }
}
