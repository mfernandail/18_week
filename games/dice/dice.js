const $rollBtn = document.getElementById('rollBtn')
const $holdBtn = document.getElementById('holdBtn')
const $resetBtn = document.getElementById('resetBtn')
const $message = document.getElementById('message')

const $totalP1 = document.getElementById('totalP1')
const $roundP1 = document.getElementById('roundP1')

const $totalP2 = document.getElementById('totalP2')
const $roundP2 = document.getElementById('roundP2')

const $dice = document.getElementById('dice')
const $diceNumber = document.getElementById('dice-number')

const $turnP1 = document.getElementById('turnP1')
const $turnP2 = document.getElementById('turnP2')

const TARGET = 100

const DICE_EMOJIS = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
const DICE_FACES = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
}
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

reset()

function onRoll() {
  DICE = Math.floor(Math.random() * 6) + 1
  $dice.textContent = DICE_EMOJIS[DICE - 1]
  $diceNumber.textContent = DICE

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

  reset()
  setControlsEnabled(true)
  $message.textContent = 'Player 1’s turn.'
}

function reset() {
  $dice.textContent = '—'
  $diceNumber.textContent = ''
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