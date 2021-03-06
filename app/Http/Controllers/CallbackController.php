<?php

namespace App\Http\Controllers;

use App\Services\LinebotService;
use Illuminate\Http\Request;

class CallbackController extends Controller
{
    protected $linebotService;

    public function __invoke(Request $request, LinebotService $linebotService, $officialAccountId)
    {
        $this->linebotService = $linebotService($officialAccountId);
        $this->linebotService->handle($request);
    }
}
