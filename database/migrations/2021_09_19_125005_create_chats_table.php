<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('line_id')->unsigned();
            $table->foreign('line_id')
            ->references('id')->on('line_users')
            ->onDelete('cascade');

            $table->text('chat');
            $table->text('chat_picture_url');
            $table->text('stamp');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chats', function (Blueprint $table) {
            $table->dropForeign('chats_line_id_foreign');
            });
        Schema::dropIfExists('chats');
    }
}
