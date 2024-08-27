const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const condition of winningCombinations) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
};

const isBoardFull = () => boardState.every(cell => cell !== '');

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (boardState[index] === '' && isGameActive) {
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            showPopup(`${winner} wins!`);
            isGameActive = false;
        } else if (isBoardFull()) {
            showPopup('It\'s a draw!');
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
};

const restartGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    popup.style.display = 'none';
};

const showPopup = (message) => {
    popupMessage.textContent = message;
    popup.style.display = 'block';
};

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
