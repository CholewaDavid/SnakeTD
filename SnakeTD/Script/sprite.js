function Sprite(context, position, imageName, angle){
	this.context = context;
	this.position = position;
	this.image = new Image();
	this.image.src = imageName;
	this.angle = angle;
}

Sprite.prototype.draw = function(){
	this.context.drawImage(this.image, this.position[0], this.position[1]);
}