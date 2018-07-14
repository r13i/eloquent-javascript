var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];


// Helper functions ///////////////////////////////////////////////////////////////////////////////
function repeat(str, times){
	var repeated = "";

	for(var i = 0 ; i < times ; ++i){
		repeated += str;
	}

	return repeated;
}

function rowHeights(rows){
	return rows.map(
		function getRowHeight(row){
			return row.reduce(
				function getMinCellHeight(max, cell){return Math.max(max, cell.minHeight());}
				, 0);
		});
}

function colWidths(rows){
	return rows[0].map(	//This function will use the 'shape' of the 1st row to build the widths array.
		function getColWidth(_, i){	//The '_' will not be used, but the loop index 'i' of the i-th column will be.
			return rows.reduce(
				function getMinCellWidth(max, row){return Math.max(max, row[i].minWidth());}
				, 0);
		});
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function TextCell(text){	// Left-justified text cell
	this.text = text.split('\n');
}
TextCell.prototype.minWidth = function(){
	return this.text.reduce(
	function(maxWidth, singleLine){return Math.max(maxWidth, singleLine.length);}
	, 0);
}
TextCell.prototype.minHeight = function(){
	return this.text.length;
}
TextCell.prototype.draw = function(width, height){
	var result = [];
	
	for(var i = 0 ; i < height ; ++i){
		var line = this.text[i] || "";
		result.push(line + repeat(" ", width - line.length));
	}
	
	return result;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function RTextCell(text){	//Right-justified text cell. Inherits from TextCell
	TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height){
	var result = [];
	
	for(var i = 0 ; i < height ; ++i){
		var line = this.text[i] || "";
		result.push(repeat(' ', width - line.length) + line);
	}
	
	return result;
}
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////
function UnderlinedCell(innerCell){
	this.inner = innerCell;
}
UnderlinedCell.prototype.minWidth = function(){
	return this.inner.minWidth();
}
UnderlinedCell.prototype.minHeight = function(){
	return this.inner.minHeight() + 1;
}
UnderlinedCell.prototype.draw = function(width, height){
	return this.inner.draw(width, height - 1)
		.concat([repeat("-", width)]);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function StretchedCell(innerCell, width, height){
	this.inner = innerCell;
	Object.defineProperty(StretchedCell.prototype, "width", {enumerable: false, writable: false, value: width});
	Object.defineProperty(StretchedCell.prototype, "height", {enumerable: false, writable: false, value: height});
}
StretchedCell.prototype.minWidth = function(){
	return Math.max(this.inner.minWidth() , this.width);
}
StretchedCell.prototype.minHeight = function(){
	return Math.max(this.inner.minHeight() , this.height);
}
StretchedCell.prototype.draw = function(width, height){
	return this.inner.draw(width, height);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function drawTable(rows){
	var widths = colWidths(rows);
	var heights = rowHeights(rows);

	function drawLine(blocks, lineNum){
		return blocks.map(
			function(block){
				return block[lineNum];
			}).join(' ');
	}

	function drawRow(row, rowNum){
		var blocks = row.map(
			function(cell, colNum){
				return cell.draw(widths[colNum], heights[rowNum]);
			});

		return blocks[0].map(
			function(_, lineNum){
				return drawLine(blocks, lineNum);
			}).join('\n');
	}

	return rows.map(drawRow).join('\n');
}


function dataTable(data){
	var keys = Object.keys(data[0]);

	var headers = keys.map(
		function(keyName){
			return new UnderlinedCell(new TextCell(keyName));
		});

	var body = data.map(
		function(row){
			return keys.map(
				function(keyName){
					if(typeof row[keyName] === "number"){
						return new RTextCell(String(row[keyName]));
					}
					else{
						return new TextCell(String(row[keyName]));
					}
				});
		});

	return [headers].concat(body);
}


console.log("Drawing a table from an array of objects (CSV kind of):");
console.log("=".repeat(40));
console.log(drawTable(dataTable(MOUNTAINS)));

// var sc = new StretchedCell(new TextCell("abc"), 1, 2);
// console.log(sc.minWidth());
// console.log(sc.minHeight());
// console.log(sc.draw(3, 2));