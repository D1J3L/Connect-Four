/*----- constants -----*/
const lookup = {
    1: 'Red',
    '-1': 'Yellow',
    null: '',
};

const winningCombos = [
    [0,1,2,3], [1,2,3,4], [2,3,4,5], [3,4,5,6], [7,8,9,10],
    [8,9,10,11], [9,10,11,12], [10,11,12,13], [14,15,16,17], [15,16,17,18],
    [16,17,18,19], [17,18,19,20], [21,22,23,24], [22,23,24,25], [23,24,25,26],
    [24,25,26,27], [28,29,30,31], [29,30,31,32], [30,31,32,33], [31,32,33,34],
    [35,36,37,38], [36,37,38,39], [37,38,39,40], [38,39,40,41], [0,7,14,21],
    [1,8,15,22], [2,9,16,23], [3,10,17,24], [4,11,18,25], [5,12,19,26],
    [6,13,20,27], [7,14,21,28], [8,15,22,29], [9,16,23,30], [10,17,24,31],
    [11,18,25,32], [12,19,26,33], [13,20,27,34], [14,21,28,35], [15,22,29,36],
    [16,23,30,37], [17,24,31,38], [18,25,32,39], [19,26,33,40], [20,27,34,41],
    [0,8,16,24], [1,9,17,25], [2,10,18,26], [3,11,19,27], [6,12,18,24],
    [7,15,24,31], [5,11,17,23], [8,16,25,32], [4,10,16,22], [9,17,26,33],
    [3,9,15,21], [13,19,25,31], [14,22,30,38], [12,18,24,30], [15,23,31,39],
    [11,17,23,29], [16,24,32,40], [10,16,22,28], [17,25,33,41], [20,26,32,38],
    [19,25,31,37], [18,24,30,36], [17,23,29,35],
];

/*----- app's state (variables) -----*/
let board, turn, winner;


/*----- cached element references -----*/
const message = document.querySelector('h1');
const spaceEl = document.querySelectorAll('td');
const tRow = document.getElementsByTagName('tr');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/
init();

function init() {
    document.querySelector('table').addEventListener('click', handleMove);
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
    let row = [];
    let column = evt.target.cellIndex;
    for (let i = 5; i > -1; i--) {
        if (tRow[i].children[column].style.background === '') {
            row.push(tRow[i].children[column]);
            let cellId = row[0].id.replace('sq', '');
            board[cellId] = turn;
        }
    }
    turn *= -1;
    winner = getWinner();
    render();
}


function getWinner() {
	for (let i = 0; i < winningCombos.length; i++) {
		if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] + board[winningCombos[i][3]]) === 4) {
			return board[winningCombos[i][0]];
		}
	}
	if (board.includes(null)) return null;
	return "T";
}

function render() {
	board.forEach(function(sq, i) {
		spaceEl[i].style.background = lookup[sq];
	});
	if (winner === "T") {
        message.innerHTML = `Tied!`;
	} else if (winner) {
		message.innerHTML = `${lookup[winner]} wins!`;
		document.querySelector('table').removeEventListener('click', handleMove);
	} else {
		message.innerHTML = `${lookup[turn]} you're next!`;
	}
}
