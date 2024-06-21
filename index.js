let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
const scoreboard = document.getElementById('scoreboard')
const startBtn = document.getElementById('startBtn')
let player1, player2, currentPlayer


// function to show a message on the board
function showMessage(msg) {
  scoreboard.value = msg
  setTimeout(() => {
    scoreboard.value = ''
  }, 3000);
}


// checking if the name inputs are filled and initializing currentPlayer as player1 / restarting game
startBtn.addEventListener('click', () => {
  player1 = document.getElementById('playerName1').value
  player2 = document.getElementById('playerName2').value

  document.querySelectorAll('.squares').forEach((square) => {
    square.innerText = ''
    square.disabled = false
  })

  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  if (!player1 || !player2) {
    showMessage('Fill the name box!')
    return
  }

  if (player1 === player2) {
    showMessage('Set different names!')
    return
  }

  currentPlayer = player1
  showMessage(`Game started! ${currentPlayer}'s turn`)
}) 


// placing X or O in the squares
document.querySelectorAll('.squares').forEach((square) => {
  square.addEventListener('click', (ev) => {
    if (!player1 || !player2) {
      showMessage('Fill the name box!')
      return
    }

    if (!currentPlayer) { //isso significa que o usuário não chamou o event do startBtn
      showMessage('Click the start game button!')
      return
    }

    if (square.innerText === '') {
      const region = ev.currentTarget.dataset.region // currentTarget é o botão, que aciona o evento
      const rowColumnPair = region.split('.') // split fará com que "0.0" vire uma array ["0", "0"]
      const row = rowColumnPair[0]
      const column = rowColumnPair[1]

      square.innerText = currentPlayer === player1 ? 'X' : 'O'
      square.disabled = true
      board[row][column] =  currentPlayer === player1 ? 'X' : 'O' // se currentPlayer = player1, adiciona 'X' na matriz board

      if (checkWinner(board)) {
        showMessage(`${currentPlayer} is the winner!`)
        return
      }
      if (checkTie(board)) {
        showMessage("It's a tie!")
        return
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1
    }
    showMessage(`${currentPlayer}'s turn`)
  })
})


// checking winner
function checkWinner (board) {
  // check rows
  for (let i = 0; i < 3; i++) {
    const a = board[i][0]
    const b = board[i][1]
    const c = board[i][2]

    if (a !== '' && a === b && b === c) {
      return true
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    const a = board[0][i]
    const b = board[1][i]
    const c = board[2][i]

    if (a !== '' && a === b && b === c) {
      return true
    }
  }
  // check diagonals, firstly left top to right bottom, and then right top to left bottom
  const a = board[0][0]
  const b = board[1][1]
  const c = board[2][2]
  if (a !== '' && a === b && b === c) {
    return true
  }

  const d = board[0][2]
  const e = board[1][1]
  const f = board[2][0]
  if (d !== '' && d === e && e === f) {
    return true
  }

  return false
}


// checking if there's a tie
function checkTie (board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false
      }
    }
  }
  return true
}