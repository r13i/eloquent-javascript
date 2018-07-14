
function Vector(x, y){
	this.x = x;
	this.y = y;
};
Object.defineProperty(Vector.prototype,
	"length",
	{
		get: function(){
			return Math.sqrt(this.x * this.x + this.y * this.y);
	}});
Vector.prototype.plus = function(vect){
	if (vect instanceof Vector) {
		return new Vector(this.x + vect.x , this.y + vect.y);
	}
	else{
		console.log("Error: Argument is not a proper vector.");
	}
}
Vector.prototype.minus = function(vect){
	if(vect instanceof Vector){
		return new Vector(this.x - vect.x , this.y - vect.y);
	}
	else{
		console.log("Error: Argument is not a proper vector.");
	}
}

var v1 = new Vector(-1, -1);
var v2 = new Vector(4, 3);

console.log(v1, v2);
console.log(v1.length, v2.length);
console.log(v1.plus(v2));
console.log(v1.minus(v2));