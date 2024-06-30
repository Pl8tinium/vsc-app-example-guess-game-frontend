import { play, openGame, joinGame, resetGame } from './hive-service'

function generatePlatforms(playerSide) {
    const side = document.getElementById(playerSide);
    for (let i = 1; i <= 10; i++) {
        const platform = document.createElement('div');
        platform.className = 'platform';
        platform.style.bottom = `${i * 60}px`;
        side.appendChild(platform);
    }
}

function jumpPlayer(player, score) {
    const playerElement = document.getElementById(player);
    playerElement.style.bottom = `${score * 60}px`;
}

let contractStatusCheckInterval;

let player1Score = 0;
let player2Score = 0;

function enableContractStatusCheck() {
    contractStatusCheckInterval = setInterval(() => {
        const contractState = 5;
        const round = 5;
        // WIP ADD CONTRACT STATE CHECK HERE, BASICALLY GET THE CONTRACT STORAGE AND EXTRACT IMP INFO
        // ALSO UPDATE PLAYERSCORES BELOW
        // depending on if YOU ARE player1 or player2 go into state 3 or 4, will be different for both players

        // state 0 = init
        // state 1 = game created
        // state 2 = no player played
        // state 3 = player1 played
        // state 4 = player2 played

        // adjust UI based on contract state
        if (contractState === 0) {
            document.getElementById('guess').disabled = true;
            document.getElementById('submit-guess').disabled = true;
            document.getElementById('start-game').disabled = false;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = true;
            document.getElementById('round').textContent = "-";
            document.getElementById('status').textContent = "Contract is ready";
            player1Score = 0;
            player2Score = 0;
        } else if (contractState === 1) {
            document.getElementById('guess').disabled = true;
            document.getElementById('submit-guess').disabled = true;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = false;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = "-";
            document.getElementById('status').textContent = "Game created, waiting for player 2 to join";
        } else if (contractState === 2) {
            document.getElementById('guess').disabled = false;
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "waiting for both players to play";
        } else if (contractState === 3) {
            document.getElementById('guess').disabled = false;
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "waiting for player 2 to play";
        } else if (contractState === 4) {
            document.getElementById('guess').disabled = false;
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "waiting for player 1 to play";
        }

        // update visuals based on contract state
        const fetchedPlayer1Score = 5;
        const fetchedPlayer2Score = 5;
        if (fetchedPlayer1Score !== player1Score) {
            player1Score = fetchedPlayer1Score;
            jumpPlayer('player1', player1Score);
        }
        if (fetchedPlayer2Score !== player2Score) {
            player2Score = fetchedPlayer2Score;
            jumpPlayer('player2', player2Score);
        }

    }, 10 * 1000);
}

function disableContractStatusCheck() {
    clearInterval(contractStatusCheckInterval);
}

function playRound() {
    const guess = parseInt(document.getElementById('guess').value);
    play(guess)
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    generatePlatforms('player1-side');
    generatePlatforms('player2-side');

    // Add event listener to the submit button
    document.getElementById('submit-guess').addEventListener('click', playRound);
    document.getElementById('start-game').addEventListener('click', openGame);
    document.getElementById('join-game').addEventListener('click', joinGame);
    document.getElementById('reset-game').addEventListener('click', resetGame);
    document.getElementById('enable-contract-status-check').addEventListener('click', enableContractStatusCheck);
    document.getElementById('disable-contract-status-check').addEventListener('click', disableContractStatusCheck);
});