var game;

window.onload = function(){
	game = new Game(document.getElementById("canvasGame"));
	windowDrawInterval = 1000/60;
	this.loop_interval_id = window.setInterval(function () { game.gameLoop(); }, windowDrawInterval);
}