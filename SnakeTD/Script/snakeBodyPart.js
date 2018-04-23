function SnakeBodyPart(game, canvasContext, tile, imageName, angle, turret){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), true);
	
	this.tile = tile.slice();
	this.bodySprite = new Sprite(this.canvasContext, this.position, imageName, this.angle);
	this.turret = turret;
}

SnakeBodyPart.prototype = Object.create(Entity.prototype);

SnakeBodyPart.prototype.update = function(){
	if(this.turret !== null)
		this.turret.update();
}

SnakeBodyPart.prototype.draw = function(){
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