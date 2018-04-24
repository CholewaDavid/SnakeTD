function EnemySeek(game, canvasContext, tile, angle){
	Enemy.call(this, game, canvasContext, tile, "Images/enemySeek.svg", 0, MovementTypeEnum.seek, true, 10, 3, 2);
}

EnemySeek.prototype = Object.create(Enemy.prototype);