function every_recur(array, func){
	if(array.length == 1){
		return func(array[0]);
	}
	else{
		return (func(array[0]) && every_recur(array.slice(1) , func));
	}
}

function every_iter(array, func){
	var i = 0;
	while(i < array.length && func(array[i++])){
	}

	return (i >= array.length);

	// for(var i = 0 ; i<array.length ; ++i){
	// 	if(! func(array[i]))
	// 		return false;
	// }

	// return true;
}

function some_recur(array, func){
	if(array.length == 1)
		return func(array[0]);
	else
		return func(array[0]) || some_recur(array.slice(1) , func);
}

function some_iter(array, func){
	var i = 0;
	while(i < array.length && ! func(array[i++])){
	}

	return i < array.length;
}

var array = [];
for(var i = 1 ; i<10e2 ; ++i){
	array.push(i);
}

function isPositive(a){
	return a >= 0;
}

var x, y;

x = new Date();
console.log(every_recur(array , isPositive));
y = new Date();
console.log(y.getMilliseconds() - x.getMilliseconds() , 'ms');

x = new Date();
console.log(every_iter(array , isPositive));
y = new Date();
console.log(y.getMilliseconds() - x.getMilliseconds() , 'ms');

x = new Date();
console.log(some_recur(array , isPositive));
y = new Date();
console.log(y.getMilliseconds() - x.getMilliseconds() , 'ms');

x = new Date();
console.log(some_iter(array , isPositive));
y = new Date();
console.log(y.getMilliseconds() - x.getMilliseconds() , 'ms');