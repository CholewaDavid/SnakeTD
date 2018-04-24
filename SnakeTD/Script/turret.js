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
	this.health = 7;
	this.dead = false;
}

Turret.prototype = Object.create(Entity.prototype);

Turret.prototype.draw = function(){
	if(this.dead)
		return;
	if(this.stationary)
		this.baseSprite.draw();
	this.turretSprite.draw();
}

Turret.prototype.update = function(){
	if(this.dead)
		return;
	this.currentCooldown--;
	if(this.currentCooldown < 0)
		this.currentCooldown = 0;
	if(this.target == null){
		this.lookForTarget();
	}
	else if(this.target.dead)
		this.target = null;
	else if(!this.checkTargetInRange())
		this.target = null;
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
	for(var i = -this.range; i <= this.range; i++){
		for(var j = -(this.range - Math.abs(i)); j < this.range - Math.abs(i); j++){
			var pos = [this.tile[0] + i, this.tile[1] + j];
			var tile = this.game.board.getTile(pos);
			if(tile == null)
				continue;
			var enemy = tile.getEnemy();
			if(enemy !== null){
				this.target = enemy;
				return;
			}
		}
	}
}

Turret.prototype.checkTargetInRange = function(){
	for(var i = -this.range; i <= this.range; i++){
		for(var j = -(this.range - Math.abs(i)); j < this.range - Math.abs(i); j++){
			var pos = [this.tile[0] + i, this.tile[1] + j];
			if(this.target.tile[0] == pos[0] && this.target.tile[1] == pos[1])
				return true;
		}
	}
	return false;
}

Turret.prototype.takeDamage = function(damage){
	if(!this.stationary)
		return;
	this.health -= damage;
	if(this.health <= 0){
		this.dead = true;
		var audio = new Audio("Sounds/destruction.ogg");
		audio.play();
	}
}