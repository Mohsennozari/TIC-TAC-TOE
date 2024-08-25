// Select all cells, status text, and reset button from the DOM
const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext"); // Updated selector
const restartBtn = document.querySelector("#resetBtn"); // Updated selector

// Define the winning conditions for the game
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game state
let options = ["", "", "", "", "", "", "", "", ""]; // Array to track the state of each cell
let currentPlayer = "X"; // Start with player X
let running = false; // Game status

// Initialize the game when the script loads
initializeGame();

function initializeGame() {
    // Add click event listeners to each cell
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    // Add click event listener to the reset button
    restartBtn.addEventListener("click", restartGame);
    // Set the initial status text
    statustext.textContent = `${currentPlayer}'s turn`;
    running = true; // Set the game to running state
}

function cellClicked() {
    // Get the index of the clicked cell
    const cellIndex = this.getAttribute("cellIndex");
    // Check if the cell is already filled or if the game is not running
    if (options[cellIndex] !== "" || !running) {
        return; // Exit the function if the cell is not empty or game is over
    }
    // Update the cell with the current player's symbol
    updateCell(this, cellIndex);
    // Check if there is a winner after the move
    checkWinner();
}

function updateCell(cell, index) {
    // Update the options array with the current player's symbol
    options[index] = currentPlayer;
    // Display the current player's symbol in the clicked cell
    cell.textContent = currentPlayer;
}

function changePlayer() {
    // Switch the current player between X and O
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    // Update the status text to reflect the current player's turn
    statustext.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false; // Flag to check if a round is won

    // Loop through all winning conditions
    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i]; // Get the current winning condition
        const cellA = options[condition[0]]; // Get the value of the first cell in the condition
        const cellB = options[condition[1]]; // Get the value of the second cell in the condition
        const cellC = options[condition[2]]; // Get the value of the third cell in the condition

        // Check if any of the cells are empty
        if (cellA === "" || cellB === "" || cellC === "") {
            continue; // Skip to the next condition if any cell is empty
        }
        // Check if all three cells have the same value (X or O)
        if (cellA === cellB && cellB === cellC) {
            roundWon = true; // Set the flag to true if a winning condition is met
            break; // Exit the loop since we found a winner
        }
    }

    // If a round is won, update the status text
    if (roundWon) {
        statustext.textContent = `${currentPlayer} wins!`; // Announce the winner
        running = false; // Stop the game
    } else if (!options.includes("")) {
        // Check for a draw if there are no empty cells left
        statustext.textContent = `Draw!`; // Announce the draw
        running = false; // Stop the game
    } else {
        changePlayer(); // Change the player if the game continues
    }
}

function restartGame() {
    currentPlayer = "X"; // Reset to player X
    options = ["", "", "", "", "", "", "", "", ""]; // Reset the options array
    statustext.textContent = `${currentPlayer}'s turn`; // Reset the status text
    cells.forEach(cell => cell.textContent = ""); // Clear all cells
    running = true; // Set the game to running state
}
