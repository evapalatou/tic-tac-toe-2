// Sound effects for each movement, the win condition and the draw
const moveSound = new Audio('assets/sounds/move.mp3');
const winSound = new Audio('assets/sounds/win.mp3');
const drawSound = new Audio('assets/sounds/draw.mp3');

// we use the following let variables for:
let board = ['', '', '', '', '', '', '', '', '']; // empty board 
let currentPlayer = 'X'; // active player, always X starts first
let gameActive = true; // checks the game's status
let scoreX = 0; // X's score
let scoreO = 0; // O's score
let isMuted = false; // Variable to track the current mute state

const statusDisplay = document.getElementById('status'); // dynamic game board
const scoreXDisplay = document.getElementById('scoreX'); // stores X's total score
const scoreODisplay = document.getElementById('scoreO'); // stores O's total score
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/** A function that handles a cell click and takes as a parameter an event,
* checks whether a cell is empty or not in order to decide the game activity status. 
*/
function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Play move sound
    moveSound.play();

    updateBoard(clickedCellIndex);
    checkForWinner();
}

/** Update the board function uses the ternary operator to decide player's turn is to mark the board.
* 
*/
function updateBoard(index) {
    board[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

// Check for a winner or draw
function checkForWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        highlightWinningCells(winningCells);
        gameActive = false;
        statusDisplay.innerText = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        winSound.play();
        updateScore(currentPlayer === 'X' ? 'O' : 'X');
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Draw!';
        gameActive = false;
        drawSound.play();
    }
}

// Highlight the winning cells
function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).classList.add('winning');
    });
}

// Update the score
function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.innerText = scoreX;
    } else {
        scoreO++;
        scoreODisplay.innerText = scoreO;
    }
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winning');
    });
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

// Start a new game (resets scores too)
function newGame() {
    resetGame();
    scoreX = 0;
    scoreO = 0;
    scoreXDisplay.innerText = scoreX;
    scoreODisplay.innerText = scoreO;
}

// Add event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('newGame').addEventListener('click', newGame);
// Add event listener to the mute button
document.getElementById('muteButton').addEventListener('click', toggleMute);

// Initialize status
statusDisplay.innerText = `It's ${currentPlayer}'s turn`;