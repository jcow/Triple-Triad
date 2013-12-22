var triple_triad = {}

/**
* Object to control the player card queue
*/
triple_triad.player_card_queue = {
	id:"player_card_queue",
	
	append_card:function(card_html){
		$('#'+this.id).append(card_html);
	},
	
	remove:function(id){
		$('#'+this.id+' #'+id).css('background-image', 'none');
	},
	
	clear:function(){
		$('#'+this.id).html("");
	}
}

/**
* Object to control and reference the computer card queue
*/
triple_triad.computer_card_queue = {
	id:"computer_card_queue",
	
	append_card:function(card_html){
		$('#'+this.id).append(card_html);
	},
	
	remove:function(id){
		$('#'+this.id+' #'+id).css('background-image', 'none');
	},
	
	clear:function(){
		$('#'+this.id).html("");
	}
}

/**
* Class for the game board spot
*/
triple_triad.gameboard_spot = function(){
	return {
		gboard_spot:null,
		card:null
	}
	
}

/**
* Game board object that controls the entire gameboard functions and state
*/
triple_triad.gameboard = {
	items : [[null,null,null],[null,null,null],[null,null,null]],
           
	// psuedo constructor
	init:function(){
		for(var i = 0; i < 3; i++){
			for(var p = 0; p < 3; p++){
				this.items[i][p] = triple_triad.gameboard_spot();
				$('#'+i+'-'+p).html('');
			}
		}
		
		this.update_score();
	},
	
	// attemps to add a card to the game board
	add_card:function(card_to_place, place_to_add_card){
                
		var x_y_vals = place_to_add_card.attr('id').split('-');
		
		var x = parseInt(x_y_vals[0]);
		var y = parseInt(x_y_vals[1]);
		
                    
		// there is a null spot
		if(this.items[x][y].card == null){
		
			// add the card to the gameboard
			$(place_to_add_card.html(card_to_place.get_html()));
			
			// add the card to the cards in this object
			this.items[x][y].card = card_to_place;
		
		
			//this system is breaking if it attempts to capture more than 1 card i think
		
			// look to do some swapping
			var other_card = null;
			var current_x = 0;
			var current_y = 0;
			
			// above
			current_x = x-1;
			current_y = y;
			this.check_and_swap(x, y, current_x, current_y);
			
			// below
			current_x = x+1;
			current_y = y;
			this.check_and_swap(x, y, current_x, current_y);
			
			// left
			current_x = x;
			current_y = y-1;
			this.check_and_swap(x, y, current_x, current_y);
			
			// right
			current_x = x;
			current_y = y+1;
			this.check_and_swap(x, y, current_x, current_y);
		
			// update the score
			this.update_score();
			
			return true;
		}
		else{
			return false;
		}
	},

	// gets the open spots from the game board
	get_open_spots:function(){
		var open_areas = new Array();
		for(var i in this.items){
			for(var p in this.items[i]){
				if(this.items[i][p].card == null){
				
					var new_point = new triple_triad.point(p,i);
					open_areas.push(new_point);
				}
			}
		}

		return open_areas;			
	},
	
	// looks at neighbor cards and the the most-recently placed cards and places them
	check_and_swap:function(x, y, current_x, current_y){
	
		if(
			current_x > -1 
			&& current_x < 3
			&& current_y > -1
			&& current_y < 3
			&& this.items[current_x][current_y].card != null 
			&& this.items[x][y].card.owner != this.items[current_x][current_y].card.owner){
			
				// up-down
				if(current_x < x && this.items[x][y].card.values.up > this.items[current_x][current_y].card.values.down){
                                            other_card = this.items[current_x][current_y].card.swap_ownership();
					$("#"+(current_x+"-"+current_y)).html(other_card.get_html());
				}
				// down-up
				else if(current_x > x && this.items[x][y].card.values.down > this.items[current_x][current_y].card.values.up){
					other_card = this.items[current_x][current_y].card.swap_ownership();
					$("#"+(current_x+"-"+current_y)).html(other_card.get_html());
				}
				// left-right
				else if(current_y < y && this.items[x][y].card.values.left > this.items[current_x][current_y].card.values.right){
					other_card = this.items[current_x][current_y].card.swap_ownership();
					$("#"+(current_x+"-"+current_y)).html(other_card.get_html());
				}
				// right-left
				else if(current_y > y && this.items[x][y].card.values.right > this.items[current_x][current_y].card.values.left){
					other_card = this.items[current_x][current_y].card.swap_ownership();
					$("#"+(current_x+"-"+current_y)).html(other_card.get_html());
				}
		}
	},
	
	// updates the game scores
	update_score:function(){
		var player_score = 0;
		var computer_score = 0;
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				if(this.items[i][j].card != null){
					if(this.items[i][j].card.owner == "player"){
						player_score++;
					}
					else if(this.items[i][j].card.owner == "computer"){
						computer_score++;
					}
				}
			}
		}
		
		$('#player_score').html(player_score);
		$('#computer_score').html(computer_score);
		
		if(player_score + computer_score == 9){
			if(player_score > computer_score){	
				triple_triad.winner_container.show("player");
			}
			else{
				triple_triad.winner_container.show("computer");
			}
		}
	}

}



/**
* Point object
*/
triple_triad.point = function(incX, incY){
	return {
		x:incX,
		y:incY
	}
}
    
    
/**
 * Card object
 */
triple_triad.card = function(inc_id, values, image, inc_name, owner, is_placed){
	
	return {
		id:inc_id,
		values:values,
		image:image,
		name:inc_name,
		owner:owner,
		is_placed:is_placed,
		folder_location:'resources/images/cards',
	
		// get the html representation of a card
		get_html:function(options){
		
			var position_offset_y = '';
			if(options != undefined){
					if(options.position_offset_y != undefined){
							position_offset_y = 'top: '+options.position_offset_y+'px';
					}
			}

			var html = "";
			if(this.owner == "player"){
					html = '<div id="'+this.id+'" class="card playerCard" style="background-image: url(\''+this.folder_location+'/'+this.image+'\');  '+position_offset_y+';">';
					html += "</div>";
			}
			else{ 
					html = '<div id="'+this.id+'" class="card computerCard" style="background-image: url(\''+this.folder_location+'/'+this.image+'\')">';
					html += "</div>";
			}

			return html;
		},
	
		// swaps the ownership of a card
		swap_ownership:function(){
				if(this.owner == "player"){
						this.owner = "computer";
						this.image = this.image.substring(1);
				}
				else{
						this.owner = "player";
						this.image = "r"+this.image.substring(0);
				}

				return this;
		},
	
		// checks if the card is computer owned
		is_computer_owned:function(){
				if(this.owner == "computer"){
						return true;
				}
				else{
						return false;
				}
		},
	
		// checks if the card is player owned
		is_player_owned:function(){
				if(this.owner == "player"){
						return true;
				}
				else{
						return false;
				}
		}
	}
}

triple_triad.loading_dialog = {
	init:function(){
		$('#loading_dialog').dialog({autoOpen:false});
		$(".ui-dialog-titlebar").hide()   
	},
	show:function(){
		$('#loading_dialog').dialog('open');
	},
	hide:function(){
		$('#loading_dialog').dialog('close');
	}
}

triple_triad.player = {

	// id of the card selected by the player
	selected_card: null,
	cards: [],

	// psuedo constructor
	init: function(){
		this.bind_onclicks();
	},

	// binds the clicks of the gameboard container and the player cards
	bind_onclicks:function(){
		$('.playerCard').click(function(){
			triple_triad.player.handle_queue_onclick($(this));
		});
		
		$('.gameboard_container').click(function(){
			triple_triad.player.handle_gameboard_onclick($(this));
		});
	},
	
	// handles the game queue's onclick function
	handle_queue_onclick:function(card_clicked){
		if(triple_triad.game.whos_turn == "player"){
			this.card_queue_clicked(card_clicked);
		}
	},
	
	// handles the gameboard onclick function
	handle_gameboard_onclick: function(spot_clicked){
		if(triple_triad.game.whos_turn == "player"){
			this.gameboard_clicked(spot_clicked);
		}
	},
	
	// handles when the card queue is clicked
	card_queue_clicked:function(card_clicked){
		this.selected_card = card_clicked.attr('id');
	},
	
	// handles when the gameboard is clicked
	gameboard_clicked:function(spot_clicked){
		if(this.selected_card != null){
			var selected_card_object = this.get_card_by_id(parseInt(this.selected_card));
			var card_placed = triple_triad.gameboard.add_card(selected_card_object, spot_clicked);
			
			if(card_placed == true){
				selected_card_object.is_placed = true;
				triple_triad.player_card_queue.remove(this.selected_card);
				
				triple_triad.game.swap_turns();
                                    
				// remove the card from the player's hands
				this.remove_card_by_id(parseInt(this.selected_card));
				
				
				this.selected_card = null;
			}
		}
	},
	
	remove_card_from_queue:function(){},
	
	// looks for a card by it's id number and returns it if it exists
	get_card_by_id: function(id_to_get){
		var card = null;
		for(var x in this.cards){
			if(this.cards[x] != null && this.cards[x].id == id_to_get){
				card = this.cards[x];
				break;
			}
		}
		return card;
	},

	// removes a card by it's id number
	remove_card_by_id: function(id_to_remove){
		for(var x in this.cards){
			if(this.cards[x] != null && this.cards[x].id == id_to_remove){
					this.cards[x] = null;
			}
		}
	}
}


/**
* Computer object to control the computer and its actions
*/
triple_triad.computer = {

    counter:0,
	ai_type:"alpha_beta",
	is_deciding:false,
	cards:[],
	
	// runs a turn for the computer
	do_turn: function(){
                
        this.counter++;

		// original random computer ai
		if(this.ai_type == "random"){
                        this.random_ai();
		}
		// alpha_beta ai
		else if(this.ai_type == "alpha_beta"){
			this.alpha_beta_ai();
		}
	},
	
	// gets all the non placed cards 
	get_non_placed_cards:function(){
		var non_placed = [];
		for(x in this.cards){
			if(this.cards[x].is_placed == false){
				non_placed.push(this.cards[x]);
			}
		}
		
		return non_placed;
	},
           
	// the calling fucntion to the alpha beta search algorithm
	alpha_beta_ai:function(){
                    
		// prevent too many decisions
		if(this.is_deciding == false){

                triple_triad.loading_dialog.show()

                var self = this;
				setTimeout(function() {
					self.is_deciding = true;

					var placing_obj = alpha_beta.get(triple_triad.gameboard.items, triple_triad.player.cards, triple_triad.computer.cards);
					var object_of_spot = $('#'+placing_obj.x+'-'+placing_obj.y);
					var card_placed = triple_triad.gameboard.add_card(placing_obj.card, object_of_spot);

					if(card_placed == true){
							triple_triad.computer_card_queue.remove(placing_obj.card.id);
							placing_obj.card.is_placed = true;
							triple_triad.game.swap_turns();
							self.remove_card_by_id(placing_obj.card.id);
					}
					
					self.is_deciding = false;
					triple_triad.loading_dialog.hide()

					return placing_obj.card;
				}, 500);
			}
	},

	// random ai function used at the beginning of the project
	random_ai:function(){
	
		// prevent too many decisions
		if(this.is_deciding == false){
	
			this.is_deciding = true;
	
			// get the cards that haven't been placed
			var non_placed = this.get_non_placed_cards();
		
			// get a random card from the computer queue
			var r_num = Math.floor(Math.random()*(non_placed.length-1));
			var chosen_card = non_placed[r_num];
			
			// get an open spot
			var open_spots = triple_triad.gameboard.get_open_spots();
			r_num = Math.floor(Math.random()*(open_spots.length-1));
			
			// point of the chosen spot
			var chosen_spot = open_spots[r_num];
			var object_of_spot = $('#'+chosen_spot.y+'-'+chosen_spot.x);
			
			var card_placed = triple_triad.gameboard.add_card(chosen_card, object_of_spot);
			
			if(card_placed == true){
				triple_triad.computer_card_queue.remove(chosen_card.id);
				chosen_card.is_placed = true;
				triple_triad.game.swap_turns();
			}
			
			
			this.is_deciding = false;
		}
		
	},
            
	// removes a card by it's id
	remove_card_by_id: function(id_to_remove){
		for(var x in this.cards){
			if(this.cards[x] != null && this.cards[x].id == id_to_remove){
					this.cards[x] = null;
			}
		}
	}
	

}

/**
*  Winner container AI
*/
triple_triad.winner_container = {

	// pseudo constructor
	init:function(){
		$('#retry_button').click(function(){
			//window.location.reload();
			triple_triad.reset();
			$('#winner_container').dialog('close');
		});
	},

	// shows the container of who won the game
	show:function(who_won){
                    console.log(who_won);
                    triple_triad.game.reset();
                
		if(who_won == "player"){
                            triple_triad.game.player_wins++;
			$('#winner_container').dialog({title:"Player Wins!"});
		}
		else{
                            triple_triad.game.computer_wins++;
			$('#winner_container').dialog({title:"Computer Wins!"});
		}
		
		$('#winner_container').dialog({modal:true});
	}
}

/**
*  Player chooser object that chooses who starts the game
*/
triple_triad.player_chooser = {
	
	is_already_chosen:false,
	player_chosen:"",
	
	/**
	* Psuedo constructor
	*/
	init:function(){
                
                    $('#player_chooser_number').html("");
		$('#start_game').attr('style', 'display:none');
                    this.is_already_chosen = false;
                    this.player_chosen = "";
                
		$('#player_chooser_dialog').dialog({modal:true, autoOpen:false});
		$('#start_game').click(function(event){
			triple_triad.player_chooser.handle_start_game_button();
		});
		$('.even_odd_button').click(function(event){
			triple_triad.player_chooser.handle_even_odd_button($(this));
		});
	},
	
	// chooses the initial turn
	choose_initial_turn:function(){
		$('#player_chooser_dialog').dialog('open');
	},
	
	// handles the event when the even odd button is clicked
	handle_even_odd_button:function(button_clicked){
		
		if(this.is_already_chosen == true){
			return;
		}
	
		var r_num = this.roll_number();
		var who_starts = "";
		if(r_num % 2 == 0){
			if(button_clicked.attr('id') == "player_even_button"){
				this.player_chosen = "player";
				who_starts = "Player starts";
			}
			else{
				this.player_chosen = "computer";
				who_starts = "Computer starts";
			}
		}
		else{
			if(button_clicked.attr('id') == "player_odd_button"){
				this.player_chosen = "player";
				who_starts = "Player starts";
			}
			else{
				this.player_chosen = "computer";
				who_starts = "Computer starts";
			}
		}
		
		
		$('#player_chooser_number').prepend("<div>Number was: "+r_num+"</div><div>"+who_starts+'</div>');
		
		$('#start_game').attr('style', 'display:inline');
		this.is_already_chosen = true;
	},
	
	// handles the start game button
	handle_start_game_button:function(){
		$('#player_chooser_dialog').dialog('close');
                    
		triple_triad.game.set_turn(this.player_chosen);
	},
	
	// rolls a number between 1 and 100
	roll_number:function(){
		var r_num = Math.floor((Math.random()*100)+1);
		return r_num;
	}
}

/**
* Game object that controls everything
*/
triple_triad.game = {
	
	whos_turn: "none",
	computer_check_in_time: 1000,
    is_timer_set: false,
	computer_wins: 0,
    player_wins: 0,

	// pseudo constructor
	init:function(){
                
		this.whose_turn = "none";
		computer_check_in_time = 1000;
				
		$('#player_wins').html(this.player_wins);
		$('#computer_wins').html(this.computer_wins);
					
		this.setup_cards();
		this.set_timer();
	},
	
	// resets who's turn it is
	reset:function(){
		this.whos_turn = "none";
	},
            
			
	// in control of picking the initial cards to start with
	setup_cards:function(){
		
		var cards = card_chooser.get_cards();
		var player_cards = cards.pc;
		var computer_cards = cards.cc;
                    
		// draw the players cards, and set them into the player's card array
		for(var x in player_cards){
			triple_triad.player.cards[x] = triple_triad.card(
                                player_cards[x].id,
                                player_cards[x].values,
                                player_cards[x].image,
                                player_cards[x].name,
                                player_cards[x].owner,
                                player_cards[x].is_placed
                            );
                                
                                
			var card_html = triple_triad.player.cards[x].get_html();
			triple_triad.player_card_queue.append_card(card_html);
		}
		
		// draw the computers cards, and set them into the computer's card array
		for(var x in computer_cards){
			triple_triad.computer.cards[x] = triple_triad.card(
                                computer_cards[x].id,
                                computer_cards[x].values,
                                computer_cards[x].image,
                                computer_cards[x].name,
                                computer_cards[x].owner,
                                computer_cards[x].is_placed
                            );
                              
                            var card_html = triple_triad.computer.cards[x].get_html();
			triple_triad.computer_card_queue.append_card(card_html);
		}
		
	},
	
	// sets up the timer that controls the computer 
	set_timer:function(){
		if(this.is_timer_set == false){
			setInterval(this.handle_turn, this.computer_check_in_time);
			this.is_timer_set = true;
		}
	},

	// handles the turn for the computer
	handle_turn:function(){
		if(triple_triad.game.whos_turn == "computer"){
			triple_triad.computer.do_turn();
		}
	},
	
	// sets whos turn it is
	set_turn:function(inc_turn){
		this.whos_turn = inc_turn;
	},

	// swaps the turn 
	swap_turns:function(){

		if(this.whos_turn == "player"){
			this.whos_turn = "computer";
		}
		else{
			this.whos_turn = "player";
		}
	}
	
	
	
	
	
}

/**
* Initial card object
*/
triple_triad.initial_cards = {
	p1: [],
	p2: []
}
    


/**
* Sets up everything initially and after a game is finished
*/
triple_triad.reset = function(){
        
	triple_triad.player_card_queue.clear();
	triple_triad.computer_card_queue.clear();
            
	card_chooser.init();
	triple_triad.loading_dialog.init();
	triple_triad.winner_container.init();
	triple_triad.player_chooser.init();
	triple_triad.gameboard.init();
	triple_triad.game.init();
	triple_triad.player.init();
            
	alpha_beta.init(config.alpha_beta_depth);

	$('#tree_depth').html(config.alpha_beta_depth);
	
	triple_triad.player_chooser.choose_initial_turn();
}