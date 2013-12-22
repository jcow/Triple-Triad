#Triple Triad

This game was constructed for my artificial intelligence class during fall 2012.  The purpose of this project
was to implement an algorithm suited for AI in which I chose the alpha-beta pruning algorithm.


##Playing the game

Download the files and open triple_triad.html

I have tested this in Firefox 13.0.1 and Chrome 23.0.1271 and it works 
best in Chrome - especially when you are searching at the maximum depth
of 9.  It works in IE but the UI is a little wacky.


##Config.js

###Depth
Alpha beta has the ability to set a maximum depth that the algorithm will go in the tree.  This both affects the amount of time
that the system takes to run and also the difficulty.  The higher the number, the more difficult the computer and more time it takes for
the algorithm to run.  If you run the algorithm with a maximum depth of 9 it does take a bit to run as it generally explores a little more than
1.5 million states.

###Card Assignment
You can change the way the cards are initially assigned in config.js.  If you set
game_mode to "random_cards" you will have each player get 5 randomly-assigned cards.
If you set game_mode to "fixed_cards" you will get an instance of cards that I used for testing
where each player has the same cards.  
