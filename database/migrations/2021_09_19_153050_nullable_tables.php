<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NullableTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('permission_id')->default(0)->nullable()->change();
        });
        Schema::table('official_accounts', function (Blueprint $table) {
            $table->text('webhook_url')->nullable()->change();
            $table->text('access_token')->nullable()->change();
            $table->text('channel_secret')->nullable()->change();
            $table->text('channel_id')->nullable()->change();
        });
        Schema::table('line_users', function (Blueprint $table) {
            $table->text('line_id')->nullable()->change();
            $table->text('user_picture_url')->nullable()->change();
            $table->text('displayname')->nullable()->change();
            $table->text('current_chat')->nullable()->change();
            $table->boolean('is_read_by_admin')->nullable()->change();
            $table->boolean('is_replied_by_admin')->nullable()->change();
        });
        Schema::table('chats', function (Blueprint $table) {
            $table->text('chat')->nullable()->change();
            $table->text('chat_picture_url')->nullable()->change();
            $table->text('stamp')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('permission_id')->default(0)->nullable(false)->change();
        });
        Schema::table('official_accounts', function (Blueprint $table) {
            $table->text('webhook_url')->nullable(false)->change();
            $table->text('access_token')->nullable(false)->change();
            $table->text('channel_secret')->nullable(false)->change();
            $table->text('channel_id')->nullable(false)->change();
        });
        Schema::table('line_users', function (Blueprint $table) {
            $table->text('line_id')->nullable(false)->change();
            $table->text('user_picture_url')->nullable(false)->change();
            $table->text('displayname')->nullable(false)->change();
            $table->text('current_chat')->nullable(false)->change();
            $table->boolean('is_read_by_admin')->nullable(false)->change();
            $table->boolean('is_replied_by_admin')->nullable(false)->change();
        });
        Schema::table('chats', function (Blueprint $table) {
            $table->text('chat')->nullable(false)->change();
            $table->text('chat_picture_url')->nullable(false)->change();
            $table->text('stamp')->nullable(false)->change();
        });
    }
}
