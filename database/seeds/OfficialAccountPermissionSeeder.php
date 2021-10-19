<?php

use Illuminate\Database\Seeder;

class OfficialAccountPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [['name' => '管理者'], ['name' => '使用者']];
        DB::table('official_account_permissions')->insert($permissions);
    }
}
