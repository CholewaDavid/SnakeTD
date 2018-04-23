function BoardTile(context, position, tile){
	this.context = context;
	this.position = position;
	this.tile = tile;
	this.entities = [];
}

BoardTile.prototype.draw = function(){
	this.context.fillRect(this.position[0],this.position[1], 2, 2);
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].draw();
	}
}

BoardTile.prototype.update = function(){
	for(var i = 0; i < this.entities.length; i++){
		if(!this.entities[i].updated){
			this.entities[i].updated = true;
			this.entities[i].update();
		}
	}
}

BoardTile.prototype.addEntity = function(entity){
	this.entities.push(entity);
}

BoardTile.prototype.removeEntity = function(entity){
	var index = this.entities.indexOf(entity);
	if(index > -1)
		this.entities.splice(index, 1);
}

BoardTile.prototype.eatFood = function(){
	for(var i = 0; i < this.entities.length; i++){
		if(this.entities[i] instanceof Food){
			delete this.entities[i];
			this.entities.splice(i,1);
			return true;
		}
	}
	return false;
}

BoardTile.prototype.isSolid = function(){
	for(var i = 0; i < this.entities.length; i++){
		if(this.entities[i].solid)
			return true;
	}
	return false;
}

BoardTile.prototype.nextStep = function(){
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].updated = false;
	}
}