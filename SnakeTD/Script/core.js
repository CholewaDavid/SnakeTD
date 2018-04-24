function CoreBuilding(game, canvasContext, tile, position){
	Entity.call(this, game, canvasContext, position, true);
	
	this.tile = tile;
	this.sprite = new Sprite(this.canvasContext, this.position, "Images/core.svg", this.angle);
	this.health = 40;
}

CoreBuilding.prototype = Object.create(Entity.prototype);

CoreBuilding.prototype.draw = function(){
	this.sprite.draw();
}

CoreBuilding.prototype.takeDamage = function(damage){
	this.health -= damage;
	if(this.health <= 0)
		this.game.setGameOver();
}