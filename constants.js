const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isPortrait = window.innerWidth < window.innerHeight;

const interval = 15;
const yPad = 0;
const scaling = 1.5;
const deathPadding = 600;
const gravity = 10;		// Must be smaller than 15

const bodyMargin = "0";
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

// Images
const images = [];
const Left1 = newImg("resources/player_left1.png");
const Right1 = newImg("resources/player_right1.png");
const Left2 = newImg("resources/player_left2.png");
const Right2 = newImg("resources/player_right2.png");
const dLeft = newImg("resources/player_dLeft.png");
const dRight = newImg("resources/player_dRight.png");
const jLeft = newImg("resources/player_jLeft.png");
const jRight = newImg("resources/player_jRight.png");
const jdLeft = newImg("resources/player_jdLeft.png");
const jdRight = newImg("resources/player_jdRight.png");
const eLeft = newImg("resources/enemyLeft.png");
const eRight = newImg("resources/enemyRight.png");
const rSwordImg1 = newImg("resources/sword2_right1.png");
const rSwordImg2 = newImg("resources/sword2_right2.png");
const rSwordImg3 = newImg("resources/sword2_right3.png");
const lSwordImg1 = newImg("resources/sword2_left1.png");
const lSwordImg2 = newImg("resources/sword2_left2.png");
const lSwordImg3 = newImg("resources/sword2_left3.png");
const doorImg = newImg("resources/Door.png");
const hpImg = newImg("resources/HPIcon.png");
const hpBarBackImg = newImg("resources/HPBarBack.png");
const hpBarGreenImg = newImg("resources/HPBarGreen.png");
const hpBarYellowImg = newImg("resources/HPBarYellow.png");
const hpBarRedImg = newImg("resources/HPBarRed.png");
const hpBarBorderImg = newImg("resources/HPBarBorder.png");
const heartImg = newImg("resources/Heart.png");
const platformImg = newImg("resources/Platform.png");
const backgroundImg = newImg("resources/Background1.png");
