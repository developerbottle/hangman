import Hangman from "./hangman";
import getPuzzle from "./requests";

const wordElement = document.querySelector("#word");
const statusElement = document.querySelector("#status");

let game;

const render = (hangman) => {
    wordElement.innerHTML = "";

    game.puzzle.split("").forEach((letter) => {
        const letterBlock = document.createElement("span");
        letterBlock.textContent = letter;
        wordElement.appendChild(letterBlock);
    });

    statusElement.textContent = hangman.statusMessage;
};

window.addEventListener("keypress", e => {
    game.makeGuess(e.key);
    render(game);
});

const startGame = async () => {
    const puzzle  = await getPuzzle("2");
    game = new Hangman(puzzle, 5);
    render(game);
};

document.querySelector("#reset").addEventListener("click", startGame);

startGame();