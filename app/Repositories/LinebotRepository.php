<?php

namespace App\Repositories;

use App\Chat;
use App\LineUser;
use App\OfficialAccount;
use App\Repositories\LinebotRepositoryInterface;

class LinebotRepository implements LinebotRepositoryInterface
{
    /**
     * LinebotService invoke.
     *
     * @param int $officialAccountId
     * @return OfficialAccount
     */
    public function findOfficialAccount($officialAccountId): OfficialAccount
    {
        $officialAccount = OfficialAccount::find($officialAccountId)->first();
        return $officialAccount;
    }

    /**
     * ユーザー検索
     * @param string $userId
     *
     * @return LineUser
     */
    public function findUser($officialAccount, $userId): LineUser
    {
        $user = $officialAccount->line_users->where('line_id', $userId)->first();
        return $user;
    }

    /**
     * ユーザー作成
     * @param string $userId
     *
     * @return LineUser
     */
    public function findOrCreateUser($userId, $profile): LineUser
    {

        $user = $this->official_account->line_users->where('line_id', $userId)->first();

        if ($user == null) {
            $user = new LineUser();
            $user->line_id = $userId;
            $user->account_id = $this->officialAccount->id;
            $user->displayname = $profile['displayName'];
            $user->user_picture_url = $profile['pictureUrl'];
            $user->save();
        }

        return $user;
    }

    /**
     * 最新メッセージの更新
     * @param string $message
     * @param LineUser $lineUser
     *
     * @return LineUser
     */
    public function updateCurrentChat($message, $lineUser, $isReadByAdmin, $isRepliedByAdmin): LineUser
    {
        $lineUser->current_chat = $message;
        $lineUser->is_read_by_admin = $isReadByAdmin;
        $lineUser->is_replied_by_admin = $isRepliedByAdmin;
        $lineUser->save();

        return $lineUser;
    }

    /**
     * メッセージの保存
     * @param string $message
     * @param LineUser $lineUser
     *
     * @return Chat
     */
    public function storeMessage($message, $lineUser, $isSentByAdmin): Chat
    {
        $chat = new Chat();
        $chat->line_id = $lineUser->id;
        $chat->chat = $message;
        $chat->is_sent_by_admin = $isSentByAdmin;
        $chat->save();

        return $chat;
    }
}
