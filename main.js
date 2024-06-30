let currentRound = 1;
let player1Score = 0;
let player2Score = 0;

function generatePlatforms(playerSide) {
    const side = document.getElementById(playerSide);
    for (let i = 1; i <= 10; i++) {
        const platform = document.createElement('div');
        platform.className = 'platform';
        platform.style.bottom = `${i * 60}px`;
        side.appendChild(platform);
    }
}

function jumpPlayer(player, height) {
    const playerElement = document.getElementById(player);
    playerElement.style.bottom = `${height}px`;
}

function playRound() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const guess1 = parseInt(document.getElementById('guess1').value);
    const guess2 = parseInt(document.getElementById('guess2').value);

    document.getElementById('target').textContent = targetNumber;

    const diff1 = Math.abs(targetNumber - guess1);
    const diff2 = Math.abs(targetNumber - guess2);

    if (diff1 < diff2) {
        player1Score++;
        jumpPlayer('player1', currentRound * 60);
    } else if (diff2 < diff1) {
        player2Score++;
        jumpPlayer('player2', currentRound * 60);
    } else {
        jumpPlayer('player1', currentRound * 60);
        jumpPlayer('player2', currentRound * 60);
    }

    currentRound++;
    document.getElementById('round').textContent = currentRound;

    if (currentRound > 3) {
        setTimeout(() => {
            alert(`Game Over!\nPlayer 1: ${player1Score}\nPlayer 2: ${player2Score}`);
            resetGame();
        }, 1000);
    }
}

function resetGame() {
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    document.getElementById('round').textContent = currentRound;
    document.getElementById('target').textContent = '?';
    jumpPlayer('player1', 0);
    jumpPlayer('player2', 0);
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    generatePlatforms('player1-side');
    generatePlatforms('player2-side');

    // Add event listener to the submit button
    document.getElementById('submit-guesses').addEventListener('click', playRound);
});