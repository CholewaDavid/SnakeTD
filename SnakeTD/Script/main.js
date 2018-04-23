var game;

window.onload = function(){
	game = new Game(document.getElementById("canvasGame"));
	windowDrawInterval = 1000/60;
	this.loop_interval_id = window.setInterval(function () { game.gameLoop(); }, windowDrawInterval);
}

window.onkeydown = function(event){
	switch(event.keyCode){
		case 87:
		case 38:
			game.snake.changeMovementDirection(game.snake.MovementEnum.up);
			break;
		case 83:
		case 40:
			game.snake.changeMovementDirection(game.snake.MovementEnum.down);
			break;
		case 65:
		case 37:
			game.snake.changeMovementDirection(game.snake.MovementEnum.left);
			break;
		case 68:
		case 39:
			game.snake.changeMovementDirection(game.snake.MovementEnum.right);
			break;
	}
}