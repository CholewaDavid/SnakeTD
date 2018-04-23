function Board(game, canvas, map){
	this.canvas = canvas;
	this.game = game;
	this.sizeX;
	this.sizeY;
	
	this.TILE_SIZE = 20;
	this.offset = [];	
	this.boardArray;
	
	this.createMap(map);
}

Board.prototype.computeTileSize = function(){
	var boardSizeX = this.sizeX * this.TILE_SIZE;
	var boardSizeY = this.sizeY * this.TILE_SIZE;
	
	var scaleX = this.canvas.width / boardSizeX;
	var scaleY = this.canvas.height / boardSizeY;
	var scale;
	if(scaleX < scaleY)
		scale = scaleX;
	else
		scale = scaleY;
	this.canvas.getContext("2d").scale(scale, scale);
	
	this.offset.push((this.canvas.width - (this.TILE_SIZE * this.sizeX) * scale) / 2);
	this.offset.push((this.canvas.height - (this.TILE_SIZE * this.sizeY) * scale) / 2);
	/*
	var tileSizeX = this.canvas.width / this.sizeX;
	var tileSizeY = this.canvas.height / this.sizeY;
	
	if(tileSizeX < tileSizeY)
		this.tileSize = tileSizeX;
	else
		this.tileSize = tileSizeY;
	
	this.offset.push((this.canvas.width - this.tileSize * this.sizeX) / 2);
	this.offset.push((this.canvas.height - this.tileSize * this.sizeY) / 2);
	
	this.canvas.context.scale();
	*/
}

Board.prototype.convertPosToTile = function(posInput){
	var position = posInput.slice();
	return[Math.floor((position[0] + this.offset[0])/this.TILE_SIZE), Math.floor((position[1] + this.offset[1])/this.TILE_SIZE)];
}

Board.prototype.convertTileToPos = function(tileInput){
	var tile = tileInput.slice();
	return[tile[0] * (this.TILE_SIZE + this.offset[0]), tile[1] * this.TILE_SIZE + this.offset[1]];
}

Board.prototype.draw = function(){
	for(var i = 0; i < this.sizeX; i++){
		for(var j = 0; j < this.sizeY; j++){
			this.boardArray[i][j].draw();
		}
	}
}

Board.prototype.update = function(){
	for(var i = 0; i < this.sizeX; i++){
		for(var j = 0; j < this.sizeY; j++){
			this.boardArray[i][j].update();
		}
	}
}

Board.prototype.getTile = function(tile){
	if(tile[0] < 0 || tile[0] > this.sizeX || tile[1] < 0 || tile[1] > this.sizeY)
		return null;
	return this.boardArray[tile[0]][tile[1]];
}

Board.prototype.nextStep = function(){
	for(var i = 0; i < this.sizeX; i++){
		for(var j = 0; j < this.sizeY; j++){
				this.boardArray[i][j].nextStep();
		}
	}
}

Board.prototype.createMap = function(map){
	this.sizeX = map.sizeX;
	this.sizeY = map.sizeY;
	
	this.computeTileSize();
	
	this.boardArray = new Array(this.sizeX);
	for(var i = 0; i < this.sizeX; i++){
		this.boardArray[i] = new Array(this.sizeY);
		for(var j = 0; j < this.sizeY; j++){
			this.boardArray[i][j] = new BoardTile(this.canvas.getContext("2d"), this.convertTileToPos([i,j]), [i,j]);
			var character = map.mapString.charAt(j*this.sizeX+i);
			if(character === "W")
				this.boardArray[i][j].addEntity(new Wall(this.game, this.canvas.getContext("2d"), [i,j], this.convertTileToPos([i,j])));
		}
	}
}

Board.prototype.removeDead = function(){
	for(var i = 0; i < this.sizeX; i++){
		for(var j = 0; j < this.sizeY; j++){
			this.boardArray[i][j].removeDead();
		}
	}
}