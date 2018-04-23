function Wall(game, canvasContext, tile){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), true);
	
	this.sprite = new Sprite(this.canvasContext, this.position, "Images/wall.svg", this.angle);
}

Wall.prototype = Object.create(Entity.prototype);

Wall.prototype.draw = function(){
	this.sprite.draw();
}