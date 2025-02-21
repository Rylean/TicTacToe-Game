let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

cells.forEach(cell => {
    cell.addEventListener("click", function () {
        if (!cell.classList.contains("taken") && currentPlayer === "X") {
            cell.innerText = "X";
            board[cell.id] = "X";
            cell.classList.add("taken");
            checkWinner();
            currentPlayer = "O";
            
            setTimeout(() => {
                if (currentPlayer === "O") botMove();
            }, 500);
        }
    });
});

function botMove() {
    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(v => v !== null);
    
    if (emptyCells.length > 0) {
        let botChoice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[botChoice] = "O";
        document.getElementById(botChoice).innerText = "O";
        document.getElementById(botChoice).classList.add("taken");
        checkWinner();
        currentPlayer = "X";
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = `Player ${board[a]} wins!`;
            cells.forEach(cell => cell.classList.add("taken"));
            return;
        }
    }
    
    if (!board.includes("")) {
        statusText.innerText = "It's a draw!";
    }
}

resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("taken");
    });
});
