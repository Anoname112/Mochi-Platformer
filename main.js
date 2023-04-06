var canvas;
var context;
var jumpSvg;
var fireSvg;
var leftSvg;
var rightSvg;
var hidden;
var bgm;
var jumpSound;
var attackSound;

var intervalId;
var gState;		// 0: Paused, 1: Playing, 2: Win, 3: Lose
var level;		// Current level
var unfollowLine;
var deathLine;
var pX;
var pY;
var mLeft;		// Move left boolean
var mRight;		// Move right boolean
var jumped;		// Jump boolean
var attacked;	// Attack boolean
var Left;		// Current grounded left image
var Right;		// Current grounded right image
var swordImg;	// Current sword image
var swordX;		// X position
var swordY;		// Y position

var player;
var platforms;
var enemies;
var hearts;
var backgrounds;

window.onload = function () {
	window.oncontextmenu = onContextMenu;
	window.onresize = updateCanvasLocation;
	window.onkeydown = onKeyDown;
	window.onkeyup = onKeyUp;
	window.onblur = function () {
		if (gState < 2) pause();
	};
	
	initDocument();
	initGame();
	
	var contentLoaded = false;
	while (!contentLoaded) {
		contentLoaded = true;
		for (var i = 0; i < images.length; i++) {
			if (!images[i].complete) contentLoaded = false;
		}
		if (contentLoaded) intervalId = setInterval(timerTick, interval);
	}
}

function initDocument () {
	// Prepare body
	document.body.style.margin = bodyMargin;
	document.body.style.background = bodyBackColor;
	document.body.style.color = bodyFontColor;
	document.body.style.font = bodyFont;	
	
	// Prepare canvas
	canvas = getElement("myCanvas");
	canvas.addEventListener("touchstart", onMouseDown, false);
	canvas.addEventListener("touchend", onMouseUp, false);
	canvas.onmousedown = onMouseDown;
	canvas.onmouseup = onMouseUp;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.position = canvasPosition;
	canvas.style.borderRadius = canvasBorderRadius;
	updateCanvasLocation();
	context = canvas.getContext("2d");
	
	// Prepare hidden area
	hidden = getElement("hidden");
	hidden.style.visibility = "hidden";
	
	// Prepare audio
	hidden.innerHTML += "<audio id=\"bgm\"><source src=\"" + bgmPath + "\" /></audio>";
	hidden.innerHTML += "<audio id=\"jump\"><source src=\"" + jumpPath + "\" /></audio>";
	hidden.innerHTML += "<audio id=\"attack\"><source src=\"" + attackPath + "\" /></audio>";
	bgm = getElement("bgm");
	bgm.style.visibility = audioVisibility;
	bgm.addEventListener('ended', function () {
		this.currentTime = 0;
		this.play();
	}, false);
	jumpSound = getElement("jump");
	attackSound = getElement("attack");
	
	// Prepare controls
	jumpSvg = getElement("jumpSvg");
	jumpSvg.addEventListener("touchstart", jumpTouchStart, false);
	jumpSvg.addEventListener("touchend", jumpTouchEnd, false);
	jumpSvg.onmousedown = jumpTouchStart;
	jumpSvg.onmouseup = jumpTouchEnd;
	jumpSvg.style.position = "fixed";
	jumpSvg.style.bottom = controlPadding;
	jumpSvg.style.left = controlPadding;
	jumpSvg.style.width = controlSize;
	jumpSvg.style.height = controlSize;
	fireSvg = getElement("fireSvg");
	fireSvg.addEventListener("touchstart", fireTouchStart, false);
	fireSvg.addEventListener("touchend", fireTouchEnd, false);
	fireSvg.onmousedown = fireTouchStart;
	fireSvg.onmouseup = fireTouchEnd;
	fireSvg.style.position = "fixed";
	fireSvg.style.bottom = controlPadding;
	fireSvg.style.left = controlPadding * 2 + controlSize;
	fireSvg.style.width = controlSize;
	fireSvg.style.height = controlSize;
	leftSvg = getElement("leftSvg");
	leftSvg.addEventListener("touchstart", leftTouchStart, false);
	leftSvg.addEventListener("touchend", leftTouchEnd, false);
	leftSvg.onmousedown = leftTouchStart;
	leftSvg.onmouseup = leftTouchEnd;
	leftSvg.style.position = "fixed";
	leftSvg.style.bottom = controlPadding;
	leftSvg.style.right = controlPadding * 2 + controlSize;
	leftSvg.style.width = controlSize;
	leftSvg.style.height = controlSize;
	rightSvg = getElement("rightSvg");
	rightSvg.addEventListener("touchstart", rightTouchStart, false);
	rightSvg.addEventListener("touchend", rightTouchEnd, false);
	rightSvg.onmousedown = rightTouchStart;
	rightSvg.onmouseup = rightTouchEnd;
	rightSvg.style.position = "fixed";
	rightSvg.style.bottom = controlPadding;
	rightSvg.style.right = controlPadding;
	rightSvg.style.width = controlSize;
	rightSvg.style.height = controlSize;
}

function initGame () {
	player = new Object;
	player.MaxHealth = playerHealth;
	player.Attack = playerAttack;
	player.Speed = playerSpeed;
	
	level = 1;
	swordImg = null;
	
	initLevel();
}

function initLevel () {
	platforms = [];
	enemies = [];
	hearts = [];
	backgrounds = [];
	
	unfollowLine = deathLine = 0;
	generateLevel(level);
	
	for (var i = 0; i < platforms.length; i++) {
		// Enemies
		for (var j = 0; j < platforms[i].Enemies; j++) {
			var health = enemyHealth;
			var attack = enemyAttack;
			var speed = enemySpeed;
			var image = eRight;
			if (Math.floor(Math.random() * 10) < 5) {
				speed = -1;
				image = eLeft;
			}
			var leftBound = platforms[i].X;
			var rightBound = platforms[i].X + platforms[i].Width;
			var x = platforms[i].X + (platforms[i].Width - eLeft.width) * (Math.floor((Math.random() * 10) + 1) / 10);
			var y = platforms[i].Y - eLeft.height;
			enemies.push(new Enemy(health, attack, speed, image, leftBound, rightBound, x, y));
		}
		
		// Door
		if (platforms[i].HasDoor) {
			var x = platforms[i].X + (platforms[i].Width - doorImg.width) / 2;
			var y = platforms[i].Y - doorImg.height;
			door = new Door(x, y);
		}
	}
	
	// Background
	var leftBound = platforms[0].X;
	var topBound = platforms[0].Y;
	var rightBound = platforms[0].X + platforms[0].Width;
	var bottomBound = platforms[0].Y + platforms[0].Height;
	for (var i = 0; i < platforms.length; i++) {
		if (platforms[i].X < leftBound) leftBound = platforms[i].X;
		if (platforms[i].Y < topBound) topBound = platforms[i].Y;
		if (platforms[i].X + platforms[i].Width > rightBound) rightBound = platforms[i].X + platforms[i].Width;
		if (platforms[i].Y + platforms[i].Height > bottomBound) bottomBound = platforms[i].Y + platforms[i].Height; 
	}
	if (bottomBound > unfollowLine) bottomBound = unfollowLine;
	leftBound -= canvas.width;
	topBound -= canvas.height * 2;
	rightBound += canvas.width;
	bottomBound += canvas.height;
	for (var i = leftBound; i < rightBound; i += backgroundImg.width) {
		for (var j = topBound; j < bottomBound; j += backgroundImg.height) {
			backgrounds.push(new Background(i, j));
		}
	}
	
	// Player
	Left = Left1;
	Right = Right1;
	player.Dir = 1;
	player.Image = Right;
	player.Width = player.Image.width;
	player.Height = player.Image.height;
	pX = (canvas.width - player.Width) / 2;
	pY = yPad + (canvas.height - player.Height) / 2;
	aSpeed = animSpeed;
	player.AttackTime = player.JumpTime = player.HealDelay = animTime = 0;
	player.CurHealth = player.MaxHealth;
	player.InvinTime = invinTime;
	player.StepCounter = stepCounter;
	
	if (level == 1) gState = 0;
	else gState = 1;
}

function onContextMenu (e) {
	e.preventDefault();
}

function onKeyDown (e) {
	var key = e.keyCode;
	switch (key) {
		case 13:	// Enter
		case 32:	// Space
		case 90:	// Z
			if (gState == 0) resume();
			else if (gState == 1) pause();
			if (gState == 2) {
				if (level == finalLevel) initGame();
				else {
					level++;
					initLevel();
				}
			}
			if (gState == 3) initLevel();
			break;
		case 37:	// Left
			if (gState == 1) mLeft = true;
			break;
		case 39:	// Right
			if (gState == 1) mRight = true;
			break;
		case 67:	// C
			if (gState == 1 && !player.IsAttacked && !attacked) {
				player.AttackTime = attackTime;
				player.IsAttacked = true;
				attacked = true;
				playAudio(attackSound);
			}
			break;
		case 88:	// X
			if (gState == 1 && !player.IsFloating && !player.IsJumped && !jumped) {
				player.JumpTime = jumpTime;
				player.IsJumped = true;
				jumped = true;
				playAudio(jumpSound);
			}
			break;
		default:
			break;
	}
}

function onKeyUp (e) {
	var key = e.keyCode;
	switch (key) {
		case 37:	// Left
			mLeft = false;
			break;
		case 39:	// Right
			mRight = false;
			break;
		case 67:	// C
			attacked = false;
			break;
		case 88:	// X
			jumped = false;
			break;
		default:
			break;
	}
}

function onMouseDown (e) {
	//var controlCanvasX = e.touches[0].pageX;
	//var controlCanvasY = e.touches[0].pageY;
	if (gState == 2) {
		if (level == finalLevel) initGame();
		else {
			level++;
			initLevel();
		}
	}
	if (gState == 3) initLevel();
}

function onMouseUp (e) {
	if (gState == 0) resume();
}

function jumpTouchStart (e) {
	if (gState == 1 && !player.IsFloating && !player.IsJumped && !jumped) {
		player.JumpTime = jumpTime;
		player.IsJumped = true;
		jumped = true;
		playAudio(jumpSound);
	}
}

function jumpTouchEnd (e) {
	jumped = false;
}

function fireTouchStart (e) {
	if (gState == 1 && !player.IsAttacked && !attacked) {
		player.AttackTime = attackTime;
		player.IsAttacked = true;
		attacked = true;
		playAudio(attackSound);
	}
}

function fireTouchEnd (e) {
	attacked = false;
}

function leftTouchStart (e) {
	if (gState == 1) mLeft = true;
}

function leftTouchEnd (e) {
	mLeft = false;
}

function rightTouchStart (e) {
	if (gState == 1) mRight = true;
}

function rightTouchEnd (e) {
	mRight = false;
}

function timerTick () {
	if (gState == 1) {
		// Heart animation
		animTime += aSpeed;
		if (animTime <= -animMax || animTime >= animMax) aSpeed = -aSpeed;
		
		// Animation time
		if (player.InvinTime > 0) player.InvinTime--;
		if (player.HealDelay > 0) player.HealDelay--;
		if (player.AttackTime > 0) player.AttackTime--;
		for (var i = 0; i < enemies.length; i++) if (enemies[i].InvinTime > 0) enemies[i].InvinTime--;
		
		// Move player
		player.Y += gravity;
		jumpUp = player.Speed * (player.JumpTime / 6);
		if (player.JumpTime > 0) {
			player.Y -= jumpUp + 10;
			player.JumpTime--;
		}
		if (mLeft) player.Dir = -1;
		if (mRight) player.Dir = 1;
		if (mLeft || mRight) {
			player.X += player.Speed * player.Dir;
			stepCount();
		}
		
		// Player image
		if (!player.IsFloating) {
			if (player.Dir > 0) player.Image = Right;
			else player.Image = Left;
		}
		else {
			if (player.Dir > 0) player.Image = jRight;
			else player.Image = jLeft;
		}
		
		// Move enemies. 0 Stop, 1 Change direction, 2 ~ 99 Move
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i].InvinTime < invinTime / 2) {
				x = Math.floor(Math.random() * 100);
				if (x == 1) changeDirection(i);
				else if (x > 1) {
					enemies[i].X += enemies[i].Speed;
					if (enemies[i].X < enemies[i].LeftBound) {
						enemies[i].X = enemies[i].LeftBound;
						changeDirection(i);
					}
					else if (enemies[i].X + enemies[i].Image.width > enemies[i].RightBound) {
						enemies[i].X = enemies[i].RightBound - enemies[i].Image.width;
						changeDirection(i);
					}
				}
			}
			
			// Enemies & platforms collision
			for (var j = 0; j < enemies[i].Image.width; j++) {
				for (var k = 0; k < enemies[i].Image.height; k++) {
					for (var l = 0; l < platforms.length; l++) {
						if (enemies[i].X + j >= platforms[l].X &&
							enemies[i].X + j < platforms[l].X + platforms[l].Width &&
							enemies[i].Y + k >= platforms[l].Y &&
							enemies[i].Y + k < platforms[l].Y + platforms[l].Height)
						{
							if (enemies[i].Speed < 0) enemies[i].X = platforms[l].X + platforms[l].Width;
							else enemies[i].X = platforms[l].X - enemies[i].Image.width;
							changeDirection(i);
						}
					}
				}
			}
		}
		
		// Player & platforms collision
		player.IsFloating = true;
		for (var j = player.Height - 1; j >= 0; j--) {
			for (var i = 0; i < player.Width; i++) {
				for (var k = 0; k < platforms.length; k++) {
					if (player.X + i >= platforms[k].X &&
						player.X + i < platforms[k].X + platforms[k].Width &&
						player.Y + j >= platforms[k].Y &&
						player.Y + j < platforms[k].Y + platforms[k].Height)
					{
						diffTop = platforms[k].Y - player.Y;
						diffLeft = platforms[k].X - player.X;
						diffBottom = player.Y + player.Height - (platforms[k].Y + platforms[k].Height);
						diffRight = player.X + player.Width - (platforms[k].X + platforms[k].Width);
						if (diffTop > 0 && diffLeft > 0) {					// Top-left
							if (diffTop > diffLeft / 3) moveTop(k);
							else moveLeft(k);
						}
						else if (diffTop > 0 && diffRight > 0) {			// Top-right
							if (diffTop > diffRight / 3) moveTop(k);
							else moveRight(k);
						}
						else if (diffBottom > -jumpUp && diffLeft > 0) {	// Bottom-left
							if (diffBottom / 1.5 > diffLeft) moveBottom(k);
							else moveLeft(k);
						}
						else if (diffBottom > -jumpUp && diffRight > 0) {	// Bottom-right
							if (diffBottom / 1.5 > diffRight) moveBottom(k);
							else moveRight(k);
						}
						else if (diffTop > 0) moveTop(k);				// Top
						else if (diffLeft > 0) moveLeft(k);				// Left
						else if (diffRight > 0) moveRight(k);			// Right
						else if (diffBottom > -jumpUp) moveBottom(k);	// Bottom
					}
				}
			}
		}
		
		// Player & enemies collision
		if (player.InvinTime == 0) {
			for (var i = 0; i < player.Width; i++) {
				for (var j = 0; j < player.Height; j++) {
					for (var k = 0; k < enemies.length; k++) {
						if (player.X + i >= enemies[k].X &&
							player.X + i < enemies[k].X + enemies[k].Image.width &&
							player.Y + j >= enemies[k].Y &&
							player.Y + j < enemies[k].Y + enemies[k].Image.height)
						{
							player.CurHealth -= enemyAttack;
							player.InvinTime = invinTime;
							if (player.CurHealth <= 0) playerDied();
						}
						if (player.InvinTime != 0) break;
					}
					if (player.InvinTime != 0) break;
				}
				if (player.InvinTime != 0) break;
			}
		}
		
		// Sword
		var playerCenterX = player.X + (player.Width / 2);
		var playerCenterY = player.Y + (player.Height / 2);
		if (player.AttackTime == 0) {
			player.IsAttacked = false;
			if (player.Dir > 0) {
				swordImg = rSwordImg1;
				swordX = playerCenterX - 3;
				swordY = playerCenterY + 3;
			}
			else {
				swordImg = lSwordImg1;
				swordX = playerCenterX + 3 - swordImg.width;
				swordY = playerCenterY + 3;
			}
		}
		else if (player.AttackTime > attackTime23) {
			if (player.Dir > 0) {
				swordImg = rSwordImg2;
				swordX = playerCenterX - 3;
				swordY = playerCenterY - 8;
			}
			else {
				swordImg = lSwordImg2;
				swordX = playerCenterX + 3 - swordImg.width;
				swordY = playerCenterY - 8;
			}
		}
		else {
			if (player.Dir > 0) {
				swordImg = rSwordImg3;
				swordX = playerCenterX - 3;
				swordY = playerCenterY - 5;
			}
			else {
				swordImg = lSwordImg3;
				swordX = playerCenterX + 3 - swordImg.width;
				swordY = playerCenterY - 5;
			}
			
			// Sword & enemies collision
			for (var i = 0; i < enemies.length; i++) {
				var hit = false;
				if (enemies[i].InvinTime == 0) {
					for (var j = 0; j < enemies[i].Image.width && enemies[i].InvinTime == 0; j++) {
						for (var k = 0; k < enemies[i].Image.height && enemies[i].InvinTime == 0; k++) {
							if (enemies[i].X + j >= swordX &&
								enemies[i].X + j < swordX + swordImg.width &&
								enemies[i].Y + k >= swordY &&
								enemies[i].Y + k < swordY + swordImg.height)
							{
								hit = true;
								enemies[i].CurHealth -= player.Attack;
								enemies[i].InvinTime = invinTime;
								if (enemies[i].CurHealth <= 0) {
									enemies.splice(i, 1);
								}
								else {
									if (player.Dir > 0) enemies[i].X += enemies[i].Image.width;
									else enemies[i].X -= enemies[i].Image.width;
								}
								break;
							}
						}
						if (hit) break;
					}
				}
			}
		}
		
		// Player & heart collision
		if (player.CurHealth != player.MaxHealth && player.HealDelay == 0) {
			for (i = 0; i < player.Width; i++) {
				for (j = 0; j < player.Height; j++) {
					for (k = 0; k < hearts.length; k++) {
						if (player.X + i >= hearts[k].X &&
							player.X + i < hearts[k].X + heartImg.width &&
							player.Y + j >= hearts[k].Y + animTime &&
							player.Y + j < hearts[k].Y + heartImg.height + animTime)
						{
							player.CurHealth += (player.MaxHealth / 5) >> 0;
							if (player.CurHealth > player.MaxHealth) player.CurHealth = player.MaxHealth;
							player.HealDelay = healDelay;
						}
						if (player.HealDelay != 0) break;
					}
					if (player.HealDelay != 0) break;
				}
				if (player.HealDelay != 0) break;
			}
		}
		
		// Player & door collision
		if (player.CurHealth > 0) {
			for (i = 0; i < player.Width; i++) {
				for (j = 0; j < player.Height; j++) {
					if (player.X + i >= door.X &&
						player.X + i < door.X + doorImg.width &&
						player.Y + j >= door.Y &&
						player.Y + j < door.Y + doorImg.height)
					{
						gState = 2;
						if (level == finalLevel) stopAudio(bgm);
					}
				}	
			}
		}
		
		// Player fall
		if (player.Y + player.Height >= deathLine) playerDied();
	}
	
	// Invalidate
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	var centerX = canvas.width / 2;
	
	fixedY = player.Y;
	if (fixedY > unfollowLine) fixedY = unfollowLine;
	
	// Draw background
	for (i = 0; i < backgrounds.length; i++) {
		var backgroundX = pX + (backgrounds[i].X - player.X / 1.5) * scaling;
		var backgroundY = pY + (backgrounds[i].Y - fixedY / 1.5) * scaling;
		var backgroundWidth = (backgroundImg.width + 10) * scaling;
		var backgroundHeight = (backgroundImg.height + 10) * scaling;
		drawImage(backgroundImg, backgroundX, backgroundY, backgroundWidth, backgroundHeight);
	}
	
	// Draw door
	var doorX = pX + (door.X - player.X) * scaling;
	var doorY = pY + (door.Y - fixedY) * scaling;
	drawImage(doorImg, doorX, doorY, doorImg.width * scaling, doorImg.height * scaling);
	
	// Draw hearts
	for (i = 0; i < hearts.length; i++) {
		var heartX = pX + (hearts[i].X - player.X) * scaling;
		var heartY = pY + (hearts[i].Y - fixedY + animTime) * scaling;
		drawImage(heartImg, heartX, heartY, heartImg.width * scaling, heartImg.height * scaling);
	}
	
	// Draw enemies
	for (i = 0; i < enemies.length; i++) {
		var enemyX = pX + (enemies[i].X - player.X) * scaling;
		var enemyY = pY + (enemies[i].Y - fixedY) * scaling;
		drawImage(enemies[i].Image, enemyX, enemyY, enemies[i].Image.width * scaling, enemies[i].Image.height * scaling);
	}
	
	// Draw player
	var playerY = pY + (player.Y - fixedY) * scaling;
	var playerWidth = player.Image.width * scaling;
	var playerHeight = player.Image.height * scaling;
	drawImage(player.Image, pX, playerY, playerWidth, playerHeight);
	
	// Draw platforms
	for (i = 0; i < platforms.length; i++)  {
		var x = pX + (platforms[i].X - player.X) * scaling;
		var y = pY + (platforms[i].Y - fixedY) * scaling;
		
		drawImage(platformImg, x, y, platforms[i].Width * scaling, platforms[i].Height * scaling);
		drawRect(x, y, platforms[i].Width * scaling, platforms[i].Height * scaling, "#8B4513");
	}
	
	// Draw sword
	if (swordImg) {
		var swdX = pX + (swordX - player.X) * scaling;
		var swdY = pY + (swordY - fixedY) * scaling;
		var swdWidth = swordImg.width * scaling;
		var swdHeight = swordImg.height * scaling;
		drawImage(swordImg, swdX, swdY, swdWidth, swdHeight);
	}
	
	// Draw enemies HP bar
	for (i = 0; i < enemies.length; i++) {
		var width = enemies[i].Image.width * enemies[i].CurHealth / enemies[i].MaxHealth;
		var x1 = pX + (enemies[i].X - player.X) * scaling;
		var x2 = pX + (enemies[i].X + width - player.X) * scaling;
		var y = pY + (enemies[i].Y - 3 - fixedY) * scaling;
		//var x2Back = pX + enemies[i].X + enemies[i].Image.width - player.X;
		//drawLine(x1, y, x2Back, y, hpBarBack);
		for (var j = 0; j < scaling; j++) {
			drawLine(x1, y, x2, y, enemyHpColor);
			y--;
		}
	}
	
	// Draw HP icon
	var iconX = msgPad + 1;
	var iconY = msgPad;
	var iconWidth = hpImg.width * scaling;
	var iconHeight = hpImg.height * scaling;
	drawImage(hpImg, iconX, iconY, iconWidth, iconHeight);
	// Draw HP bar back 
	var barX = msgPad + hpImg.width * scaling;
	var barWidth = hpBarWidth * scaling;
	drawImage(hpBarBackImg, barX, iconY, barWidth, iconHeight);
	// Draw HP bar
	var currentHPBarWidth = (player.CurHealth / player.MaxHealth * hpBarWidth) * scaling;
	if (player.CurHealth > player.MaxHealth / 2) drawImage(hpBarGreenImg, barX, iconY, currentHPBarWidth, iconHeight);
	else if (player.CurHealth > player.MaxHealth / 4) drawImage(hpBarYellowImg, barX, iconY, currentHPBarWidth, iconHeight);
	else drawImage(hpBarRedImg, barX, iconY, currentHPBarWidth, iconHeight);
	// Draw HP bar border
	drawImage(hpBarBorderImg, barX, iconY, barWidth, iconHeight);
	// Draw HP message
	var messageX = msgPad + iconWidth + barWidth + 10;
	var messageY = msgPad * scaling;
	drawMessage(player.CurHealth + " / " + player.MaxHealth, messageX, messageY);
	
	// Draw level message
	drawMessage("Level " + level, canvas.width - iconX, messageY, "end");
	
	// Draw middle messages
	if (isMobile || isPortrait) messageY += msgFontSize + msgSpacing;
	if (gState == 0) drawMessage("Paused", centerX, messageY, "center");
	else if (gState == 2) {
		if (level == finalLevel) {
			if (isMobile || isPortrait) {
				drawMessage("You finished the game.", centerX, messageY, "center");
				messageY += msgFontSize + msgSpacing;
				drawMessage("Press Z to play again", centerX, messageY, "center");
			}
			else drawMessage("You finished the game. Press Z to play again", centerX, messageY, "center");
		}
		else drawMessage("You win. Press Z to continue", centerX, messageY, "center");
	}
	else if (gState == 3) drawMessage("You lose. Press Z to play again", centerX, messageY, "center");
}
