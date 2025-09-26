function createUser(name){
    const userName = String(name).trim();
    const markType = "X";

    return {
        getName: () => {return userName},
        getMark: () => { return markType},
    }
}

const initiateGameBoard = (() => {
    const boardSize = 9;
    const cells = Array(boardSize).fill(null);
    
    //Current snapshot of the board
    function getBoardSnapshot () {
        return cells.slice()
    };

    //The empty cells on the board
    function getEmptyCells () {
        const emptyCells = [];
        cells.forEach((value, i) => {
            if (value === null){
                emptyCells.push(i);
            }
        });
        return emptyCells;
    }

    //Place mark on board
    function placeMark (index, mark) {
        if(!Number.isInteger(index)){
            return {
                ok: false,
                reason: "Index position must be an integer"
            }
        }
        if(index < 0 || index >= boardSize){
            return {
                ok: false,
                reason: "Your chosen position is outside the board range"
            }
        }
        if (cells[index] !== null) {
            return {
                ok: false,
                reason: "Cell is occupied"
            }
        }

        const markInput = String(mark).trim().toUpperCase();

        if (markInput !== "X" && markInput !== "O"){
            return {
                ok: false,
                reason: "Please choose X or O"
            }
        }


        cells[index] = markInput;
        return {
            ok: true
        }
    }

    function resetGame () {
            for( let i = 0; i < boardSize; i++){
                cells[i] = null;
            }
        }

    
    return {
        getBoardSnapshot,
        getEmptyCells,
        placeMark,
        resetGame,
    }

})();


// Prints a fixed 3x3 mapping for the board
function boardMap() {
  console.log(`
 1 | 2 | 3
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 
`);
}


// Show how the board looks with values in them. 
// 'snapshot' is the snapshot array value from initiateGameBoard
function showBoardToUser(snapshot){
    
    // Get the value of each cell on the board.
    //Even though indexes start at 0, adding 1 for the user's sake
    function cellValue(indexVal){
    if (snapshot[indexVal] === null){
        return String(indexVal + 1)
    }
    else{
        return snapshot[indexVal];
    }
}

    // How each row on the board should look
    function eachRow(rowNum){
        
        // Example: if the rowNum = 1, the left, middle and right gives 3, 4, 5

        //For any given rowNum, the left column Index number of that row is:
        const leftColIndex = 3 * rowNum;

        //For any given rowNum, the middle column Index number of that row is:
        const middleColIndex = (3 * rowNum) + 1;

        //For any given rowNum, the right column Index number of that row is:
        const rightColIndex = (3 * rowNum) + 2


        // Combining cellValue with ColIndex, gives the actual value of each cell.
        const actualLeftCellValue = cellValue(leftColIndex);
        const actualMiddleCellValue = cellValue(middleColIndex);
        const actualRightCellValue = cellValue(rightColIndex);

        const printLine = `${actualLeftCellValue} | ${actualMiddleCellValue} | ${actualRightCellValue}`;

        return printLine;

    }

console.log(eachRow(0));
console.log("---+---+---");
console.log(eachRow(1));
console.log("---+---+---");
console.log(eachRow(2));

}


//A function that determines who wins the game
function gameResult(snapshot){
    
    if (!Array.isArray(snapshot) || snapshot.length !== 9){
        return{
            ok: false,
            reason: "Board must be an array of length 9"
        }
    }

    for (const cell of snapshot){
        if(cell !== null && cell !=="X" && cell !== "O"){
            return {
                ok: false,
                reason: "Board contains invalid cell values"
            }
        }
    }


    //We're going to check if each row has the same value
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];

     //check if each COLUMN has the same value
    const columns = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

     //check if each DIAGONAL has the same value
     const diagonals = [
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    //Using destructuring to check each row
    function checkLines (snapshot, lines) {
        for (const[a,b,c] of lines){
            const valueOfA = snapshot[a];
            const valueOfB = snapshot[b];
            const valueOfC = snapshot[c];
            
            if (valueOfA !== null && valueOfA === valueOfB && valueOfB === valueOfC){
                return{
                    ok: true,
                    winner: valueOfA,
                    line: [a , b, c]
                };
            }
        }
        return {
                ok: false
            };
    }

    //use the spread operator to combine them
    const allCombos = [...rows, ...columns, ...diagonals];

    //checking for a winner
    const winResult = checkLines(snapshot, allCombos);
    if(winResult.ok){
        return {
            ok: true,
            status: "win",
            winner: winResult.winner,
            line: winResult.line
        };
    }

    //checking if it is a draw if no winner.
    const isFull= snapshot.every( cell => {
        return cell !== null;
    });
    if(isFull){
        return{
            ok: true,
            status: "draw"
        }
    }

    return {
        ok: true,
        status: "ongoing"
    };
}


function getIndexNumFromUser(){
    // Ask for position based on board
    const baseMessage = "Have a look at the board, where would like to play?";
    let message = baseMessage;

    while (true){
        const userInput = prompt(message);
        
        //check if the user clicked cancel
        if (userInput === null){
            return null;
        }

        //if the user enters something
        const trimmedInput = userInput.trim();
        const inputBtwn1To9 = /^[1-9]$/.test(trimmedInput);
        if (!inputBtwn1To9){
           message = `Input not valid. ${baseMessage}`
           continue;
        }

        //change input to base 10
        const base10 = Number.parseInt(inputBtwn1To9, 10);
        const index = base10 -1;

        return index;
    }
    
}




function playGame(){
    
    //1. prompt for users name
    const playerName = prompt("what is your name?");
    const player = createUser(playerName);

    console.log(player.getName());
    console.log(player.getMark());

    //Show Board
    boardMap();

    const userIndex = getIndexNumFromUser();
    if (userIndex === null){
        console.log("Input position cancelled");
        return;
    }

    initiateGameBoard.placeMark(userIndex);
    
}