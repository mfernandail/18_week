const $rollBtn = document.getElementById('rollBtn')
const $holdBtn = document.getElementById('holdBtn')
const $resetBtn = document.getElementById('resetBtn')
const $message = document.getElementById('message')

const $totalP1 = document.getElementById('totalP1')
const $roundP1 = document.getElementById('roundP1')

const $totalP2 = document.getElementById('totalP2')
const $roundP2 = document.getElementById('roundP2')

const $dice = document.getElementById('dice')

const $turnP1 = document.getElementById('turnP1')
const $turnP2 = document.getElementById('turnP2')

const TARGET = 100

let TURN = 'P1'
let TOTAL_P1 = 0
let TOTAL_P2 = 0

let WINS_P1 = 0
let WINS_P2 = 0

let roundAccum = 0
let DICE = null

$rollBtn.addEventListener('click', onRoll)
$holdBtn.addEventListener('click', onHold)
$resetBtn.addEventListener('click', onReset)

initUI()

function onRoll() {
  DICE = Math.floor(Math.random() * 6) + 1
  $dice.textContent = DICE

  if (DICE === 1) {
    roundAccum = 0
    updateRoundUI()
    $message.textContent = `${playerName(TURN)} rolled 1! Turn passes.`
    switchTurn()
    return
  }

  roundAccum += DICE
  updateRoundUI()

  if (TURN === 'P1') {
    $totalP1.textContent = TOTAL_P1
  } else {
    $totalP2.textContent = TOTAL_P2
  }
}

function onHold() {
  if (TURN === 'P1') {
    TOTAL_P1 += roundAccum
    $totalP1.textContent = TOTAL_P1
    if (TOTAL_P1 >= TARGET) return onWin('P1')
  } else {
    TOTAL_P2 += roundAccum
    $totalP2.textContent = TOTAL_P2
    if (TOTAL_P2 >= TARGET) return onWin('P2')
  }

  roundAccum = 0
  updateRoundUI()
  $message.textContent = `${playerName(TURN)} holds. Turn passes.`
  switchTurn()
}

function onWin(who) {
  $message.textContent = `${playerName(who)} wins! 🎉`
  if (who === 'P1') {
    WINS_P1++
    $roundP1.textContent = WINS_P1
  } else {
    WINS_P2++
    $roundP2.textContent = WINS_P2
  }
  setControlsEnabled(false)
}

function onReset() {
  TOTAL_P1 = 0
  TOTAL_P2 = 0
  roundAccum = 0
  DICE = null
  TURN = 'P1'

  initUI()
  setControlsEnabled(true)
  $message.textContent = 'Player 1’s turn.'
}

function initUI() {
  $dice.textContent = '—'
  $totalP1.textContent = '0'
  $totalP2.textContent = '0'
  $roundP1.textContent = '0'
  $roundP2.textContent = '0'

  $turnP1.textContent = '●'
  $turnP2.textContent = '○'
}

function switchTurn() {
  updateRoundUI()

  if (TURN === 'P1') {
    TURN = 'P2'
    $turnP1.textContent = '○'
    $turnP2.textContent = '●'
    $message.textContent = 'Player 2’s turn.'
  } else {
    TURN = 'P1'
    $turnP1.textContent = '●'
    $turnP2.textContent = '○'
    $message.textContent = 'Player 1’s turn.'
  }
}

function updateRoundUI() {
  if (TURN === 'P1') {
    $roundP1.textContent = roundAccum
    $roundP2.textContent = '0'
  } else {
    $roundP2.textContent = roundAccum
    $roundP1.textContent = '0'
  }
}

function playerName(turn) {
  return turn === 'P1' ? 'Player 1' : 'Player 2'
}

function setControlsEnabled(enabled) {
  $rollBtn.disabled = !enabled
  $holdBtn.disabled = !enabled
}

// const $rollBtn = document.getElementById('rollBtn')
// const $holdBtn = document.getElementById('holdBtn')
// const $resetBtn = document.getElementById('resetBtn')
// const $message = document.getElementById('message')

// const $totalP1 = document.getElementById('totalP1')
// const $roundP1 = document.getElementById('roundP1')

// const $totalP2 = document.getElementById('totalP2')
// const $roundP2 = document.getElementById('roundP2')

// const $dice = document.getElementById('dice')

// const $turnP1 = document.getElementById('turnP1')
// const $turnP2 = document.getElementById('turnP2')

// let TURN = 'P1'
// let TOTAL_P1 = 0
// let TOTAL_P2 = 0

// let RAUND_P1 = 0
// let RAUND_P2 = 0
// let TOTAL_RAUND = 0
// let DICE

// $rollBtn.addEventListener('click', startGame)
// $holdBtn.addEventListener('click', holdFn)
// $resetBtn.addEventListener('click', resetFn)

// function startGame() {
//   DICE = Math.floor(Math.random() * 6) + 1
//   $dice.textContent = DICE

//   console.log(TURN)
//   if (TURN === 'P1') {
//     if (DICE !== 1) {
//       TOTAL_RAUND = TOTAL_RAUND + DICE
//       $totalP1.textContent = `${TOTAL_P1} + ${TOTAL_RAUND}`
//     } else {
//       changePlayer()
//     }
//   } else {
//     if (DICE !== 1) {
//       TOTAL_RAUND = TOTAL_RAUND + DICE
//       $totalP2.textContent = `${TOTAL_P2} + ${TOTAL_RAUND}`
//     } else {
//       changePlayer()
//     }
//   }
// }

// function holdFn() {
//   changePlayer()
// }

// function resetFn() {
//   $dice.textContent = '—'
//   TURN = 'P1'
//   $turnP1.textContent = '●'
//   $turnP2.textContent = '○'
//   $message.textContent = 'Player 1’s turn.'
//   $totalP1.textContent = '0'
//   $totalP2.textContent = '0'
//   $roundP1.textContent = '0'
//   $roundP2.textContent = '0'

//   TOTAL_P1 = 0
//   TOTAL_P2 = 0

//   RAUND_P1 = 0
//   RAUND_P2 = 0
//   TOTAL_RAUND = 0
// }

// function changePlayer() {
//   if (TURN === 'P1') {
//     TOTAL_P1 = DICE === 1 ? TOTAL_P1 : TOTAL_P1 + TOTAL_RAUND
//     $totalP1.textContent = TOTAL_P1
//     TURN = 'P2'
//     $turnP1.textContent = '○'
//     $turnP2.textContent = '●'
//     $message.textContent = 'Player 2’s turn.'
//     TOTAL_RAUND = 0
//   } else {
//     TOTAL_P2 = DICE === 1 ? TOTAL_P2 : TOTAL_P2 + TOTAL_RAUND
//     $totalP2.textContent = TOTAL_P2
//     TURN = 'P1'
//     $turnP1.textContent = '●'
//     $turnP2.textContent = '○'
//     $message.textContent = 'Player 1’s turn.'
//     TOTAL_RAUND = 0
//   }

//   if (TURN === 'P1' && TOTAL_P1 >= 100) {
//     $message.textContent = 'Player 1 Win.'
//     RAUND_P1++
//     $roundP1.textContent = RAUND_P1

//     $totalP1.textContent = '0'
//     $totalP2.textContent = '0'
//     TOTAL_P1 = 0
//     TOTAL_P2 = 0
//   } else if (TURN === 'P2' && TOTAL_P2 >= 100) {
//     $message.textContent = 'Player 2 Win.'
//     RAUND_P2++
//     $roundP2.textContent = RAUND_P2

//     $totalP1.textContent = '0'
//     $totalP2.textContent = '0'

//     TOTAL_P1 = 0
//     TOTAL_P2 = 0
//   }
// }
