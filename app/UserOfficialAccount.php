<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;
use App\OfficialAccountPermission;

class UserOfficialAccount extends Pivot
{
    protected $table = 'user_official_account';

    public function official_account_permission()
    {
        return $this->belongsTo(OfficialAccountPermission::class, 'permission_id');
    }
}
