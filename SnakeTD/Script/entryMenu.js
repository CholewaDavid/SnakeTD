function EntryMenu(canvas){
	this.canvas = canvas;
	this.canvas.getContext("2d").save();
	this.gameLoopIntervalId;
	this.background = new Sprite(this.canvas.getContext("2d"), [0,0], "Images/mainMenuBackground.svg", 0);
	this.buttons = [];
	this.fillButtons();
	this.activeButtonIndex = 0;
	this.helpMenu = new HelpMenu(this.canvas);
	this.showingHelp = false;
}

EntryMenu.prototype.startGame = function(){
	game = new Game(this.canvas);
	windowDrawInterval = 1000/60;
	this.gameLoopIntervalId = window.setInterval(function () { game.gameLoop(); }, windowDrawInterval);
	currentMode = CurrentModeEnum.game;
}

EntryMenu.prototype.showHelp = function(){
	this.helpMenu.draw();
	this.showingHelp = true;
}

EntryMenu.prototype.endGame = function(){
	clearInterval(this.gameLoopIntervalId);
	this.canvas.getContext("2d").restore();
}

EntryMenu.prototype.draw = function(){
	this.background.draw();
	for(var i = 0; i < this.buttons.length; i++)
		this.buttons[i].draw();
}

EntryMenu.prototype.changeMenuItem = function(dir){
	if(this.showingHelp)
		this.helpMenu.changeMenuItem(dir);
	else{
		this.buttons[this.activeButtonIndex].active = false;
		this.activeButtonIndex += dir;
		if(this.activeButtonIndex < 0)
			this.activeButtonIndex = this.buttons.length - 1;
		else if(this.activeButtonIndex >= this.buttons.length)
			this.activeButtonIndex = 0;
		this.buttons[this.activeButtonIndex].active = true;
		this.draw();
	}
}

EntryMenu.prototype.activateButton = function(){
	if(this.showingHelp)
		this.helpMenu.activateButton();
	else{
		switch(this.activeButtonIndex){
			case 0:
				this.startGame();
				break;
			case 1:
				this.showHelp();
				break;
		}
	}
}

EntryMenu.prototype.fillButtons = function(){
	this.buttons.push(new Button(this.canvas.getContext("2d"), [235,240], "Images/Buttons/startGame.svg", "Images/Buttons/startGameActive.svg", 0));
	this.buttons.push(new Button(this.canvas.getContext("2d"), [235,350], "Images/Buttons/showHelp.svg", "Images/Buttons/showHelpActive.svg", 0));
	
	this.buttons[0].active = true;
}