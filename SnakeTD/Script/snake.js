function Snake(game, canvasContext, tile){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), false);

	this.BodyPartsEnum = Object.freeze({"head": 1, "laser": 2});
	this.MovementEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4});
	this.bodyParts = [];

	this.tile = tile;

	this.currentMovement = this.MovementEnum.right;
	this.movementVector = [];
	this.changeMovementDirection(this.MovementEnum.right);

	this.addBodyPart(this.BodyPartsEnum.head);
	this.lastTailTile;
}

Snake.prototype = Object.create(Entity.prototype);

Snake.prototype.draw = function(){
	for(var i = 0; i < this.bodyParts.length; i++){
		this.bodyParts[i].draw();
	}
}

Snake.prototype.update = function(){	
	for(var i = 0; i < this.bodyParts.length; i++){
		this.bodyParts[i].update();
	}
	
	this.move();
	
	if(this.game.board.getTile(this.tile).eatFood()){
		this.addBodyPart(this.BodyPartsEnum.laser);
	}
}

Snake.prototype.addBodyPart = function(typeEnum){
	switch(typeEnum){
		case 1:
			this.bodyParts.push(new SnakeBodyPart(this.game, this.canvasContext, this.tile, "Images/SnakeParts/head.svg", 0, null));
			break;
		case 2:
			var turret = new LaserTurret(this.game, this.canvasContext, this.computeNewBodyTile(), 0);
			this.bodyParts.push(new SnakeBodyPart(this.game, this.canvasContext, this.computeNewBodyTile(), "Images/SnakeParts/basic.svg", 0, turret));
			break;
	}
}

Snake.prototype.computeNewBodyTile = function(){
	if(this.bodyParts.length === 1){
		return [this.tile[0] - this.movementVector[0], this.tile[1] - this.movementVector[1]]
	}

	return this.lastTailTile;
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
	this.lastTailTile = this.bodyParts[this.bodyParts.length-1].tile;
	var nextTile = [this.tile[0] + this.movementVector[0], this.tile[1] + this.movementVector[1]];
	if(this.game.board.getTile(nextTile) !== null && this.game.board.getTile(nextTile).isSolid()){
		this.releaseTurret();
		return;
	}
	this.tile = nextTile.slice();
	for(var i = 0; i < this.bodyParts.length; i++){
		var tmp = this.bodyParts[i].tile.slice();
		this.bodyParts[i].move(nextTile);
		nextTile = tmp.slice();
	}
}

Snake.prototype.releaseTurret = function(){
	var lastBodyPartIndex = this.bodyParts.length - 1;
	if(lastBodyPartIndex === 0){
		this.game.setGameOver();
		return;
	}
	this.bodyParts[lastBodyPartIndex].turret.stationary = true;
	this.bodyParts[lastBodyPartIndex].turret = null;
	delete this.bodyParts[lastBodyPartIndex];
	this.bodyParts.splice(lastBodyPartIndex,1);
}

Snake.prototype.killRemains = function(){
	var killing = false;
	for(var i = 0; i < this.bodyParts.length; i++){
		killing = this.bodyParts[i].dead;
		if(killing){
			this.bodyParts[i].turret.stationary = true;
			this.bodyParts[i].turret = null;
			delete this.bodyParts[i];
			this.bodyParts.splice(i,1);
			i--;
		}
	}
	
	if(this.bodyParts.length == 1)
		this.game.setGameOver();
}