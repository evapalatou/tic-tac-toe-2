// Add confetti on win
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
        confetti(); // Trigger confetti
        updateScore(currentPlayer === 'X' ? 'O' : 'X');
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerText = 'Draw!';
        gameActive = false;
        drawSound.play();
    }
}

// Add confetti.js for this
function confetti() {
    const confettiSettings = { target: 'confetti-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}