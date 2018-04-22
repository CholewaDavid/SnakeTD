function BoardTile(context, position, tile){
	this.context = context;
	this.position = position;
	this.tile = tile;
}

BoardTile.prototype.draw = function(){
	this.context.fillRect(this.position[0],this.position[1], 2, 2);
}