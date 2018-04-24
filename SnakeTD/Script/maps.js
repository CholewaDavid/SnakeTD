function Maps(){
	this.sizeX;
	this.sizeY;
	this.mapString;
}

Maps.prototype.basicArena = function(){
	this.sizeX = 20;
	this.sizeY = 15;
	this.mapString = "WWWWWWWWWWWWWWWWWWWW" + 
									 "W..................W" +
									 "W..................W" +
									 "W........W...W.....W" +
									 "W..................W" +
									 "W..........C.......W" +
									 "W..................W" +
									 "W........W...W.....W" +
									 "W..................W" +
									 "W..................W" +
									 "W..................W" +
									 "W..................W" +
									 "W..................W" +
									 "W..................W" +
									 "WWWWWWWWWWWWWWWWWWWW";
};