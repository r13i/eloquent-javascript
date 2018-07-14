"use strict"

function MultiplicatorUnitFailure(){
	// this.message = message;
	this.stack = (new Error()).stack;
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";


function primitiveMultiply(a, b){
	if(Math.random() < 0.5){
		return a * b;
	}
	//else
	throw new MultiplicatorUnitFailure();	// throw new Error(massage);
}


function reliableMultiply(a, b){
	while(1){
		try{
			return primitiveMultiply(a, b);
		}
		catch(error){
			if(error instanceof MultiplicatorUnitFailure){
				continue;
			}
			else{
				throw error;
			}
		}
		finally{
			console.log("\nTrial done.");
		}
	}
}




try{
	console.log(reliableMultiply(3, inf));
}
catch(error){
	console.log("Houston, we gonna have a problem ...");
}