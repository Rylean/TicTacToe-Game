const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    if (!gameActive) return;
    const index = event.target.dataset.index;
    if (gameBoard[index] !== "" || currentPlayer === "O") return;
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");
    if (checkWinner()) return;
    currentPlayer = "O";
    statusText.textContent = "Bot's turn";
    setTimeout(botMove, 500);
}

function botMove() {
    let emptyCells = gameBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    if (emptyCells.length === 0) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomIndex] = "O";
    let botCell = document.querySelector(`[data-index='${randomIndex}']`);
    botCell.textContent = "O";
    botCell.classList.add("taken");
    if (checkWinner()) return;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.textContent = `Player ${gameBoard[a]} wins!`;
            gameActive = false;
            return true;
        }
    }
    return false;
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    gameActive = true;
    createBoard();
}

resetButton.addEventListener("click", resetGame);
createBoard();
