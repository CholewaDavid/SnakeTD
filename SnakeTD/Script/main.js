var entryMenu = null;
var game = null;
var CurrentModeEnum = Object.freeze({"game": 1, "menu": 2})
var currentMode = CurrentModeEnum.menu;

window.onload = function(){
	entryMenu = new EntryMenu(document.getElementById("canvasGame"));
	entryMenu.draw();
}

window.onkeydown = function(event){
	switch(currentMode){
	case 1:
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
		break;
	case 2:
		switch(event.keyCode){
			case 87:
			case 38:
				entryMenu.changeMenuItem(-1);
				break;
			case 83:
			case 40:
				entryMenu.changeMenuItem(1);
				break;
			case 13:
			case 32:
				entryMenu.activateButton();
				break;
		}
		break;
	}
}