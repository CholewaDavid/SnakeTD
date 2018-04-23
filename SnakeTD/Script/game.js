function Game(canvas){
	this.canvas = canvas;
	this.runGame = true;
	this.background = new Sprite(this.getCanvasContext(), [0,0], "Images/canvasBackground.svg", 0);
	this.gameOverSprite = new Sprite(this.getCanvasContext(), [200, 50], "Images/gameOver.svg", 0);
	var map = new Maps();
	map.basicArena();
	this.board = new Board(this, this.canvas, map);
	this.snake = new Snake(this, this.getCanvasContext(), [2,5]);
	this.snake.addBodyPart(this.snake.BodyPartsEnum.laser);
	this.stepLengthCounter = 0;
	this.gameOver = false;
	this.gameOverCounter = 0;
	
	this.board.getTile([8,8]).addEntity(new EnemyRandom(this, this.getCanvasContext(), [8,8], 0));
}

Game.prototype.gameLoop = function(){
	this.stepLengthCounter++;
	if(this.stepLengthCounter >= 30){
		if(!this.gameOver)
			this.update();
		else{
			this.gameOverCounter++;
			if(this.gameOverCounter > 6){
				currentMode = CurrentModeEnum.menu;
				entryMenu.endGame();
				entryMenu.draw();
				return;
			}
		}
		this.draw();
		this.stepLengthCounter = 0;
	}
}

Game.prototype.update = function(){
		this.snake.update();
		this.board.nextStep();
		this.board.update();
		this.board.removeDead();
}

Game.prototype.draw = function(){
	this.background.draw();
	this.board.draw();
	this.snake.draw();
	if(this.gameOver)
		this.gameOverSprite.draw();
}

Game.prototype.getCanvasContext = function(){
	return this.canvas.getContext("2d");
}

Game.prototype.setGameOver = function(){
	this.gameOver = true;
}