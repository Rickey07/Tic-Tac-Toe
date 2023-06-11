const allCells = document.querySelectorAll(
  ".board-cell"
) as NodeListOf<HTMLElement> | null;
const allPlayerCells = document.querySelectorAll(
  ".player-cell"
) as NodeListOf<HTMLElement> | null;
let currentPlayer: string = "X";
let currentPlayerClass: string =
  currentPlayer === "X" ? "x-player" : "o-player";
const winingCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const currentPlayerEle = document.querySelector("#current-player");
const messageContainer = document.querySelector("#message-container");
const resetButton = document.querySelector(
  ".reset-button"
) as HTMLButtonElement;

// Add Event Listener on each board cell
allCells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    cell.firstElementChild.classList.add(currentPlayerClass);
    const winner = checkWinner(currentPlayerClass);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    changeCurrentPlayer(currentPlayer, winner);
    currentPlayerClass = currentPlayer === "X" ? "x-player" : "o-player";
  });
});

resetButton.addEventListener("click", () => {
  resetGame();
});

// Check winner
function checkWinner(currentClass: string): boolean {
  const winner = winingCombinations.some((combination) => {
    return combination.every((comb) => {
      return allPlayerCells[comb].classList.contains(currentClass);
    });
  });
  return winner;
}

// Reset Game
function resetGame(): void {
  allPlayerCells.forEach((playerCell) => {
    if (playerCell.classList.contains("x-player")) {
      playerCell.classList.remove("x-player");
    } else {
      playerCell.classList.remove("o-player");
    }
  });
  currentPlayer = "X";
  currentPlayerClass = "x-player";
  messageContainer.textContent = `Current Player:- ${currentPlayer}`;
  resetButton.style.display = "none";
}

// Insert Current Player into Dom

function changeCurrentPlayer(currentPlayer: string, isWinner?: boolean): void {
  messageContainer.textContent = `Current Player:- ${currentPlayer}`;

  if (isWinner) {
    messageContainer.textContent = `Better Luck Next Time! ${currentPlayer}`;
    resetButton.style.display = "block";
  }
}
