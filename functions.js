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
	var backX = x - (w / 2) - msgBackPadding;
	var backY = y - (h / 2) - msgBackPadding;
	var backW = w + (msgBackPadding * 2);
	var backH = h + (msgBackPadding * 2);
	
	ctx.strokeStyle = msgBackColor;
	ctx.fillStyle = msgBackColor;
	ctx.beginPath();
	ctx.roundRect(backX, backY, backW, backH, msgBackRadius);
	ctx.stroke();
	ctx.fill();
	
	ctx.textBaseline = "middle";
	ctx.textAlign = (align == null) ? "start" : align;
	ctx.font = msgFont;
	ctx.fillStyle = msgFontColor;
	ctx.fillText(msg, x, y);
	ctx.textAlign = "start";
}

function floor (value, floor) {
	return Math.floor(value / floor) * floor;
}

function clamp (value, min, max) {
	return Math.max(Math.min(value, max), min);
}

function getCenter (object) {
	return object.Image ? new Vec2(object.Position.X + object.Image.width / 2, object.Position.Y + object.Image.height / 2) : object.Position;
}

function computeDot (left, right) {
	return left.X * right.X + left.Y * right.Y;
}

function computeRadian (left, right) {
	var plusMinus = (right.X >= left.X) ? 1 : -1;
	return Math.acos(computeDot(left, right)) * plusMinus;
}

function radianToDegree (radian) {
	return radian * 57.2957795;
}

function degreeToRadian (degree) {
	return degree * Math.PI / 180;
}

function rotate (point, center, degree) {
	var radian = degreeToRadian(degree);
	var sin = Math.sin(radian);
	var cos = Math.cos(radian);
	var x = center.X + (point.X - center.X) * cos - (point.Y - center.Y) * sin;
	var y = center.Y + (point.X - center.X) * sin + (point.Y - center.Y) * cos;
	return new Vec2(x, y);
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