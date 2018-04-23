function Turret(game, canvasContext, tile, imageName, angle, range, cooldown, damage){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), true);
	
	this.tile = tile;
	this.baseSprite = new Sprite(this.canvasContext, this.position, "Images/SnakeParts/base.svg", this.angle);
	this.turretSprite = new Sprite(this.canvasContext, this.position, imageName, this.angle);
	this.range = range;
	this.cooldown = cooldown;
	this.currentCooldown = 0;
	this.damage = damage;
	this.target = null;
	this.stationary = false;
}

Turret.prototype = Object.create(Entity.prototype);

Turret.prototype.draw = function(){
	if(this.stationary)
		this.baseSprite.draw();
	this.turretSprite.draw();
}

Turret.prototype.update = function(){
	this.currentCooldown--;
	if(this.currentCooldown < 0)
		this.currentCooldown = 0;
	if(this.target == null){
		this.lookForTarget();
	}
	if(this.currentCooldown === 0){
		if(this.target !== null){
			this.shoot();
			this.currentCooldown = this.cooldown;
		}
	}
}

Turret.prototype.shoot = function(){
	
}

Turret.prototype.move = function(tile){
	this.game.board.getTile(this.tile).removeEntity(this);
	
	this.position = this.game.board.convertTileToPos(tile);
	this.baseSprite.position = this.position;
	this.turretSprite.position = this.position;
	this.tile = tile.slice();
	
	this.game.board.getTile(this.tile).addEntity(this);
}

Turret.prototype.lookForTarget = function(){
	var d = 3 - (2*this.range);
	var x = 0;
	var y = this.range;
	do{
		var enemy = null;
		var tile = null;
		for(var i = 0; i < 8; i++){
			tile = this.getTileForLook(i, x, y);
			if(tile !== null){
				enemy = tile.getEnemy();
				if(enemy !== null){
					this.target = enemy;
					return;
				}
			}
		}
		if(d < 0)
			d = d + (4*x) + 6;
		else{
			d = d + 4 * (x-y) + 10;
			y--;
		}
		x++;
	}while(x <= y);
}

Turret.prototype.getTileForLook = function(index, x, y){
	switch(index){
		case 0:
			return this.game.board.getTile([this.tile[0] + x, this.tile[1] + y]);
		case 1:
			return this.game.board.getTile([this.tile[0] + x, this.tile[1] - y]);
		case 2:
			return this.game.board.getTile([this.tile[0] - x, this.tile[1] + y]);
		case 3:
			return this.game.board.getTile([this.tile[0] - x, this.tile[1] - y]);
		case 4:
			return this.game.board.getTile([this.tile[0] + y, this.tile[1] + x]);
		case 5:
			return this.game.board.getTile([this.tile[0] + y, this.tile[1] - x]);
		case 6:
			return this.game.board.getTile([this.tile[0] - y, this.tile[1] + x]);
		case 7:
			return this.game.board.getTile([this.tile[0] - y, this.tile[1] - x]);
	}
}