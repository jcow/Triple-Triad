/**
* Class to represent a game state
*/
function game_state(){
	this.gameboard = {};
	this.player_cards = [];
	this.computer_cards = [];
	this.hueristic_value = 0;
        this.player_placed_cards = [];
        this.computer_placed_cards = [];
        this.placed_card = {x:0, y:0}
}

/**
* Class that represents the current gameboard state
*/
function gboard(){
    this.cards = [[null, null, null],[null, null, null],[null, null, null]];
	this.gameboard_card_count = 0;

    this.init = function(incoming_cards){
        for(var i in incoming_cards){
            for(var p in incoming_cards[i]){
                if(incoming_cards[i][p] != null){
                    this.cards[i][p] = triple_triad.card(
                            incoming_cards[i][p].id,
                            incoming_cards[i][p].values,
                            incoming_cards[i][p].image,
                            incoming_cards[i][p].name,
                            incoming_cards[i][p].owner,
                            incoming_cards[i][p].is_placed
                    );
                }
            }
        }
    }
}

/**
*  Copies over one game state to another so we don't get aliasing
*/
function state_copy(current_state){
	var i, j;
	var new_state = new game_state();
	
	new_state.gameboard = new gboard();
	new_state.gameboard.init(current_state.gameboard.cards);

	for(i = 0; i < current_state.player_cards.length; i++){
            if(current_state.player_cards[i] != null){
                new_state.player_cards[i] = triple_triad.card(
                    current_state.player_cards[i].id,
                    current_state.player_cards[i].values,
                    current_state.player_cards[i].image,
                    current_state.player_cards[i].name,
                    current_state.player_cards[i].owner,
                    current_state.player_cards[i].is_placed
                );
            }
            else{
                new_state.player_cards[i] = null;
            }
		
	}
	
	for(i = 0; i < current_state.computer_cards.length; i++){
            if(current_state.computer_cards[i] != null){
		new_state.computer_cards[i] = triple_triad.card(
                    current_state.computer_cards[i].id,
                    current_state.computer_cards[i].values,
                    current_state.computer_cards[i].image,
                    current_state.computer_cards[i].name,
                    current_state.computer_cards[i].owner,
                    current_state.computer_cards[i].is_placed
                );
            }
            else{
                new_state.computer_cards[i] = null;
            }
	}
        
	return new_state;
}

/**
* Alpha Beta algorithm for the AI
*/
var alpha_beta = {
	
        counter:0,
        best_state: null,
        
		// pseudo constructor
        init:function(md){
            this.max_depth = md;
        },
	
	// the calling function to run the alpha_beta AI
	get:function(current_gameboard, player_c, computer_c){
	
                    this.counter = 0;
        
                    this.best_state = null;
        
                    var current_gboard_cards = [[null, null, null],[null, null, null],[null, null, null]];

                    for(var i in current_gameboard){
                            for(var p in current_gameboard[i]){
                                    current_gboard_cards[i][p] = current_gameboard[i][p].card;
                            }
                    }

                    var gb = new gboard();
                    gb.init(current_gboard_cards);
        
                    var initial_state = new game_state();

                    initial_state.gameboard = gb;
                    initial_state.player_cards = player_c;
                    initial_state.computer_cards = computer_c;
                    
                    // and we are off
                    var max_value = this.ab(initial_state, this.max_depth, -1000000, 1000000, "max");
                    
                    console.log('Running Count: '+this.counter);
					$('#state_counter').html('States Explored By Computer: '+this.counter);
                    
					// return the values in regards to the next move the computer should make
                    return {
                        card:   this.best_state.gameboard.cards[this.best_state.placed_card.x][this.best_state.placed_card.y],
                        x:      this.best_state.placed_card.x,
                        y:      this.best_state.placed_card.y
                    };
	},
	
	// main ab recursive function
	ab:function(state, depth, alpha, beta, player){
            
                // we have hit the end of the search
                if(depth == 0 || state.gameboard.gameboard_card_count == 9){
                    return state.hueristic_value;
                }
            
				this.counter++;
			
				// get our child states
                var child_states = this.child_states(state, player);
                
				// iterate over max
                if(player == "max"){
                    for(var i in child_states){
                        
						// loop through over alpha recursively
                        if(depth == this.max_depth){
                            alpha = this.max_with_set_state(
                                        alpha, 
                                        this.ab(child_states[i], depth-1, alpha, beta, "min"),
                                        child_states[i]
                                );
                        }
                        else{
                            alpha = this.max(
                                        alpha, 
                                        this.ab(child_states[i], depth-1, alpha, beta, "min")
                                );
                        }
                                    
                        // found a pruning point    
                        if(beta <= alpha){
                            break;
                        }
                    }
                    return alpha;
                }
				// iterate over min
                else{
                    for(var i in child_states){
					
						// loop through over alpha recursively
                        beta = this.min(
                                        beta, 
                                        this.ab(child_states[i], depth-1, alpha, beta, "max")
                                );
                                  
						// found a pruning point
                        if(beta <= alpha){
                            break;
                        }
                    }
                    
                    return beta;
                }
	},
        
		// set the best state that can be returned
        max_with_set_state:function(a, b, b_state){
            if(a < b){
                this.best_state = b_state;
                return b;
            }
            else{
                return a;
            }
        },
        
		// get the max of two variables
        max:function(a, b){
            if(a < b){
                return b;
            }
            else{
                return a;
            }
        },
        
		// gets the min of two variables
        min:function(a, b){
            if(a < b){
                return a;
            }
            else{
                return b;
            }
        },
        
		// inverts the incoming player max or min
        not_player:function(player){
           if(player == "max"){
               return "min";
           }
           else{
               return "max";
           }
        },
        
        
    // gets the chile states
	child_states:function(current_state, player){
	
		var new_state;
		var next_states = [];
                var potential_moves = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
		var i, j, k;
                var ajacencies;
                
				// get all the max players next states, but try the states where cards are next to one another first
                if(player == "max"){
                    for(var p in current_state.player_placed_cards){
                        
                        potential_moves[current_state.player_placed_cards[p].x][current_state.player_placed_cards[p].y] = 1;
                        
                        ajacencies = get_ajacencies(current_state.gameboard, current_state.player_placed_cards[p].x, current_state.player_placed_cards[p].y);
                        
                        for(var q in ajacencies){
                            if(potential_moves[ajacencies[q].x][ajacencies[q].y] == 0){
                                if(current_state.gameboard.cards[ajacencies[q].x][ajacencies[q].y] == null){
                                    
                                    for(k = 0; k < current_state.computer_cards.length; k++){
                                            if(current_state.computer_cards[k] != null){

                                                    // swap the card
                                                    new_state = state_copy(current_state);
                                                    new_state.gameboard.cards[ajacencies[q].x][ajacencies[q].y] = new_state.computer_cards[k];
                                                    new_state.computer_cards[k] = null;

                                                    // get the h value and swap the ownership of cards
                                                    this.check_state(new_state, ajacencies[q].x, ajacencies[q].y);

                                                    next_states.push(new_state);
                                            }
                                    }
                                }
                                
                               potential_moves[ajacencies[q].x][ajacencies[q].y] = 1; 
                            }
                        }
                        
                    }
                    
                    for(i = 0; i < potential_moves.length; i++){
                        for(p = 0; p < potential_moves[i].length; p++){
                            if(potential_moves[i][p] == 0 && current_state.gameboard.cards[i][p] == null){
                                for(k = 0; k < current_state.computer_cards.length; k++){
                                            if(current_state.computer_cards[k] != null){

                                                    // swap the card
                                                    new_state = state_copy(current_state);
                                                    new_state.gameboard.cards[i][p] = new_state.computer_cards[k];
                                                    new_state.computer_cards[k] = null;

                                                    // get the h value and swap the ownership of cards
                                                    this.check_state(new_state, i, p);

                                                    next_states.push(new_state);
                                            }
                                    }
                            }
                        }
                    }
                }
				
				// get all the min players next states, but try the states where cards are next to one another first
                else{
                    
                    
                    for(var p in current_state.computer_placed_cards){
                        
                        potential_moves[current_state.computer_placed_cards[p].x][current_state.computer_placed_cards[p].y] = 1;
                        
                        ajacencies = get_ajacencies(current_state.gameboard, current_state.computer_placed_cards[p].x, current_state.computer_placed_cards[p].y);
                        
                        for(var q in ajacencies){
                            if(potential_moves[ajacencies[q].x][ajacencies[q].y] == 0){
                                if(current_state.gameboard.cards[ajacencies[q].x][ajacencies[q].y] == null){
                                    
                                    for(k = 0; k < current_state.player_cards.length; k++){
                                            if(current_state.player_cards[k] != null){

                                                    // swap the card
                                                    new_state = state_copy(current_state);
                                                    new_state.gameboard.cards[ajacencies[q].x][ajacencies[q].y] = new_state.player_cards[k];
                                                    new_state.player_cards[k] = null;

                                                    // get the h value and swap the ownership of cards
                                                    this.check_state(new_state, ajacencies[q].x, ajacencies[q].y);

                                                    next_states.push(new_state);
                                            }
                                    }
                                }
                                
                               potential_moves[ajacencies[q].x][ajacencies[q].y] = 1; 
                            }
                        }
                        
                    }
                    
                    
                    
                    for(i = 0; i < potential_moves.length; i++){
                        for(p = 0; p < potential_moves[i].length; p++){
                            if(potential_moves[i][p] == 0 && current_state.gameboard.cards[i][p] == null){
                                for(k = 0; k < current_state.player_cards.length; k++){
                                            if(current_state.player_cards[k] != null){

                                                    // swap the card
                                                    new_state = state_copy(current_state);
                                                    new_state.gameboard.cards[i][p] = new_state.player_cards[k];
                                                    new_state.player_cards[k] = null;

                                                    // get the h value and swap the ownership of cards
                                                    this.check_state(new_state, i, p);

                                                    next_states.push(new_state);
                                            }
                                    }
                            }
                        }
                    }
                }
                
                return next_states;
	},
	
	
	// checks a state and swaps any of the cards that the newly-placed card has taken over
	check_state:function(state, placed_card_x, placed_card_y){

        
                state.placed_card.x = placed_card_x;
                state.placed_card.y = placed_card_y;
                

		var card_check_offsets = [{x:-1, y:0}, {x:+1, y:0}, {x:0, y:-1}, {x:0, y:+1}];

                // check to swap the card
                for(var q in card_check_offsets){
                    var x = placed_card_x;
                    var y = placed_card_y;
                    var current_x = x + card_check_offsets[q].x;
                    var current_y = y + card_check_offsets[q].y;

                    if(
                            current_x > -1 
                            && current_x < 3
                            && current_y > -1
                            && current_y < 3
                            && state.gameboard.cards[current_x][current_y] != null
                            && state.gameboard.cards[x][y] != null
                            && state.gameboard.cards[x][y].owner != state.gameboard.cards[current_x][current_y].owner){

                                    // up-down
                                    if(current_x < x && state.gameboard.cards[x][y].values.up > state.gameboard.cards[current_x][current_y].values.down){
                                        state.gameboard.cards[current_x][current_y].swap_ownership();
                                    }
                                    // down-up
                                    else if(current_x > x && state.gameboard.cards[x][y].values.down > state.gameboard.cards[current_x][current_y].values.up){
                                        state.gameboard.cards[current_x][current_y].swap_ownership();
                                    }
                                    // left-right
                                    else if(current_y < y && state.gameboard.cards[x][y].values.left > state.gameboard.cards[current_x][current_y].values.right){
                                        state.gameboard.cards[current_x][current_y].swap_ownership();
                                    }
                                    // right-left
                                    else if(current_y > y && state.gameboard.cards[x][y].values.right > state.gameboard.cards[current_x][current_y].values.left){
                                        state.gameboard.cards[current_x][current_y].swap_ownership();
                                    }
                    }
                }
               
                
                // run through and find the hueristic value of this state
                state.hueristic_value = 0;
                for(var i in state.gameboard.cards){
                    for(var p in state.gameboard.cards[i]){
                        if(state.gameboard.cards[i][p] != null){
                            if(state.gameboard.cards[i][p].is_computer_owned()){
                                
                                state.computer_placed_cards.push({x:i, y:p}); 
                                state.hueristic_value++;
                            }
                            else{
                                
                                state.player_placed_cards.push({x:i, y:p}); 
                                state.hueristic_value--;
                            }
                            
                            // increment the card count
                            state.gameboard.gameboard_card_count++;
                        }
                    }
                }

        }	
}

/**
* Function to get the ajacent cards at a specific position
*/
function get_ajacencies(ze_gameboard, current_x, current_y){
    var ajacencies = [];
    
    current_x = parseInt(current_x);
    current_y = parseInt(current_y);
    
    var new_x;
    var new_y;
    
    // up
    new_x = current_x - 1;
    new_y = current_y;
    if(new_x > -1 && ze_gameboard.cards[new_x][new_y] == null){
        ajacencies.push({x:new_x, y:new_y});
    }
    
    // right
    new_x = current_x;
    new_y = current_y + 1;
    if(new_y < 3 && ze_gameboard.cards[new_x][new_y] == null){
        ajacencies.push({x:new_x, y:new_y});
    }
    
    // down
    new_x = current_x + 1;
    new_y = current_y;
    
    if(new_x < 3 && ze_gameboard.cards[new_x][new_y] == null){
        ajacencies.push({x:new_x, y:new_y});
    }
    
    // left
    new_x = current_x;
    new_y = current_y - 1;
    if(new_y > -1 && ze_gameboard.cards[new_x][new_y] == null){
        ajacencies.push({x:new_x, y:new_y});
    }
    
    return ajacencies;
    
}
