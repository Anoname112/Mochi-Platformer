const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isPortrait = window.innerWidth < window.innerHeight;

const interval = 15;
const yPad = 0;
const scaling = 1.5;
const deathPadding = 600;
const gravity = 10;		// Must be smaller than 15

const bodyBackColor = "#1F1F1F";
const bodyFontColor = "#FFFFFF";
const bodyFont = "15px Segoe UI";
const canvasBorderRadius = 0;
const canvasBackColor = "#FFFFFF";
const canvasPosition = "fixed";
const audioVisibility = "hidden";
const msgPad = 15;
const msgFontColor = "#000000";
const msgFontSize = 15 * scaling;
const msgSpacing = (isMobile || isPortrait) ? 5 + scaling * 5 : 4 + scaling * 6;
const msgFont = msgFontSize + "px Consolas";

// Animation
const invinTime = 30;
const healDelay = 50;
const jumpTime = 21;
const attackTime = 13;
const attackTime23 = attackTime * 2 / 3;

// Player
const playerHealth = 5;
const playerAttack = 5;
const playerSpeed = 5;  // Must be smaller than 15
const stepCounter = 15;

// Heart
const animSpeed = 0.1;
const animMax = 3;

// Enemy
const enemyHealth = 20;
const enemyAttack = 1;
const enemySpeed = 1;
const enemyHpColor = "#5D0F0D";

// Platform
const platThick = 50;
const platColor = "#F9A965";    // SandyBrown

// HP bar
const hpBarWidth = 100;
//const hpBarBack = "#F0F0F0";
//const hpBarGreen = "#00FF00";
//const hpBarYellow = "#FFFF00";
//const hpBarRed = "#FF0000";

// Sound
const bgmPath = "resources/music_bgm.mp3";
const jumpPath = "resources/music_jump.mp3";
const attackPath = "resources/music_attack.wav";

// Control
const controlPadding = 10;
const controlSize = 80;