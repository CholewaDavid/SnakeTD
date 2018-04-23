function LaserTurret(game, canvasContext, tile, angle){
	Turret.call(this, game, canvasContext, tile, "Images/SnakeParts/laserTurret.svg", angle, 5, 3, 1);
}

LaserTurret.prototype = Object.create(Turret.prototype);

LaserTurret.prototype.shoot = function(){
	this.target.takeDamage(this.damage);
}