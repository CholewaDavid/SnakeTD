var game;

window.onload = function(){
	game = new Game(document.getElementById("canvasGame"));
	windowDrawInterval = 1000/60;
	this.loop_interval_id = window.setInterval(function () { game.gameLoop(); }, windowDrawInterval);
}

window.onkeydown = function(event){
	switch(event.key){
		case 'w':
			game.snake.changeMovementDirection(game.snake.MovementEnum.up);
			break;
		case 's':
			game.snake.changeMovementDirection(game.snake.MovementEnum.down);
			break;
		case 'a':
			game.snake.changeMovementDirection(game.snake.MovementEnum.left);
			break;
		case 'd':
			game.snake.changeMovementDirection(game.snake.MovementEnum.right);
			break;
	}
}