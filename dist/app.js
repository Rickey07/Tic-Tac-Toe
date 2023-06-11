var allCells = document.querySelectorAll(".board-cell");
var allPlayerCells = document.querySelectorAll(".player-cell");
var currentPlayer = "X";
var currentPlayerClass = currentPlayer === "X" ? "x-player" : "o-player";
var winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var currentPlayerEle = document.querySelector("#current-player");
var messageContainer = document.querySelector("#message-container");
var resetButton = document.querySelector(".reset-button");
// Add Event Listener on each board cell
allCells.forEach(function (cell) {
    cell.addEventListener("click", function (e) {
        cell.firstElementChild.classList.add(currentPlayerClass);
        var winner = checkWinner(currentPlayerClass);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        changeCurrentPlayer(currentPlayer, winner);
        currentPlayerClass = currentPlayer === "X" ? "x-player" : "o-player";
    });
});
resetButton.addEventListener("click", function () {
    resetGame();
});
// Check winner
function checkWinner(currentClass) {
    var winner = winingCombinations.some(function (combination) {
        return combination.every(function (comb) {
            return allPlayerCells[comb].classList.contains(currentClass);
        });
    });
    return winner;
}
// Reset Game
function resetGame() {
    allPlayerCells.forEach(function (playerCell) {
        if (playerCell.classList.contains("x-player")) {
            playerCell.classList.remove("x-player");
        }
        else {
            playerCell.classList.remove("o-player");
        }
    });
    currentPlayer = "X";
    currentPlayerClass = "x-player";
    messageContainer.textContent = "Current Player:- ".concat(currentPlayer);
    resetButton.style.display = "none";
}
// Insert Current Player into Dom
function changeCurrentPlayer(currentPlayer, isWinner) {
    messageContainer.textContent = "Current Player:- ".concat(currentPlayer);
    if (isWinner) {
        messageContainer.textContent = "Better Luck Next Time! ".concat(currentPlayer);
        resetButton.style.display = "block";
    }
}
