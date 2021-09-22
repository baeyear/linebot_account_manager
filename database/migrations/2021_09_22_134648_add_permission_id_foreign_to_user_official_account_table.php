<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPermissionIdForeignToUserOfficialAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_official_account', function (Blueprint $table) {
            $table->foreign('permission_id')
                ->references('id')->on('official_account_permissions')
                ->onDelete('set null');
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
            $table->dropForeign('permission_id');
        });
    }
}
