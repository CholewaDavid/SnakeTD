function Game(canvas){
	this.canvas = canvas;
	this.runGame = true;
	this.background = new Sprite(this.getCanvasContext(), [0,0], "Images/canvasBackground.svg", 0);
	this.gameOverSprite = new Sprite(this.getCanvasContext(), [13, 50], "Images/gameOver.svg", 0);
	var map = new Maps();
	map.basicArena();
	this.board = new Board(this, this.canvas, map);
	this.snake = new Snake(this, this.getCanvasContext(), [2,5]);
	this.snake.addBodyPart(this.snake.BodyPartsEnum.laser);
	this.stepLengthCounter = 0;
	this.newSpawnCooldown = 10;
	this.gameOver = false;
	this.gameOverCounter = 0;
	this.canvasDrawings = [];
	this.killCount = 0;
	
	this.audioLoop = new Audio("Sounds/SnekDefense.ogg");
	this.audioLoop.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	this.audioLoop.play();
}

Game.prototype.gameLoop = function(){
	this.stepLengthCounter++;
	if(this.stepLengthCounter >= 30){
		if(!this.gameOver){
			this.update();
			this.newSpawnCooldown--;
			if(this.newSpawnCooldown <= 0)
				this.spawnEnemy();
		}
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
	for(var i = 0; i < this.canvasDrawings.length; i++)
		this.canvasDrawings[i].draw();
	this.canvasDrawings = [];
	this.drawScore();
	if(this.gameOver)
		this.gameOverSprite.draw();
}

Game.prototype.drawScore = function(){
	this.getCanvasContext().font = "20px Arial";
	this.getCanvasContext().fillText("Score: " + this.killCount, 10,20);
}

Game.prototype.getCanvasContext = function(){
	return this.canvas.getContext("2d");
}

Game.prototype.setGameOver = function(){
	this.gameOver = true;
	this.audioLoop.pause();
	this.audioLoop.currentTime = 0;
	var audio = new Audio("Sounds/SadFanfare.ogg");
	audio.play();
}

Game.prototype.addCanvasDrawing = function(canvasDrawing){
	this.canvasDrawings.push(canvasDrawing);
}

Game.prototype.spawnEnemy = function(){
	var enemyType = Math.floor(Math.random()*3);
	var enemyPosition = [];
	do{
		enemyPosition[0] = Math.floor(Math.random()*this.board.sizeX);
		enemyPosition[1] = Math.floor(Math.random()*this.board.sizeY);
	}while(this.board.getTile(enemyPosition).isSolid());
	
	switch(enemyType){
		case 0:
			this.board.getTile(enemyPosition).addEntity(new EnemyRandom(this,this.getCanvasContext(), enemyPosition, 0));
			break;
		case 1:
			this.board.getTile(enemyPosition).addEntity(new EnemySeek(this,this.getCanvasContext(), enemyPosition, 0));
			break;
		case 2:
			this.board.getTile(enemyPosition).addEntity(new EnemyEngineer(this,this.getCanvasContext(), enemyPosition, 0));
			break;
	}
	
	this.newSpawnCooldown = 10;
}