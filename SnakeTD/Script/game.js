function Game(canvas){
	this.canvas = canvas;
	this.runGame = true;
	this.entities = [];
	this.background = new Sprite(this.getCanvasContext(), [0,0], "Images/canvasBackground.svg", 0);
	this.board = new Board(this.canvas, 30, 20);
	this.snake = new Snake(this, this.getCanvasContext(), [2,5]);
	this.stepLengthCounter = 0;
}

Game.prototype.gameLoop = function(){
	this.update();
	this.draw();
}

Game.prototype.update = function(){
	this.stepLengthCounter++;
	if(this.stepLengthCounter == 30){
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].update();
		}
		this.snake.update();
		this.stepLengthCounter = 0;
	}
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