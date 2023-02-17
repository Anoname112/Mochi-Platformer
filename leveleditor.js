// Welcome to the Level Editor! Here you can edit existing levels and/or create and add your own level.
// Syntax: platforms.push(new Platform(X, Y, Width, Height, HasDoor, Enemies));
// Syntax: hearts.push(new Heart(X, Y));
var finalLevel = 4;

function generateLevel (level) {
	switch(level) {
		case 1:
			platforms.push(new Platform(20, 540, 800, platThick, false, 0));	// 0
			platforms.push(new Platform(870, 540, 210, platThick, true, 1));	// 1
			player.X = 50;
			player.Y = 380;
			break;
		case 2:
			platforms.push(new Platform(20, 540, 210, platThick, false, 0));	// 0
			platforms.push(new Platform(80, 330, platThick, 150, true, 0));		// 1
			platforms.push(new Platform(280, 510, 160, platThick, false, 1));	// 2
			platforms.push(new Platform(310, 240, 200, platThick, false, 1));	// 3
			platforms.push(new Platform(560, 560, 200, platThick, false, 0));	// 4
			platforms.push(new Platform(610, 400, platThick, 160, false, 0));	// 5
			hearts.push(new Heart(690, 540));
			player.X = 50;
			player.Y = 380;
			break;
		case 3:
			platforms.push(new Platform(20, 540, 210, platThick, false, 0));	// 0
			platforms.push(new Platform(80, 330, platThick, 150, false, 0));	// 1
			platforms.push(new Platform(280, 510, 160, platThick, false, 2));	// 2
			platforms.push(new Platform(310, 240, 200, platThick, true, 0));	// 3
			platforms.push(new Platform(560, 560, 200, platThick, false, 0));	// 4
			platforms.push(new Platform(610, 400, platThick, 160, false, 0));	// 5
			player.X = 50;
			player.Y = 380;
			break;
		case 4:
			platforms.push(new Platform(20, 540, 210, platThick, false, 0));	// 0
			platforms.push(new Platform(80, 330, platThick, 150, true, 1));		// 1
			platforms.push(new Platform(280, 510, 160, platThick, false, 0));	// 2
			platforms.push(new Platform(310, 240, 200, platThick, false, 0));	// 3
			platforms.push(new Platform(560, 560, 200, platThick, false, 0));	// 4
			platforms.push(new Platform(610, 400, platThick, 160, false, 1));	// 5
			hearts.push(new Heart(690, 540));
			player.X = 50;
			player.Y = 380;
			break;
	}
}