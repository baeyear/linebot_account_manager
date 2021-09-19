<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserOfficialAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_official_account', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')
            ->references('id')->on('users')
            ->onDelete('cascade');

            $table->bigInteger('official_account_id')->unsigned()->nullable();
            $table->foreign('official_account_id')
            ->references('id')->on('official_accounts')
            ->onDelete('set null');

            $table->bigInteger('permission_id')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_official_account', function (Blueprint $table) {
            $table->dropForeign('user_official_account_official_account_id_foreign');
            $table->dropForeign('user_official_account_user_id_foreign');
            });
        Schema::dropIfExists('user_official_account');
    }
}
