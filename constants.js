const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isPortrait = window.innerWidth < window.innerHeight;

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

// Control
const controlPadding = 10;
const controlSize = 80;
const mLeftSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + controlSize + '" height="' + controlSize + '" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16"><path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/></svg>';
const mRightSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + controlSize + '" height="' + controlSize + '" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>';
const mJumpSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + controlSize + '" height="' + controlSize + '" fill="currentColor" class="bi bi-caret-up-square-fill" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"/></svg>';
