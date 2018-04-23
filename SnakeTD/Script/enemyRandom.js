function EnemyRandom(game, canvasContext, tile, angle){
	Enemy.call(this, game, canvasContext, tile, "Images/enemyRandom.svg", 0, MovementTypeEnum.random, true);
}

EnemyRandom.prototype = Object.create(Enemy.prototype);