var MovementTypeEnum = Object.freeze({"seek": 1, "random": 2});

function Enemy(game, canvasContext, tile, imageName, angle, movementType, diagonalMovement){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), true);
	
	this.MovementEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4});
	
	this.tile = tile.slice();
	this.mainSprite = new Sprite(this.canvasContext, this.position, imageName, this.angle);
	this.nextMovementSprite = new Sprite(this.canvasContext, this.position, "Images/danger.svg", 0);
	this.movementType = movementType;
	this.diagonalMovement = diagonalMovement;
	
	this.nextMove = [0,0];
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.draw = function(){
	this.mainSprite.draw();
	if(!(this.nextMove[0] === 0 && this.nextMove[1] === 0))
		this.nextMovementSprite.draw();
}

Enemy.prototype.update = function(){
	this.move();
	this.setNextMovementSpritePos();
}

Enemy.prototype.move = function(){
	var nextTile = [this.tile[0] + this.nextMove[0], this.tile[1] + this.nextMove[1]];
	if(!this.game.board.getTile(nextTile).isSolid()){
		this.game.board.getTile(this.tile).removeEntity(this);
		this.tile = nextTile.slice();
		this.position = this.game.board.convertTileToPos(this.tile);
		this.mainSprite.position = this.position;
		this.game.board.getTile(this.tile).addEntity(this);
	}
	
	switch(this.movementType){
		case 1:
			break;
		case 2:
			var directions = [];
			for(var i = -1; i <= 1; i++){
				for(var j = -1; j <= 1; j++){
					if(i === j && i === 0)
						continue;
					if(i != 0 && j != 0){
						if(this.diagonalMovement){
							var tile = this.game.board.getTile([this.tile[0] + i,this.tile[1] + j]);
							if(!(tile === null || tile.isSolid()))
								directions.push([i,j]);
						}
					}
					else{
						var tile = this.game.board.getTile([this.tile[0] + i,this.tile[1] + j]);
						if(!(tile === null || tile.isSolid()))
								directions.push([i,j]);
					}
				}
			}
			this.nextMove = directions[Math.floor(Math.random() * directions.length)];
			break;
	}
	
	/*
	this.game.board.getTile(this.tile).removeEntity(this);
	this.tile = [this.tile[0] + movementVector[0], this.tile[1] + movementVector[1]];
	this.position = this.game.board.convertTileToPos(this.tile);
	this.mainSprite.position = this.position;
	this.game.board.getTile(this.tile).addEntity(this);
	*/
}

Enemy.prototype.setNextMovementSpritePos = function(){
	this.nextMovementSprite.position = this.game.board.convertTileToPos([this.tile[0] + this.nextMove[0], this.tile[1] + this.nextMove[1]]);
}