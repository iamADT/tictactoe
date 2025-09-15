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
    
    //Snapshot of the board
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
function showBoardToUser(snapShotValFromInitaiteBoard){
    
    // Get the value of each cell on the board
    function cellValue(indexVal){
    if (snapShotValFromInitaiteBoard[indexVal] == null){
        return String(indexVal + 1)
    }
    else{
        return snapShotValFromInitaiteBoard[indexVal];
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




function playGame(){
    
    //1. prompt for users name
    const player = () => {
        const playerName = prompt("what is your name?");
        return createUser(playerName);
    }
    console.log(player.getName());
    console.log(player.getMark());

    //Show Board
    boardMap();

    
    // Ask for position based on board
    let playerPosition = () => {
        return prompt("Have a look at the board, where would like to play?")
    }


    




 
    //3. prompt for where the user would like to play 
    // (i need to show the user the empty slots but i don't know how to do that is intuitieve to the user)
    //4. once position is given, call placeMark function
}