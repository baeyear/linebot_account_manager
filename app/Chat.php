<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $guarded = [
        'id'
    ];

    public function line_users()
    {
        return $this->belongsTo('App\LineUser', 'line_id');
    }
}
