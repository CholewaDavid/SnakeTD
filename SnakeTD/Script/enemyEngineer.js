function EnemyEngineer(game, canvasContext, tile, angle){
	Enemy.call(this, game, canvasContext, tile, "Images/enemyEngineer.svg", 0, MovementTypeEnum.seekBuildings, true, 20, 3, 5);
}

EnemyEngineer.prototype = Object.create(Enemy.prototype);