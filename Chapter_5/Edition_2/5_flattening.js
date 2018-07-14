var arrays = [[1, 2, 3], [4, 5], [6, 7, 8]];

console.log(arrays.reduce(
		function(previouslyConcatened , nextElementOnArray){
			return previouslyConcatened.concat(nextElementOnArray);
		}
	));