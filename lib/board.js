'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, columnIndex) {
            if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
                // if the tile isn't blank
                console.log('This tile has already been flipped!');
            } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                // if the tile contains a bomb
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                // else the tile must not have been selected and not have a bomb
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(columnIndex, rowIndex);
            }
            this._numberOfTiles--;
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffSets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;

            neighborOffSets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0]; // creates an offset effect checking the space to the sides
                var neighborColumnIndex = columnIndex + offset[1]; // creates an offset effect checking the space above or below

                // if the offsets find that there is a bomb in that space (by checking numerically), then increment the number of bombs.
                if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                        _this._numberOfBombs++;
                    }
                }
            });
            return this._numberOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles !== this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = []; // array to hold the generated board from the for loop
            for (var x = 0; x < numberOfRows; x++) {
                // for each row passed into the function, generate a row for the board
                var row = []; // row array to hold the columns and rows generated
                for (var y = 0; y < numberOfColumns; y++) {
                    // for reach column passed into the function, generate a column for the board
                    row.push(' '); // for every column push row into the row array
                }
                board.push(row); // for every time row for loop is run, push row into the board
            }
            return board; // return the array containing the board at the end of the function
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = []; // array to hold the generated board from the for loop
            for (var x = 0; x < numberOfRows; x++) {
                // for each row passed into the function, generate a row for the board
                var row = []; // row array to hold the columns and rows generated
                for (var y = 0; y < numberOfColumns; y++) {
                    // for reach column passed into the function, generate a column for the board
                    row.push(' ');
                    /* for every column push row into the row array, on the bomb array you should put null
                                                but for the time being I'm using the space to keep the board output nice */
                }
                board.push(row); // for every time row for loop is run, push row into the board
            }

            var numberOfBombsPlaced = 0; // preset the number of bombs to 0 to initialize variable

            // --- BOMB PLACEMENT ---
            while (numberOfBombsPlaced < numberOfBombs) {
                // while the number of bombs placed is less than the bombs stated by user
                var randomRowIndex = Math.floor(Math.random() * numberOfRows); // generate a random row index, round to nearest integer
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns); // generate a random column index, round to nearest integer
                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board; // return the array containing the board at the end of the function
        }
    }]);

    return Board;
}(); // end of Board class