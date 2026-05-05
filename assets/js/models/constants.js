const FPS = 1000/60;


const CANVAS_W = 800;
const CANVAS_H = 1000;

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_SPACEBAR = 32;
const GAME_KEYS = [KEY_RIGHT, KEY_LEFT, KEY_UP, KEY_DOWN, KEY_SPACEBAR];
const INVENCIBILITY_TIME = 1000;
const SCORE_SCREEN_TIME = 600;

const FLOOR = 50;

const SCALE = 2;

const SPRITE_SRC = '/assets/img/sprites/Mario Pauline Donkey Kong  Miscellaneous.png'

const PLATAFORM_TILE_SX = 203;
const PLATAFORM_TILE_SY = 731;
const PLATAFORM_TILE_W = 16;
const PLATAFORM_TILE_H = 8;

const LEVEL_DATA = [
   { y: 965, x: 0, length: 26},
   { y: 850, x: 0, length: 20 }, //Floor_1
   { y: 650, x: 160, length: 22}, //Floor 2
   { y: 450, x: 0, length: 20}, //Floor 3 
   { y: 250, x: 160, length: 18}, //TemporalFinishLine
];

const LADDER_TILE_SX = 129;
const LADDER_TILE_SY = 723;
const LADDER_TILE_W = 10;
const LADDER_TILE_H = 16;

const LADDER_DATA = [
    {x: 640, y: 850,  h: 115},
    {x: 140, y: 650, h: 200}, // 1 => 2
    {x: 640, y: 450, h: 200}, // 2 => 3
    {x: 140, y: 250, h: 200} // 3 => 4
];  

const MARIO_W = 16;
const MARIO_H = 16;
const MARIO_VX = 3;
const MARIO_VY = 6; 
const MARIO_GRAVITY = 0.3;
const MARIO_START_X = 150;
const MARIO_START_Y = 150;


const BARREL_W = 12;
const BARREL_H = 10;
const BARREL_VX = -5;
const BARRELS_MAX = 10;
const BARREL_SPAWN_MIN = 10;
const BARREL_SPAWN_MAX = 60;
const BARREL_SCORE = 100;


const LIVE_X = 700;
const LIVE_Y = 20;
const LIVE_W = 7;
const LIVE_H = 8;
const LIVE_SX = 415;
const LIVE_SY = 731;
const LIVE_MARGIN = 25;

const SCORE_SPRITES = {
    100: { sx: 446, sy: 732, w: 15, h: 7 },
    300: { sx: 469, sy: 732, w: 15, h: 7 },
    500: { sx: 492, sy: 732, w: 15, h: 7 },
    800: { sx: 515, sy: 732, w: 15, h: 7 }
};

