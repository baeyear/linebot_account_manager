<?php

namespace App\Repositories;

use App\Chat;
use App\LineUser;

interface LinebotRepositoryInterface
{
    public function getUser($officialAccount, $userId): LineUser;
    public function findOrCreateUser($userId, $profile): LineUser;
    public function updateCurrentChat($message, $lineUser, $isReadByAdmin, $isRepliedByAdmin): LineUser;
    public function storeMessage($message, $lineUser, $isSentByAdmin): Chat;
}
