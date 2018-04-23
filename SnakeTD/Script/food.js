function Food(game, canvasContext, tile){
	Entity.call(this, game, canvasContext, game.board.convertTileToPos(tile), false);
	
	this.sprite = new Sprite(this.canvasContext, this.position, "Images/food.svg", this.angle);
}

Food.prototype = Object.create(Entity.prototype);

Food.prototype.draw = function(){
	this.sprite.draw();
}