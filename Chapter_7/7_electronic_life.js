//##########################################################################################################
"use strict";

//Variables
// var plan = ["############################",
//             "#      #    #      o      ##",
//             "#                          #",
//             "#          #####           #",
//             "##         #   #    ##     #",
//             "###           ##     #     #",
//             "#           ###      #     #",
//             "#   ####                   #",
//             "#   ##       o             #",
//             "# o  #         o       ### #",
//             "#    #                     #",
//             "############################"];

// var plan = 	["############################",
//   			 "#####                 ######",
// 	  		 "##   ***                **##",
//    			 "#   *##**         **  O  *##",
// 		     "#    ***     O    ##**    *#",
// 		     "#       O         ##***    #",
// 		     "#                 ##**     #",
// 		     "#   O       #*             #",
// 		     "#*          #**       O    #",
// 		     "#***        ##**    O    **#",
// 		     "##****     ###***       *###",
// 		     "############################"];

var plan =	["####################################################",
			   "#                 ####         ****              ###",
			   "#   *  @  ##                 ########       OO    ##",
			   "#   *    ##        O O                 ****       *#",
			   "#       ##*                        ##########     *#",
			   "#      ##***  *         ****                     **#",
			   "#* **  #  *  ***      #########                  **#",
			   "#* **  #      *               #   *              **#",
			   "#     ##              #   O   #  ***          ######",
			   "#*            @       #       #   *        O  #    #",
			   "#*                    #  ######                 ** #",
			   "###          ****          ***                  ** #",
			   "#       O                        @         O       #",
			   "#   *     ##  ##  ##  ##               ###      *  #",
			   "#   **         #              *       #####  O     #",
			   "##  **  O   O  #  #    ***  ***        ###      ** #",
			   "###               #   *****                    ****#",
			   "####################################################"]

var directions = {
	"n": new Vector(0, -1),
	"ne": new Vector(1, -1),
	"e": new Vector(1, 0),
	"se": new Vector(1, 1),
	"s": new Vector(0, 1),
	"sw": new Vector(-1, 1),
	"w": new Vector(-1, 0),
	"nw": new Vector(-1, -1)};

// var grid = ["top left", "top middle", "top right", "bottom, left", "bottom middle", "bottm right"];


//##########################################################################################################
//##########################################################################################################


//Helper functions
function randomElement(array){
	if(array.length < 1)
		return null;

	return array[Math.floor(Math.random() * array.length)];
}
	
function elementFromChar(legend, ch){
	if(ch == ' '){
		return null;
	}

	var element = new legend[ch]();
	element.originChar = ch;

	return element;
}

function charFromElement(element){
	return (element == null)? ' ' : element.originChar;
}

function dirPlus(dir, n){
	var dirs =  Object.keys(directions);

	var index = dirs.indexOf(dir);
	return dirs[(index + n + 8) % 8];	//The '+ 8' is just in case n < 0
}


//##########################################################################################################
//##########################################################################################################


//Constructors	
function Vector(x, y){
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(vect){
	if(vect instanceof Vector){
		return new Vector(this.x + vect.x , this.y + vect.y);
	}
	//else
	console.log("Error: Given argument is not a vector.");
}

//##########################################################################################################


function Grid(width, height){
	this.width = width;
	this.height = height;
	this.space = new Array(width * height);
}
Grid.prototype.isInside = function(vect){
	return (vect.x >= 0 && vect.x < this.width) && (vect.y >= 0 && vect.y < this.height);
};
Grid.prototype.get = function(vect){
	return this.space[vect.x + (this.width * vect.y)];
};
Grid.prototype.set = function(vect, value){
	this.space[vect.x + (this.width * vect.y)] = value;
};
Grid.prototype.forEach = function(func, context){
	for(var x = 0 ; x < this.width ; ++x){
		for(var y = 0 ; y < this.height ; ++y){
			var element = this.space[x + (this.width * y)];
			if(element != null){
				func.call(context, element, new Vector(x, y));
			}
		}
	}
};


//##########################################################################################################


function View(world, vector){
	this.world = world;
	this.vector = vector;
}
View.prototype.look = function(direction){
	var target = this.vector.plus(directions[direction]);

	if(this.world.grid.isInside(target)){
		return charFromElement(this.world.grid.get(target));
	}
	return '#';
}
View.prototype.findAll = function(ch){
	var found = [];
	for(var dir in directions){
		if(this.look(dir) == ch){
			found.push(dir);
		}
	}
	return found;
}
View.prototype.find = function(ch){
	var found = this.findAll(ch);
	if(found.length != 0){
		return randomElement(found);
	}
	return null;
}

//##########################################################################################################
//##########################################################################################################


var BouncingCritter = function(){
	this.direction = randomElement(Object.keys(directions));
	this.color = "\x1B[38;5;9m";	//Red
}
BouncingCritter.prototype.act = function(view){
	//Bouncing version
	if(view.look(this.direction) != ' '){
		this.direction = view.find(' ') || 's';
	}

	//No bouncing version
	// this.direction = view.find(' ') || 's';

	return { type: "move", direction: this.direction };
}


//##########################################################################################################

function Wall(){
	this.color = "\x1B[38;5;4m";	//Blue
}

//##########################################################################################################


var WallPlant = function(){
	this.direction = randomElement(Object.keys(directions));
	this.color = "\x1B[38;5;10m";	//Green
}
WallPlant.prototype.act = function(view){
	var start = this.direction;

	if(view.look(dirPlus(this.direction, -3)) != ' '){
		start = this.direction = dirPlus(this.direction, -2);
	}

	while(view.look(this.direction) != ' '){
		this.direction = dirPlus(this.direction, 1);
		if(this.direction == start){
			break;
		}
	}

	return { type: "move", direction: this.direction };
}


//##########################################################################################################
//##########################################################################################################


function World(map, legend){
	this.grid = new Grid(map[0].length, map.length);
	this.legend = legend;

	map.forEach(function(line, y){
		for(var x = 0 ; x < line.length ; ++x){
			this.grid.set(new Vector(x, y) , elementFromChar(this.legend, line[x]));
		}
	}.bind(this));
}
World.prototype.toString = function(){
	var map = "";

	for(var y = 0 ; y < this.grid.height ; ++y){
		for(var x = 0 ; x < this.grid.width ; ++x){

			var element = this.grid.get(new Vector(x, y));


			if(element && element.hasOwnProperty("color")){
				map += element.color;
			}
			map += charFromElement(element);
		}
		
		map += '\n';
	}

	map += "\x1B[38;5;255m";	//Back to white

	return map;
}
World.prototype.turn = function(){
	var acted = [];
	this.grid.forEach(
		function(critter, vector){
			// if(Object.getPrototypeOf(critter).hasOwnProperty("act") && acted.indexOf(critter) == -1){
			if(critter.act && acted.indexOf(critter) == -1){
				this.letAct(critter, vector);
				acted.push(critter);
			}
		}.bind(this));
}
World.prototype.letAct = function(critter, vector){
	console.log(vector);///////////////////////////////////////////////////////////////
	var action = critter.act(new View(this, vector));

	if(action && action.type == "move"){
		var dest = this.checkDestination(action, vector);

		if(dest && this.grid.get(dest) == null){
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}
}
World.prototype.checkDestination = function(action, vector){
	if(directions.hasOwnProperty(action.direction)){
		var dest = vector.plus(directions[action.direction]);

		if(this.grid.isInside(dest)){
			return dest;
		}
	}
}


//##########################################################################################################
//##########################################################################################################


var actionTypes = Object.create(null);
actionTypes.grow = function(critter){
	critter.energy += 0.5;
	return true;
}
actionTypes.move = function(critter, vector, action){
	var dest = this.checkDestination(action, vector);

	if(dest == null
		|| critter.energy <= 1
		|| this.grid.get(dest) != null){
		return false;
	}

	critter.energy--;
	this.grid.set(vector, null);
	this.grid.set(dest, critter);

	return true;
}
actionTypes.eat = function(critter, vector, action){
	var dest = this.checkDestination(action, vector);
	var targetAtDest = (dest != null) && this.grid.get(dest);

	if(! targetAtDest || targetAtDest.energy == null){
		return false;
	}

	critter.energy += targetAtDest.energy;
	this.grid.set(dest, null);
	return true;
}
actionTypes.reproduce = function(critter, vector, action){
	var dest = this.checkDestination(action, vector);
	var baby = elementFromChar(this.legend, critter.originChar);

	if(dest == null
		|| critter.energy <= 2 * baby.energy
		|| this.grid.get(dest) != null){
		return false;
	}

	critter.energy -= baby.energy;
	this.grid.set(dest, baby);

	return true;
}


//##########################################################################################################

function Plant(){
	this.energy = 3 + (Math.random() * 4);
	this.color = "\x1B[38;5;10m";	//Green
}
Plant.prototype.act = function(view){
	if(this.energy > 10){
		var emptySpace = view.find(' ');
		if(emptySpace){
			return { type: "reproduce", direction: emptySpace };
		}
	}

	//else: No enough energy or neighbourhood is not empty
	if(this.energy < 20){
		return { type: "grow" };
	}
}

//##########################################################################################################

function PlantEater(){
	this.energy = 20;
	this.color = "\x1B[38;5;3m";	//Yellow
}
PlantEater.prototype.act = function(view){
	var emptySpace = view.find(' ');
	if(emptySpace && this.energy > 80){
		return { type: "reproduce", direction: emptySpace };
	}

	//else
	var nearbyPlant = view.find('*');
	if(nearbyPlant){
		return { type: "eat", direction: nearbyPlant };
	}

	//else
	if(emptySpace){
		return { type: "move", direction: emptySpace };
	}
}


function SmartPlantEater(){
	PlantEater.call(this);
	this.direction = randomElement(directions);
}
SmartPlantEater.prototype.act = function(view){
	var emptySpace = view.find(' ');
	if(emptySpace && this.energy > 150){
		return { type: "reproduce", direction: emptySpace };
	}

	//else
	var nearbyPlants = view.findAll('*');
	if(nearbyPlants.length > 1 || (nearbyPlants.length == 1 && this.energy < 80)){
		return { type: "eat", direction: randomElement(nearbyPlants) };
	}

	//else
	if(view.look(this.direction) != ' ' && emptySpace){
		this.direction = emptySpace;
	}	
	return { type: "move", direction: this.direction };
}


//##########################################################################################################


function Tiger(){
	this.energy = 50;
	this.direction = randomElement(directions);
	this.preySeen = [];
	this.color = "\x1B[38;5;9m";	//Red
}
Tiger.prototype.act = function(view){
	var seenPerTurn = this.preySeen.reduce(function(a, b){ return a + b; }, 0) / this.preySeen.length;

	var prey = view.findAll('O');
	this.preySeen.push(prey.length);

	if(this.preySeen.length > 6){
		this.preySeen.shift();
	}

	if(prey.length && seenPerTurn > 0.25){
		return { type: "eat", direction: randomElement(prey) };
	}

	var emptySpace = view.find(' ');
	if(emptySpace && this.energy > 400){
		return { type: "reproduce", direction: emptySpace };
	}

	if(this.direction != ' ' && emptySpace){
		this.direction = emptySpace;
	}

	return { type: "move", direction: this.direction };
};



//##########################################################################################################


function LifelikeWorld(map, legend){
	World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);	//Inheritance
LifelikeWorld.prototype.letAct = function(critter, vector){

	var action = critter.act(new View(this, vector));

	var handled = action
		&& action.type in actionTypes
		&& actionTypes[action.type].call(this, critter, vector, action);

	if(! handled){
		critter.energy -= 0.2;
		if(critter.energy <= 0){
			this.grid.set(vector, null);
		}
	}
}


//##########################################################################################################
//##########################################################################################################


function animateWorld(world){

	while(1){
		var last = Date.now();
		while(Date.now() - last < 100){}

		world.turn();
		console.log("\x1Bc");
		console.log(world.toString());
	}
}


//##########################################################################################################
//##########################################################################################################



var w = new LifelikeWorld(plan, { '#': Wall, '@': Tiger,'O': SmartPlantEater, '*': Plant });

animateWorld(w);