<?php

namespace App\Http\Controllers;

use App\Services\LinebotService;
use Illuminate\Http\Request;

class LineController extends Controller
{
    protected $linebotService;

    public function __invoke(Request $request, LinebotService $linebotService)
    {
        $this->linebotService = $linebotService($request->official_account_id);
        $chat = $this->linebotService->pushMessage($request);
        return response()->json($chat, 200);
    }
}
