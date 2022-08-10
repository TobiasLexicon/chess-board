function drawChessBoard() {
  let firstSquareShade = 'light';
  for (let i = 0; i < 8; i++) {
    drawBoardRow(firstSquareShade);
    firstSquareShade = firstSquareShade == 'dark' ? 'light' : 'dark';
  }
}

function addPieces() {
  let major = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  let pawns = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'];
  addRowOfPieces('black', major, 0);
  addRowOfPieces('black', pawns, 1);
  addRowOfPieces('white', pawns, 6);
  addRowOfPieces('white', major, 7);
}

function addRowOfPieces(color, pieces, rowIndex) {
  for (let i = 0; i < 8; i++) {
    let newPiece = document.createElement('img');
    newPiece.src = `/img/${pieces[i]}-${color}.png`;
    document.getElementsByClassName('square')[i + rowIndex * 8].appendChild(newPiece);
  }
}

function addRook() {
  let newRook = document.createElement('img');
  newRook.src = '/img/rook-black.png';
  document.getElementsByClassName('square')[0].appendChild(newRook);
}

function drawBoardRow(color) {
  let nextSquareShade = color;
  for (let i = 0; i < 8; i++) {
    let newSquare = document.createElement('div');
    newSquare.classList.add('square');
    newSquare.classList.add(nextSquareShade);
    document.getElementById('board').appendChild(newSquare);
    nextSquareShade = nextSquareShade == 'dark' ? 'light' : 'dark';
  }
}

function movePiece(oldPosition, newPosition) {
  let imageTag = oldPosition.childNodes[0];
  oldPosition.removeChild(imageTag);
  newPosition.appendChild(imageTag);
}

drawChessBoard();
addPieces();

document.getElementById('board').addEventListener('mousedown', function (event) {
  event.preventDefault();

  if (
    document.getElementsByClassName('highlighted').length == 0 &&
    event.path[0].tagName == 'IMG'
  ) {
    event.path[1].classList.add('highlighted');
  }
});

document.getElementById('board').addEventListener('mouseup', function (event) {
  event.preventDefault();
  let oldPosition = document.getElementsByClassName('highlighted')[0];
  let newPosition = event.path[0];
  if (newPosition.tagName == 'DIV') {
    movePiece(oldPosition, newPosition);
  }
  document.getElementsByClassName('highlighted')[0].classList.remove('highlighted');
});
