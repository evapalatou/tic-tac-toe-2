// Sound effects
const moveSound = new Audio('assets/sounds/move.mp3');
const winSound = new Audio('assets/sounds/win.mp3');
const drawSound = new Audio('assets/sounds/draw.mp3');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
// Initially mute all sounds
moveSound.muted = true;
winSound.muted = true;
drawSound.muted = true;
let isMuted = true; // Audio is muted by default

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

/**
 * This functions toggles between mute and unmute. 
 * Game's default audio setting is mute
 */
function toggleMute() {
    isMuted = !isMuted;

    // Toggle the muted property for each sound effect
    moveSound.muted = isMuted;
    winSound.muted = isMuted;
    drawSound.muted = isMuted;

    // Update the mute button icon based on the state
    const muteButton = document.getElementById('muteButton');
    muteButton.innerHTML = isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>'; // Use different icons for mute/unmute
}

/** 
 * This function handles a cell click. 
 * It checks the condition of whether the cell is full or the game is active in order to place a mark
 * Also, plays a sound effect in case the audio is not muted, updates the game board and checks the winning conditions
 *  
*/
function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Play move sound if not muted
    if (!isMuted) {
        moveSound.play();
    }
    // Updates the game board
    updateBoard(clickedCellIndex);
    // Checks for the winning conditions
    checkForWinner();
}

/**
 * This function updates the game board.
 * Initially, starts with X player and then decides who is the current player.
 * A message is displayed under the game board with player's turn (X or O)
 */
function updateBoard(index) {
    board[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

/**
 * This function checks if there is a winner or draw.
 * We implement a for loop to find the winning condition.
 * When the winning condition is met the loop breaks.
 * In any other case, we use if conditions to decide which player is winning and the game tracks each player's moves.\
 * If there is no empty cell left, and the winning condition is not met, THEN it is a draw!
 */
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

/**
 * This function is used to highlight the winning cells.
 * It operates like a javascript animation that indicates which winning combination is met
 * It becomes active ONLY when one of the winning conditions is met.
 */
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
// Attach event listener to the mute/unmute button
document.getElementById('muteButton').addEventListener('click', toggleMute);