export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    flipTile (rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {   // if the tile isn't blank
            console.log('This tile has already been flipped!');
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {  // if the tile contains a bomb
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {    // else the tile must not have been selected and not have a bomb
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(columnIndex, rowIndex);
        }
        this._numberOfTiles--;
    };

    getNumberOfNeighborBombs (rowIndex, columnIndex) {
        const neighborOffSets = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1]
        ];

        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;

        neighborOffSets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];       // creates an offset effect checking the space to the sides
            const neighborColumnIndex = columnIndex + offset[1]; // creates an offset effect checking the space above or below

            // if the offsets find that there is a bomb in that space (by checking numerically), then increment the number of bombs.
            if(neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    this._numberOfBombs++;
                }
            }
        });
        return this._numberOfBombs;
    };

    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    };

    static generatePlayerBoard (numberOfRows, numberOfColumns) {
        let board = [];                         // array to hold the generated board from the for loop
        for(let x = 0; x < numberOfRows; x++) {     // for each row passed into the function, generate a row for the board
            let row = [];                       // row array to hold the columns and rows generated
            for(let y = 0; y < numberOfColumns; y++) {  // for reach column passed into the function, generate a column for the board
                row.push(' ');                  // for every column push row into the row array
            }
            board.push(row);                    // for every time row for loop is run, push row into the board
        }
        return board;                           // return the array containing the board at the end of the function
    };

    static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];                         // array to hold the generated board from the for loop
        for(let x = 0; x < numberOfRows; x++) { // for each row passed into the function, generate a row for the board
            let row = [];                       // row array to hold the columns and rows generated
            for(let y = 0; y < numberOfColumns; y++) {  // for reach column passed into the function, generate a column for the board
                row.push(' ');
                /* for every column push row into the row array, on the bomb array you should put null
                                            but for the time being I'm using the space to keep the board output nice */
            }
            board.push(row);                    // for every time row for loop is run, push row into the board
        }

        let numberOfBombsPlaced = 0;            // preset the number of bombs to 0 to initialize variable

        // --- BOMB PLACEMENT ---
        while(numberOfBombsPlaced < numberOfBombs) { // while the number of bombs placed is less than the bombs stated by user
            let randomRowIndex = Math.floor(Math.random() * numberOfRows); // generate a random row index, round to nearest integer
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns); // generate a random column index, round to nearest integer
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;                               // return the array containing the board at the end of the function
    };

} // end of Board class
