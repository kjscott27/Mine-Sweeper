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
        board[randomRowIndex][randomColumnIndex] = 'B';                // assign B to the randomly selected row/column intersection
        numberOfBombsPlaced++;                                          // increase the bombplaced counter to break out when the bombs are done placing
        // TODO: generate code to prevent bombs from overwriting eachother.
    }

    return board;                               // return the array containing the board at the end of the function
};

const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board:');   // create the player board header in console
printBoard(playerBoard);        // print the players board
console.log('Bomb Board:');     // create the bomb board header in console
printBoard(bombBoard);          // print the bomb board
