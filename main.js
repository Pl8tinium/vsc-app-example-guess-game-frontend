import { play, openGame, joinGame, resetGame } from './hive-service'
import Axios from 'axios'

export const CONTRACT_ID = 'vs41q9c3yg9u784wm4m2rwtd8dejynw7u3t0fnehv03yxdqqe9m9n7tcw538scemlayn'

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

function getLastOutputTransaction() {
    // CONTRACT_ID
}

function enableContractStatusCheck() {
    contractStatusCheckInterval = setInterval(async () => {
        let mode = 0;
        let round = 0;
        let fetchedPlayer1Score = 0;
        let fetchedPlayer2Score = 0;
        // WIP ADD CONTRACT STATE CHECK HERE, BASICALLY GET THE CONTRACT STORAGE AND EXTRACT IMP INFO
        // depending on if YOU ARE player1 or player2 go into state 3 or 4, will be different for both players

        const txId = getLastOutputTransaction()
        const state = await getContractState(txId)

        if (!("game_params" in state)) {
            mode = 0
        } else if (!("player2" in state["game_params"])) {
            mode = 1
        } else {
            fetchedPlayer1Score = state["game_params"]["player1Score"]
            fetchedPlayer2Score = state["game_params"]["player2Score"]
            round = state["game_params"]["currentRound"]

            if (state["game_params"]["player1Guess"] === 0 && state["game_params"]["player2Guess"] === 0) {
                mode = 2
            } else if (state["game_params"]["player1Guess"] !== 0) {
                mode = 3
            } else if (state["game_params"]["player2Guess"] !== 0) {
                mode = 4
            } else {
                throw new Error("Invalid state")
            }
        }

        if ("winner" in state) {
            mode = 5
        }

        // mode 0 = init
        // mode 1 = game created
        // mode 2 = no player played
        // mode 3 = player1 played
        // mode 4 = player2 played
        // mode 5 = game over

        // adjust UI based on contract mode
        if (mode === 0) {
            document.getElementById('guess').disabled = true;
            document.getElementById('submit-guess').disabled = true;
            document.getElementById('start-game').disabled = false;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = true;
            document.getElementById('round').textContent = "-";
            document.getElementById('status').textContent = "Contract is ready";
            player1Score = 0;
            player2Score = 0;
        } else if (mode === 1) {
            document.getElementById('guess').disabled = true;
            document.getElementById('submit-guess').disabled = true;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = false;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = "-";
            document.getElementById('status').textContent = "Game created, waiting for player 2 to join";
        } else if (mode === 2) {
            document.getElementById('guess').disabled = false;
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "waiting for both players to play";
        } else if (mode === 3) {
            document.getElementById('guess').disabled = false;
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "waiting for player 2 to play";
        } else if (mode === 4) {
            document.getElementById('guess').disabled = false;
            document.getElementById('submit-guess').disabled = false;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "waiting for player 1 to play";
        } else if (mode === 5) {
            document.getElementById('guess').disabled = true;
            document.getElementById('submit-guess').disabled = true;
            document.getElementById('start-game').disabled = true;
            document.getElementById('join-game').disabled = true;
            document.getElementById('reset-game').disabled = false;
            document.getElementById('round').textContent = round;
            document.getElementById('status').textContent = "Winner: " + state["winner"];
        }

        // update visuals based on contract mode

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

async function getContractState(lastOutputTx) {
    const STATE_GQL = `
        query MyQuery($outputId: String) {
            contractState(id: $outputId) {
                state
            }
        }
    `

    const { data } = await Axios.post(`http://192.168.0.213:1337/api/v1/graphql`, {
        query: STATE_GQL,
        variables: {
            outputId: lastOutputTx,
        },
    })

    return data.data.contractState.state
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
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