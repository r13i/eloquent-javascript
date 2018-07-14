"use strict"


var box = Object.create(null);
box = {
	locked: true,

	unlock: function(){ this.locked = false; },
	lock: function(){ this.locked = true; },

	_content: [],

	get content(){
		if(this.locked == true){
			throw new Error("This box is locked !");
		}
		return this._content;
	}
};



function withBoxUnlocked(func){
	var boxOldState = box.locked;

	if(! boxOldState){
		return func();
	}


	//else
	box.unlock();
	try{
		return func();
	}
	finally{
		box.lock();
	}
}


withBoxUnlocked(function(){
	box.content.push("Gold coin");
	console.log(box.content);
});


try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

// console.log(box.locked);