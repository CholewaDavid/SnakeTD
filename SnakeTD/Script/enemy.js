var MovementTypeEnum = Object.freeze({"seek": 1, "random": 2, "seekBuildings": 3});

function Enemy(game, canvasContext, tile, imageName, angle, movementType, diagonalMovement, health, speed, damage){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), true);
	
	this.MovementEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4});
	
	this.speed = speed;
	this.moveCooldown = this.speed;
	this.tile = tile.slice();
	this.mainSprite = new Sprite(this.canvasContext, this.position, imageName, this.angle);
	this.nextMovementSprite = new Sprite(this.canvasContext, this.position, "Images/danger.svg", 0);
	this.movementType = movementType;
	this.diagonalMovement = diagonalMovement;
	this.health = health;
	this.dead = false;
	this.damage = damage;
	
	this.nextMove = [0,0];
	this.target = null;
}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.draw = function(){
	if(this.dead)
		return;
	this.mainSprite.draw();
	if(!(this.nextMove[0] === 0 && this.nextMove[1] === 0))
		this.nextMovementSprite.draw();
}

Enemy.prototype.update = function(){
	if(this.dead)
		return;
	this.moveCooldown--;
	if(this.moveCooldown <= 0){
		this.move();
		this.moveCooldown = this.speed;
	}
	this.setNextMovementSpritePos();
}

Enemy.prototype.move = function(){
	var nextTile = [this.tile[0] + this.nextMove[0], this.tile[1] + this.nextMove[1]];
	if(!this.game.board.getTile(nextTile).isSolid() || (nextTile[0] === this.tile[0] && nextTile[1] === this.tile[1])){
		this.game.board.getTile(this.tile).removeEntity(this);
		this.tile = nextTile.slice();
		this.position = this.game.board.convertTileToPos(this.tile);
		this.mainSprite.position = this.position;
		this.game.board.getTile(this.tile).addEntity(this);
	}
	else if(this.game.board.getTile(nextTile).isSolid()){
		var tile = this.game.board.getTile(nextTile);
		for(var i = 0; i < tile.entities.length; i++){
			if(tile.entities[i] instanceof CoreBuilding || tile.entities[i] instanceof SnakeBodyPart || tile.entities[i] instanceof Turret)
				tile.entities[i].takeDamage(this.damage);
		}
	}
	else
		return;
	
	switch(this.movementType){
		case 1:
			var movement = [this.tile[0] - this.game.snake.tile[0], this.tile[1] - this.game.snake.tile[1]];
			if(movement[0] < 0)
				movement[0] = 1;
			else if(movement[0] > 0)
				movement[0] = -1;
			if(movement[1] < 0)
				movement[1] = 1;
			else if(movement[1] > 0)
				movement[1] = -1;
			
			this.nextMove = movement.slice();
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
		case 3:
			if(this.target != null && this.target.dead)
				this.target = null;
			if(this.target == null){
				var targets = [];
				for(var i = 0; i < this.game.board.sizeX; i++){
					for(var j = 0; j < this.game.board.sizeY; j++){
						var building = this.game.board.getTile([i,j]).getBuilding();
						if(building != null)
							targets.push(building);
					}
				}
				this.target = targets[Math.floor(Math.random() * targets.length)];
			}
			var movement = [this.tile[0] - this.target.tile[0], this.tile[1] - this.target.tile[1]];
			if(movement[0] < 0)
				movement[0] = 1;
			else if(movement[0] > 0)
				movement[0] = -1;
			if(movement[1] < 0)
				movement[1] = 1;
			else if(movement[1] > 0)
				movement[1] = -1;
			
			this.nextMove = movement.slice();
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

Enemy.prototype.takeDamage = function(damage){
	if(this.dead)
		return;
	this.health -= damage;
	if(this.health <= 0){
		this.dead = true;
		this.game.board.getTile(this.tile).addEntity(new Food(this.game, this.canvasContext, this.tile));
		this.game.killCount++;
	}
}