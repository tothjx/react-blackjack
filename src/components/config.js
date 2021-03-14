export const APP_NAME			= 'blackjack';
export const APP_VERSION		= '1.0';
export const APP_EMAIL			= 'info@tothj.com';
export const APP_ENV			= 'prod';
export const DEBUG				= (APP_ENV === 'dev') ? true : false;
export const COOKIE_LIFETIME	= 30;
export const SCORE_LIMIT		= 10;
export const CLUB 				= '&clubs;';	// ♣ treff
export const DIAM 				= '&diams;';	// ♦ karo
export const HEART 				= '&hearts;';	// ♥ kor
export const SPADE 				= '&spades;';	// ♠ pikk
export const DECK 				= ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
export const PLAYER				= 'player';
export const BANK				= 'bank';
export const LINES				= '========================================';
export const STARS				= '****************************************';

export const MAIN_TITLE 		= '52 lapos blackjack';
export const TITLE_PLAYER 		= 'játékos';
export const TITLE_BANK 		= 'bank';
export const START				= 'start';
export const GIVE_ME_CARD 		= 'lapot kérek';
export const STOP 				= 'megállok';
export const NEW_ROUND			= 'új játék';
export const RESET				= 'pontok törlése';
export const HELP				= 'súgó';
export const HELP_TITLE			= 'Súgó';

export const HELP_TEXT_1 = 'A játék az osztó (a továbbikban: bank) és a játékos között zajlik, egy pakli 52 lapos francia kártyával (joker-ek nélkül). A számértékű lapok (2, 3, 4, 5, 6, 7, 8, 9, 10) annyit érnek amennyi rájuk van írva, a figurális lapok (J, Q, K) 10-et, kivéve az ászt (A), amely 11-et.';

export const HELP_TEXT_2 = 'Kezdéskor a bank oszt egy lapot a játékosnak felfelé fordítva, majd egyet magának lefordítva. Ezt megismétli, majd indul a játék. A játékos addig kér lapot magának amíg szeretne. A cél hogy minél közelebb legyen a lapjainak összértéke a 21-hez, de ne haladja meg azt (a játékos legyőzze a bankot). Ha ezt meghaladja (besokall), a játékos azonnal veszít. Ez esetben a bank nem kell hogy megmutassa a saját lapjait. Ha a játékos megállt, akkor a bank addig oszt magának amíg el nem éri a célt (kész lesz a keze). Az nyer akinek lapjai összértéke közelebb van a 21-hez. Ha a bank és a játékos kezében is egyaránt 21 van, akkor senki nem kap pontot, tudniillik, nem sikerült legyőzni a bankot.';

export const HELP_TEXT_3 = 'Minden nyert kör után a nyertes 1 pontot kap, kivéve ha osztásnál kézbe 21-et kap a játékos/bank. Ez minden esetben egy 10-es értékű lap és egy ász. Ezt blackjack-nek nevezzük, és dupla pontot ér. Ha a bank és a játékos is blackjack-et kap kézbe, akkor senki nem kap pontot.';

export const HELP_TEXT_4 = 'Érdemes figyelembe venni a játék során a bank algoritmusát, amelyet lap kérésekor követ. Ha a bank lapjainak összértéke 16 vagy kevesebb, akkor minden esetben kér lapot. Amennyiben ez az érték 17 vagy afeletti, akkor automatikusan megáll. Ez garantálja matematikailag a legjobb esélyeket, ezért megfontolandó a használata.';
