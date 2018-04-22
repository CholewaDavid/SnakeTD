function SnakeBodyPart(game, canvasContext, tile, imageName, angle){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile));
	
	this.tile = tile;
	this.bodySprite = new Sprite(this.canvasContext, this.position, imageName, this.angle);
}

SnakeBodyPart.prototype = Object.create(Entity.prototype);

SnakeBodyPart.prototype.update = function(){
	
}

SnakeBodyPart.prototype.draw = function(){
	this.bodySprite.draw();
}