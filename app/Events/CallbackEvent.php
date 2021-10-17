<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Chat;
use Illuminate\Support\Facades\Log;

class CallbackEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $chat;
    public $line_user_id;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Chat $chat, $line_user_id)
    {
        $this->chat = $chat;
        $this->line_user_id = $line_user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        Log::info('callbackChannel.' . $this->line_user_id);
        return new PrivateChannel('callbackChannel.' . $this->line_user_id);
    }
}
