
class Matrix {
    constructor (rows, cols, element = (x, y) => undefined) {
        this.rows = rows,
        this.cols = cols

        this.elements = [];
        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                this.elements[row * cols + col] = element(row, col);
            }
        }
    }
    
    get (row, col) {
        return this.elements[row * this.cols + col];
    }
    
    set (row, col, value) {
        this.elements[row * this.cols + col] = value;
    }
    
    print () {
        for (let row = 0; row < this.rows; ++row) {
            let rowStr = "";
            for (let col = 0; col < this.cols; ++col) {
                rowStr += this.elements[row * this.cols + col] + " ";
            }
            console.log(rowStr);
        }
        console.log("\n");
    }
}

class MatrixIterator {
    constructor (matrix) {
        this.row = 0;
        this.col = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.row == this.matrix.rows) { return {done: true}; }

        const value = {
            row: this.row,
            col: this.col,
            value: this.matrix.get(this.row, this.col),
        }

        this.col++;
        if (this.col == this.matrix.cols) {
            this.col = 0;
            this.row++;
        }

        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this)
}



class SymmetricMatrix extends Matrix {
    constructor (size, element = (row, col) => undefined) {
        super(size, size, (row, col) => {
            if (row < col) { return element(row, col); }
            else { return element(col, row); }
        });
    }

    set (row, col, value) {
        super.set(row, col, value);
        if (row != col) { super.set(col, row, value); }
    }
}

let mat = new Matrix(5, 5, (x, y) => String(x) + "," + String(y));
mat.print();

// let symMat = new SymmetricMatrix(5, 5, (x, y) => String(x) + "," + String(y));
// symMat.print();

for (let {row, col, value} of mat) {
    console.log(`At (${row}, ${col}) there is ${value}`);
}

