Playing the game
	
	Open triple_triad.html in Google Chrome
		I have tested this in Firefox 13.0.1 and Chrome 23.0.1271 and it works 
		best in Chrome - especially when you are searching at the maximum depth
		of 9.

	Refresh the browser if you get nothing the first time
		Do this not by ctrl R, but by going to the url and hitting enter again
		you can't refresh via ctrl R in this grayed out state.
		With my browser it wasn't loading the jscript the very first time I 
		visited the page.
	 
Some useful tips
	
	When the computer gets to start the game and you have the depth set at 9 simply 
	wait for it to finish.  If you start clicking, the browser logs the clicks and 
	will execute them when the search is done.  So if you clicked on a card and then
	the gameboard you will move that card after the computer's search is over.

	Javascript is a bloated language so if you are running at depth 9 and at the beginning state
	it can take awhile for the search to finish.  It takes the computer about 30 seconds
	per million states it explores.  So for this, it has mostly been taking 30 - 40 seconds
	from the beginning state for the computer to finish at depth 9.

	You can see how many states each alpha beta search visits in the upper-left hand corner.
	
	Click the play button in the upper-left hand corner for the music that was part of the game.

	Config.js

		You can change the max depth in config.js.  For a good combination of computer difficulty to 
		waiting time I suggest a max depth of 4 or 5.  For the hardest computer choose max depth of 9
		but be weary of the waiting time.

		You can change the way the cards are initially assigned in config.js.  If you set
		game_mode to "random_cards" you will have each player get 5 randomly-assigned cards.
		If you set game_mode to "fixed_cards" you will get an instance of cards that I used for testing
		where each player has the same cards.  	

		If you make a change to config.js, make sure you do a hard refresh,
		Shift+F5 on windows.  This forces the browser to clear the Javascript and CSS cache so that 
		you will get the new config.  If you don't, your config has the potential to not change as the 
		browser has cached it.

	
