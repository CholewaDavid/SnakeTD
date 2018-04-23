function LaserFire(context, targetA, targetB){
	CanvasDrawing.call(this, context);
	
	this.targetA = targetA;
	this.targetB = targetB;
}

LaserFire.prototype = Object.create(CanvasDrawing.prototype);

LaserFire.prototype.draw = function(){
	var posA = [this.targetA.position[0] + game.board.TILE_SIZE/2, this.targetA.position[1] + game.board.TILE_SIZE/2];
	var posB = [this.targetB.position[0] + game.board.TILE_SIZE/2, this.targetB.position[1] + game.board.TILE_SIZE/2];
	this.context.beginPath();
	this.context.lineWidth = "3";
	this.context.strokeStyle = "red";
	this.context.moveTo(posA[0], posA[1]);
	this.context.lineTo(posB[0], posB[1]);
	this.context.stroke();
}