function SnakeBodyPart(game, canvasContext, tile, imageName, angle, turret){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), true);
	
	this.tile = tile.slice();
	this.bodySprite = new Sprite(this.canvasContext, this.position, imageName, angle);
	this.turret = turret;
	this.health = 10;
	this.dead = false;
}

SnakeBodyPart.prototype = Object.create(Entity.prototype);

SnakeBodyPart.prototype.update = function(){
	if(this.dead)
		return;
	if(this.turret !== null)
		this.turret.update();
}

SnakeBodyPart.prototype.draw = function(){
	if(this.dead)
		return;
	this.bodySprite.draw();
	if(this.turret !== null)
		this.turret.draw();
}

SnakeBodyPart.prototype.move = function(tile){
	this.game.board.getTile(this.tile).removeEntity(this);
	
	this.position = this.game.board.convertTileToPos(tile);
	this.bodySprite.position = this.position;
	this.tile = tile.slice();
	
	this.game.board.getTile(this.tile).addEntity(this);
	
	if(this.turret !== null)
		this.turret.move(tile);
}

SnakeBodyPart.prototype.takeDamage = function(damage){
	this.health -= damage;
	if(this.health <= 0){
		this.dead = true;
		this.game.snake.killRemains();
		var audio = new Audio(destruction.ogg);
		audio.play();
	}
}