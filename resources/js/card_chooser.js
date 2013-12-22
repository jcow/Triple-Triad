/**
* Chooses the initial cards
*/
var card_chooser = {
	
	// psuedo constructor
	init:function(){
		this.get_cards();
	},
	
	// gets the cards initially
	get_cards:function(){
		var player_cards = [];
		var computer_cards = [];
		var i;
		
		for(i = 0; i < 5; i++){
			
			if(config.game_mode == 'random_cards'){
				player_cards[i] = this.get_random_card();
			}
			else{
				player_cards[i] = this.copy_card(i);
			}
			
			player_cards[i].id = i;
			player_cards[i].name = player_cards[i].image;
			player_cards[i].image = "r"+player_cards[i].image;
			player_cards[i].owner = "player";
			player_cards[i].is_placed = false;
		}
		
		for(i = 0; i < 5; i++){
			
			if(config.game_mode == 'random_cards'){
				computer_cards[i] = this.get_random_card();
			}
			else{
				computer_cards[i] = this.copy_card(i);
			}
			
			computer_cards[i].id = i;
			computer_cards[i].name = computer_cards[i].image;
			computer_cards[i].image = computer_cards[i].image;
			computer_cards[i].owner = "computer";
			computer_cards[i].is_placed = false;
		}
		
		return {pc:player_cards, cc:computer_cards}
	},
	
	// gets a random card from the bunch
	get_random_card:function(){
		return this.copy_card(Math.floor(Math.random()*(this.card_db.length)));
	},
	
	// copies a card from the card_db to a cards object
	copy_card:function(card_index){
		new_card = {
			values:{up:0,right:0,down:0,left:0},
			image:""
		}
		
		card_to_copy = this.card_db[card_index];
		new_card.values.up = card_to_copy.values.up;
		new_card.values.right = card_to_copy.values.right;
		new_card.values.down = card_to_copy.values.down;
		new_card.values.left = card_to_copy.values.left;
		
		new_card.image = card_to_copy.image;
		
		return new_card;
	},
	
	// The database of cards that can be chosen from
	card_db:[
		{values:{up:6,right:1,down:1,left:2},image:"redbat.jpg"},
		{values:{up:1,right:4,down:1,left:5},image:"geezard.jpg"},
		{values:{up:5,right:1,down:1,left:3},image:"funguar.jpg"},
		{values:{up:1,right:3,down:3,left:5},image:"bitebug.jpg"},
		{values:{up:2,right:3,down:1,left:5},image:"blobra.jpg"},
		{values:{up:6,right:8,down:4,left:5},image:"abadon.jpg"},
		{values:{up:7,right:2,down:3,left:5},image:"abyssworm.jpg"},
		{values:{up:4,right:5,down:5,left:6},image:"adamantoise.jpg"},
		{values:{up:9,right:10,down:4,left:2},image:"alexander.jpg"},
		{values:{up:5,right:1,down:3,left:5},image:"anacondaur.jpg"},
		{values:{up:9,right:6,down:7,left:3},image:"angelo.jpg"},
		{values:{up:6,right:3,down:1,left:6},image:"armadodo.jpg"},
		{values:{up:10,right:8,down:2,left:6},image:"bahamut.jpg"},
		{values:{up:3,right:6,down:5,left:7},image:"behemoth.jpg"},
		{values:{up:3,right:4,down:5,left:3},image:"belhelmel.jpg"},
		{values:{up:5,right:7,down:8,left:5},image:"bgh251f2.jpg"},
		{values:{up:1,right:6,down:4,left:7},image:"blitz.jpg"},
		{values:{up:2,right:1,down:6,left:1},image:"bloodsoul.jpg"},
		{values:{up:6,right:2,down:7,left:3},image:"bluedragon.jpg"},
		{values:{up:2,right:7,down:6,left:3},image:"bomb.jpg"},
		{values:{up:6,right:2,down:2,left:3},image:"buel.jpg"},
		{values:{up:6,right:2,down:6,left:3},image:"cactuar.jpg"},
		{values:{up:8,right:4,down:10,left:4},image:"carbuncle.jpg"},
		{values:{up:4,right:2,down:4,left:3},image:"caterchipillar.jpg"},
		{values:{up:1,right:8,down:7,left:7},image:"catoblepas.jpg"},
		{values:{up:7,right:4,down:6,left:10},image:"cerberus.jpg"},
		{values:{up:9,right:4,down:8,left:4},image:"chicobo.jpg"},
		{values:{up:7,right:6,down:5,left:3},image:"chimera.jpg"},
		{values:{up:4,right:4,down:8,left:9},image:"chubbychocobo.jpg"},
		{values:{up:2,right:1,down:2,left:6},image:"cockatrice.jpg"},
		{values:{up:5,right:2,down:5,left:2},image:"creeps.jpg"},
		{values:{up:4,right:4,down:7,left:2},image:"deathclaw.jpg"},
		{values:{up:5,right:10,down:8,left:3},image:"diablos.jpg"},
		{values:{up:3,right:1,down:10,left:10},image:"doomtrain.jpg"},
		{values:{up:10,right:10,down:3,left:3},image:"edea.jpg"},
		{values:{up:4,right:4,down:9,left:10},image:"eden.jpg"},
		{values:{up:6,right:2,down:6,left:7},image:"elastoid.jpg"},
		{values:{up:5,right:3,down:7,left:6},image:"elnoyle.jpg"},
		{values:{up:7,right:8,down:3,left:4},image:"elvoret.jpg"},
		{values:{up:7,right:5,down:1,left:3},image:"fastitocalon.jpg"},
		{values:{up:3,right:5,down:2,left:1},image:"fastitocalon-f.jpg"},
		{values:{up:6,right:6,down:3,left:2},image:"forbidden.jpg"},
		{values:{up:2,right:8,down:8,left:4},image:"fujinraijin.jpg"},
		{values:{up:5,right:6,down:6,left:8},image:"gargantua.jpg"},
		{values:{up:2,right:1,down:4,left:4},image:"gayla.jpg"},
		{values:{up:1,right:8,down:8,left:3},image:"gerogero.jpg"},
		{values:{up:1,right:5,down:4,left:1},image:"gesper.jpg"},
		{values:{up:3,right:7,down:9,left:6},image:"gilgamesh.jpg"},
		{values:{up:5,right:5,down:7,left:4},image:"gim47n.jpg"},
		{values:{up:6,right:1,down:4,left:3},image:"glacialeye.jpg"},
		{values:{up:7,right:2,down:8,left:5},image:"granaldo.jpg"},
		{values:{up:5,right:2,down:5,left:3},image:"grandmantis.jpg"},
		{values:{up:7,right:1,down:3,left:1},image:"grat.jpg"},
		{values:{up:4,right:4,down:5,left:2},image:"grendel.jpg"},
		{values:{up:7,right:5,down:4,left:3},image:"hexadragon.jpg"},
		{values:{up:9,right:6,down:2,left:8},image:"ifrit.jpg"},
		{values:{up:8,right:2,down:8,left:2},image:"iguion.jpg"},
		{values:{up:3,right:7,down:3,left:6},image:"imp.jpg"},
		{values:{up:6,right:5,down:6,left:5},image:"irongiant.jpg"},
		{values:{up:2,right:6,down:9,left:10},image:"irvine.jpg"},
		{values:{up:3,right:2,down:1,left:7},image:"jelleye.jpg"},
		{values:{up:8,right:8,down:4,left:4},image:"jumbocactuar.jpg"},
		{values:{up:6,right:7,down:6,left:10},image:"kiros.jpg"},
		{values:{up:7,right:5,down:8,left:1},image:"krysta.jpg"},
		{values:{up:5,right:10,down:3,left:9},image:"laguna.jpg"},
		{values:{up:7,right:10,down:1,left:7},image:"leviathan.jpg"},
		{values:{up:7,right:7,down:4,left:2},image:"malboro.jpg"},
		{values:{up:5,right:3,down:3,left:4},image:"mesmerize.jpg"},
		{values:{up:9,right:3,down:9,left:2},image:"minimog.jpg"},
		{values:{up:9,right:5,down:2,left:9},image:"minotaur.jpg"},
		{values:{up:8,right:6,down:7,left:3},image:"mobiletype8.jpg"},
		{values:{up:5,right:6,down:3,left:3},image:"ochu.jpg"},
		{values:{up:8,right:10,down:3,left:5},image:"odin.jpg"},
		{values:{up:1,right:8,down:4,left:8},image:"oilboyle.jpg"},
		{values:{up:10,right:1,down:7,left:7},image:"pandemona.jpg"},
		{values:{up:7,right:2,down:7,left:10},image:"phoenix.jpg"},
		{values:{up:8,right:4,down:4,left:8},image:"propogator.jpg"},
		{values:{up:3,right:10,down:2,left:1},image:"pupu.jpg"},
		{values:{up:2,right:9,down:9,left:4},image:"quezacotl.jpg"},
		{values:{up:9,right:6,down:10,left:2},image:"quistis.jpg"}
	]
	
	
}