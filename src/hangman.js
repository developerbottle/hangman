class Hangman {
    constructor(word, guessesAllowed) {
        this.word = Array.from(word.toLowerCase());
        this.livesCount = guessesAllowed;
        this.guessedLetters = [];
        this.status = "playing";
    }

    get puzzle() {
        let puzzle = "";

        this.word.forEach((letter) => {
            if (letter === " " || this.guessedLetters.includes(letter)) {
                puzzle += letter;
            } else {
                puzzle += "*";
            }
        });

        return puzzle;
    }

    makeGuess(guess) {
        if (this.status !== "playing") return;

        guess = guess.toLowerCase();

        if (this.guessedLetters.includes(guess)) return;

        this.guessedLetters.push(guess);

        if (!this.word.includes(guess)) this.livesCount--;

        this.calcStatus();
    }

    calcStatus() {
        if (this.livesCount <= 0) this.status = "failed";
        else if (this.puzzle.includes("*")) this.status = "playing";
        else this.status = "finished";
    }

    get statusMessage() {
        switch (this.status) {
            case "playing":
                return `Playing -> Lives Left: ${this.livesCount}`;
            case "failed":
                return `Failed -> Nice try! The word was "${this.word.join('')}"`;
            case "finished":
                return "Finished -> Great job! You guessed the word.";
        }
    }
}

export { Hangman as default };