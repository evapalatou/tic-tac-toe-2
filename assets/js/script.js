// Sound effects
const moveSound = new Audio('assets/sounds/move.mp3');
const winSound = new Audio('assets/sounds/win.mp3');
const drawSound = new Audio('assets/sounds/draw.mp3');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let isMuted = false; // Variable to track mute state

const statusDisplay = document.getElementById('status');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const muteButton = document.getElementById('muteButton'); // Mute/Unmute button
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

// Toggle mute/unmute
muteButton.addEventListener('click', toggleMute);

function toggleMute() {
    isMuted = !isMuted; // Toggle mute state
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute'; // Update button text
}

// Handle a cell click
function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Play move sound if not muted
    if (!isMuted) {
        moveSound.play();
    }

    updateBoard(clickedCellIndex);
    checkForWinner();
}

// Update the board
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
        if (!isMuted) {
            winSound.play();
        }
        updateScore(currentPlayer === 'X' ? 'O' : 'X');
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Draw!';
        gameActive = false;
        if (!isMuted) {
            drawSound.play();
        }
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

// Event listeners for game control
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('newGame').addEventListener('click', newGame);