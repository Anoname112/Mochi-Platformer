function getElement (id) {
	return document.getElementById(id);
}

function updateCanvasLocation () {
	canvas.style.left = (window.innerWidth - canvas.width) / 2;
	canvas.style.top = (window.innerHeight - canvas.height) / 2;
}

function pause () {
	gState = 0;
	bgm.pause();
}

function resume () {
	gState = 1;
	bgm.play();
}

function playAudio (audio) {
	audio.currentTime = 0;
	audio.play();
}

function stopAudio (audio) {
	audio.pause();
	audio.currentTime = 0;
}

function newImg (path) {
	tempImg = new Image();
	tempImg.src = path;
	images.push(tempImg);
	return tempImg;
}

function drawImage (img, x, y, w, h) {
	w = (w == null) ? img.width : w;
	h = (h == null) ? img.height : h;
	context.drawImage(img, x, y, w, h);
}

function fillRect (x, y, w, h, s) {
	context.fillStyle = s == null ? "#000" : s;
	context.fillRect(x, y, w, h);
}

function drawLine (x1, y1, x2, y2, s) {
	context.strokeStyle = (s == null) ? "#000" : s;
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.closePath();
	context.stroke();
}

function drawRect (x, y, w, h, s) {
	context.strokeStyle = (s == null) ? "#000" : s;
	context.lineWidth = scaling;
	context.beginPath();
	context.strokeRect(x, y, w, h);
	context.closePath();
	context.stroke();
}

function drawMessage (msg, x, y, align) {
	context.textAlign = (align == null) ? "start" : align;
	context.font = msgFont;
	context.fillStyle = msgFontColor;
	context.fillText(msg, x, y + 12);
	context.textAlign = "start";
}

function stepCount () {
	if (player.StepCounter > 0) player.StepCounter--;
	else {
		if (Left == Left1) {
			Left = Left2;
			Right = Right2;
		}
		else {
			Left = Left1;
			Right = Right1;
		}
		player.StepCounter = stepCounter;
	}
}

function playerDied () {
	gState = 3;
	player.CurHealth = 0;
	if(player.Image == Left) player.Image = dLeft;
	else if(player.Image == Right) player.Image = dRight;
	else if(player.Image == jLeft) player.Image = jdLeft;
	else if(player.Image == jRight) player.Image = jdRight;
}

function changeDirection (indx) {
	enemies[indx].Speed = -enemies[indx].Speed;
	enemies[indx].Image = (enemies[indx].Image == eLeft) ? eRight : eLeft;
}

function floor (value, floor) {
	return Math.floor(value / floor) * floor;
}

function moveTop (indx) {
	player.IsFloating = false;
	player.IsJumped = false;
	player.Y = platforms[indx].Y - player.Height;
	if (player.Image == jLeft) player.Image = Left;
	else if (player.Image == jRight) player.Image = Right;
}

function moveLeft (indx) {
	player.X = platforms[indx].X - player.Width;
}

function moveRight (indx) {
	player.X = platforms[indx].X + platforms[indx].Width;
}

function moveBottom (indx) {
	player.JumpTime = 0;
	player.Y = platforms[indx].Y + platforms[indx].Height;
}
