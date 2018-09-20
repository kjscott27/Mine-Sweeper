// --- PLAYER BOARD GENERATION ---
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

// --- BOMB BOARD GENERATION ---
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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

    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffSets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];       // creates an offset effect checking the space to the sides
        const neighborColumnIndex = columnIndex + offset[1]; // creates an offset effect checking the space above or below

        // if the offsets find that there is a bomb in that space (by checking numerically), then increment the number of bombs.
        if(neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

// function to allow the user to choose a coordinate based on x,y for them to check for bombs.
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) =>{
    if (playerBoard[rowIndex][columnIndex] !== ' ') {   // if the tile isn't blank
        console.log('This tile has already been flipped!');
    } else if (bombBoard[rowIndex][columnIndex] === 'B') {  // if the tile contains a bomb
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {    // else the tile must not have been selected and not have a bomb
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, columnIndex, rowIndex);
    }
};

const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(5, 5);    // generate a 5x5 board
let bombBoard = generateBombBoard(5, 5, 5);     // place bombs on a 5x5 board
flipTile(playerBoard, bombBoard, 2, 2); // flip the tile at [2, 2]

console.log('Player Board:');   // create the player board header in console
printBoard(playerBoard);        // print the players board
console.log('Bomb Board:');     // create the bomb board header in console
printBoard(bombBoard);          // print the bomb board
