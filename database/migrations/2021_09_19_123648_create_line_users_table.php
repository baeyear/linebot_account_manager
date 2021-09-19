<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLineUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('line_users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('account_id')->unsigned();
            $table->foreign('account_id')
            ->references('id')->on('official_accounts')
            ->onDelete('cascade');

            $table->text('line_id');
            $table->text('user_picture_url');
            $table->text('displayname');
            $table->text('current_chat');
            $table->boolean('is_read_by_admin');
            $table->boolean('is_replied_by_admin');
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
        Schema::create('line_users', function (Blueprint $table) {
            $table->dropForeign('line_users_account_id_foreign');
            });
        Schema::dropIfExists('line_users');
    }
}
