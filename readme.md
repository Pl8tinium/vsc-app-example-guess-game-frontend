# Example of a guessing game frontend that interacts with VSC a smart contract

In this repository, we demonstrate how to connect a web2 frontend (website) to a VSC smart contract.

While doing so we make use of the following tools of the VSC ecosystem.

- Contract template
- VSC client library

## What is this application about?

This repository is the frontend for a simple "game", in which 2 players are submitting guesses for a (pseudo) randomly pulled number. There are 3 rounds and the player that won the majority of those is the winner.  

The frontend serves an interface for the players to:

1. setup the game
2. join the game
3. take guesses
4. identify the winner

> The underlying logic is created in a VSC smart contract that can be found [here](https://github.com/Pl8tinium/vsc-app-example-guess-game-contract).

For more in-depth documentation please checkout the [VSC documentation in regards to this topic](https://docs.vsc.eco/docs/references/examples.md).

## Optimizations

- make guess number range adjustable
- make amount of rounds adjustable
- more players