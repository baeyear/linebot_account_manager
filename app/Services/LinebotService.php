<?php

namespace App\Services;

use App\Repositories\LinebotRepositoryInterface;
use Illuminate\Http\JsonResponse;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use \LINE\LINEBot;
use \LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class LinebotService
{
    protected $linebotRepository;
    protected $bot;
    protected $officialAccount;

    /**
     * LinebotService constructor.
     *
     * @param LinebotRepository $linebotRepository
     */
    public function __construct(LinebotRepositoryInterface $linebotRepository)
    {
        $this->linebotRepository = $linebotRepository;
    }

    /**
     * LinebotService constructor.
     *
     * @param LinebotRepository $linebotRepository
     * @param int $officialAccountId
     */
    public function __invoke($officialAccountId)
    {
        $this->officialAccount = $this->linebotRepository->findOfficialAccount($officialAccountId);
        $httpClient = new CurlHTTPClient($this->officialAccount->access_token);
        $this->bot = new LINEBot($httpClient, ['channelSecret' => $this->officialAccount->channel_secret]);
        return $this;
    }

    /**
     * ユーザーからのチャット処理
     *
     * @param Request $request
     */
    private function handle($request)
    {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            if ($input['events'] == []) {
                $this->handleNoInput();
            }

            $message_type = $inputs['events'][0]['type'];
            if ($message_type == 'message') {
                $this->handleMessage($request);
            } else {

            }
        }
    }

    /**
     * メッセージに対する処理
     * @param Request $request
     * @return void
     */
    public function handleMessage($request)
    {
        $userId = $request['events'][0]['source']['userId'];
        $message = $request['events'][0]['message']['text'];

        $profile = $this->bot->getProfile($userId)->getJSONDecodedBody();

        $user = $this->LinebotRepository->findOrCreateUser($userId, $profile);
        $this->LinebotRepository->updateCurrentChat($message, $user);
        $chat = $this->LinebotRepository->storeMessage($message, $user);
        event(new CallbackEvent($chat, $user->id));
    }

    /**
     * テスト応答
     *
     * @return JsonResponse
     */
    public function handleNoInput()
    {
        return response()->json([], 200);
    }

    /**
     * 管理者からメッセージ送信
     * @param Request $request
     * @return void
     */
    public function pushMessage($request)
    {
        $line_id = $request->line_id;
        $message = $request->chat;
        $textMessageBuilder = new TextMessageBuilder($message);
        $this->bot->pushMessage($line_id, $textMessageBuilder);

        $user = $this->linebotRepository->findUser($this->officialAccount, $line_id);
        $this->linebotRepository->updateCurrentChat($message, $user, true, true);
        $chat = $this->linebotRepository->storeMessage($message, $user, true);

        return $chat;
    }
}
