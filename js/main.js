/*----- constants -----*/
const lookup = {
    "1": redPiece,
    "-1": yellowPiece,
    null: "",
};

const winningCombos = {

}

/*----- app's state (variables) -----*/
let board, turn, winner;


/*----- cached element references -----*/
const message = document.querySelector('h2');
const spaces = document.querySelector('td');


/*----- event listeners -----*/
document.querySelector("table").addEventListener("click", handleMove);
document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/
function init() {
    board = [null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
}

function handleMove(evt) {

}