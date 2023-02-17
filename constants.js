const interval = 15;
const yPad = 0;
const scaling = 1.5;
const deathPadding = 600;
const gravity = 10;		// Must be smaller than 15

const bodyBackColor = "#1f1f1f";
const bodyTextColor = "#fff";
const bodyFont = "15px Segoe UI";
const canvasBorderRadius = 0;
const canvasBackColor = "#fff";
const canvasPosition = "fixed";
const audioVisibility = "hidden";
const msgY = 15;
const msgTextColor = "#000";
const msgFontSize = 15 * scaling;
const msgSpacing = 4 + scaling * 6;
const msgFont = msgFontSize + "px Consolas";

// Animation
const invinTime = 30;
const healDelay = 50;
const jumpTime = 21;
const attackTime = 12;	// Diviable by 3
const attackTime3 = attackTime / 3;

// Player
const playerHealth = 17;
const playerAttack = 5;	
const playerSpeed = 5;	// Must be smaller than 15
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
const platColor = "#f9a965";	// SandyBrown

// HP bar
const hpBarWidth = 100;
//const hpBarBack = "#f0f0f0";
//const hpBarGreen = "#0f0";
//const hpBarYellow = "#ff0";
//const hpBarRed = "#f00";

// Sound
const bgmPath = "resources/music.mp3";
const jumpPath = "resources/jump.mp3";
const attackPath = "resources/attack.wav";
