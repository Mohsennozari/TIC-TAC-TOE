document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll(".cell");
    const statustext = document.querySelector("#statustext");
    const restartBtn = document.querySelector("#resetBtn");
    const toggleModeBtn = document.getElementById('toggleModeBtn');

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

    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = false;

    // Initialize the game when the script loads
    initializeGame();

    function initializeGame() {
        cells.forEach(cell => cell.addEventListener("click", cellClicked));
        restartBtn.addEventListener("click", restartGame);
        statustext.textContent = `${currentPlayer}'s turn`;
        running = true;
    }

    function cellClicked() {
        const cellIndex = this.getAttribute("cellIndex");
        if (options[cellIndex] !== "" || !running) {
            return; 
        }
        updateCell(this, cellIndex);
        checkWinner();
    }

    function updateCell(cell, index) {
        options[index] = currentPlayer;
        cell.textContent = currentPlayer;
    }

    function changePlayer() {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statustext.textContent = `${currentPlayer}'s turn`;
    }

    function checkWinner() {
        let roundWon = false;

        for (let i = 0; i < winCondition.length; i++) {
            const condition = winCondition[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];

            if (cellA === "" || cellB === "" || cellC === "") {
                continue; 
            }

            if (cellA === cellB && cellB === cellC) {
                roundWon = true; 
                break; 
            }
        }

        if (roundWon) {
            statustext.textContent = `${currentPlayer} wins!`;
            running = false;
        } else if (!options.includes("")) {
            statustext.textContent = `Draw!`; 
            running = false;
        } else {
            changePlayer(); 
        }
    }

    function restartGame() {
        currentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
        statustext.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        running = true;
    }

    // Dark mode toggle functionality
    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleModeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });
});
