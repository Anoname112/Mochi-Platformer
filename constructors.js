function Platform (x, y, width, height, hasDoor, enemyCount) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	this.HasDoor = hasDoor;
	this.Enemies = enemyCount;
	
	var bottom = y + height;
	if (bottom > unfollowLine) {
		unfollowLine = bottom;
		deathLine = bottom + deathPadding;
	}
}

function Enemy (health, attack, speed, image, leftBound, rightBound, x, y) {
	this.CurHealth = this.MaxHealth = health;
	this.Attack = attack;
	this.Speed = speed;
	this.InvinTime = 0;
	this.Image = image;
	this.LeftBound = leftBound;
	this.RightBound = rightBound;
	this.X = x;
	this.Y = y;
}

function Heart (x, y) {
	this.X = x;
	this.Y = y;
}

function Background (x, y) {
	this.X = x;
	this.Y = y;
}

function Door (x, y) {
	this.X = x;
	this.Y = y;
}
