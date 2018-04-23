function Game(canvas){
	this.canvas = canvas;
	this.runGame = true;
	this.entities = [];
	this.background = new Sprite(this.getCanvasContext(), [0,0], "Images/canvasBackground.svg", 0);
	var map = new Maps();
	map.basicArena();
	this.board = new Board(this, this.canvas, map);
	this.snake = new Snake(this, this.getCanvasContext(), [2,5]);
	this.snake.addBodyPart(this.snake.BodyPartsEnum.laser);
	this.stepLengthCounter = 0;

	this.board.getTile([8,8]).addEntity(new EnemyRandom(this, this.getCanvasContext(), [8,8], 0));
}

Game.prototype.gameLoop = function(){
	this.stepLengthCounter++;
	if(this.stepLengthCounter == 30){
		this.update();
		this.draw();
	}
}

Game.prototype.update = function(){
		this.snake.update();
		this.board.nextStep();
		this.board.update();
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].update();
		}
		this.stepLengthCounter = 0;
		this.board.removeDead();
}

Game.prototype.draw = function(){
	this.background.draw();
	this.board.draw();
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].draw();
	}
	this.snake.draw();
}

Game.prototype.getCanvasContext = function(){
	return this.canvas.getContext("2d");
}