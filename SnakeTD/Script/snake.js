function Snake(game, canvasContext, tile){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), false);

	this.BodyPartsEnum = Object.freeze({"head": 1, "basic": 2});
	this.MovementEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4});
	this.bodyParts = [];

	this.tile = tile;

	this.currentMovement = this.MovementEnum.right;
	this.movementVector = [];
	this.changeMovementDirection(this.MovementEnum.right);

	this.addBodyPart(this.BodyPartsEnum.head);
}

Snake.prototype = Object.create(Entity.prototype);

Snake.prototype.draw = function(){
	for(var i = 0; i < this.bodyParts.length; i++){
		this.bodyParts[i].draw();
	}
}

Snake.prototype.update = function(){
	this.move();
	for(var i = 0; i < this.bodyParts.length; i++){
		this.bodyParts[i].update();
	}

	if(this.game.board.getTile(this.tile).eatFood()){
		this.addBodyPart(this.BodyPartsEnum.basic);
	}
}

Snake.prototype.addBodyPart = function(typeEnum){
	switch(typeEnum){
		case 1:
			this.bodyParts.push(new SnakeBodyPart(this.game, this.canvasContext, this.tile, "Images/SnakeParts/basic.svg", 0));
			break;
		case 2:
			this.bodyParts.push(new SnakeBodyPart(this.game, this.canvasContext, this.computeNewBodyTile(), "Images/SnakeParts/basic.svg", 0));
			break;
	}
}

Snake.prototype.computeNewBodyTile = function(){
	if(this.bodyParts.length === 1){
		return [this.tile[0] - this.movementVector[0], this.tile[1] - this.movementVector[1]]
	}

	var dir = [this.bodyParts[this.bodyParts.length-1].tile[0] - this.bodyParts[this.bodyParts.length-2].tile[0], this.bodyParts[this.bodyParts.length-1].tile[1] - this.bodyParts[this.bodyParts.length-2].tile[1]]
	return [this.bodyParts[this.bodyParts.length].tile[0] + dir[0], this.bodyParts[ths.bodyParts.length].tile[1] + dir[0]];
}

Snake.prototype.changeMovementDirection = function(movementEnum){
	switch(movementEnum){
		case 1:
			if(this.currentMovement === this.MovementEnum.right)
				break;
			this.movementVector = [-1,0];
			this.currentMovement = this.MovementEnum.left;
			break;
		case 2:
			if(this.currentMovement === this.MovementEnum.down)
				break;
			this.movementVector = [0,-1];
			this.currentMovement = this.MovementEnum.up;
			break;
		case 3:
			if(this.currentMovement === this.MovementEnum.left)
				break;
			this.movementVector = [1,0];
			this.currentMovement = this.MovementEnum.right;
			break;
		case 4:
			if(this.currentMovement === this.MovementEnum.up)
				break;
			this.movementVector = [0,1];
			this.currentMovement = this.MovementEnum.down;
			break;
	}
}

Snake.prototype.move = function(){
	var nextTile = [this.tile[0] + this.movementVector[0], this.tile[1] + this.movementVector[1]];
	if(this.game.board.getTile(nextTile) !== null && this.game.board.getTile(nextTile).isSolid())
		return;
	this.tile = nextTile.slice();
	for(var i = 0; i < this.bodyParts.length; i++){
		var tmp = this.bodyParts[i].tile.slice();
		this.bodyParts[i].move(nextTile);
		nextTile = tmp.slice();
	}
}