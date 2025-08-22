const $choices = document.querySelector('.choices')
const $youLabel = document.getElementById('you')
const $cpuLabel = document.getElementById('cpu')
const $resultLabel = document.getElementById('result')
const $scoreYouLabel = document.getElementById('score-you')
const $scoreCpuLabel = document.getElementById('score-cpu')
const $scoreDrawLabel = document.getElementById('score-draws')
const $reset = document.getElementById('reset')

const CHOICES = ['rock', 'paper', 'scissors']
const CHOICE_EMOJIS = { rock: '✊', paper: '✋', scissors: '✌' }

let WIN = 0
let LOSE = 0
let DRAW = 0

$choices.addEventListener('click', onChoiceClick)
$reset.addEventListener('click', reset)

function onChoiceClick(e) {
  const btn = e.target.closest('button[data-choice]')
  if (!btn) return

  const result = startGame(btn.dataset.choice)

  $resultLabel.textContent = result

  if (result === 'Win') {
    WIN++
  } else if (result === 'Lose') {
    LOSE++
  } else {
    DRAW++
  }

  $scoreYouLabel.textContent = WIN
  $scoreCpuLabel.textContent = LOSE
  $scoreDrawLabel.textContent = DRAW
}

function startGame(playerChoice) {
  $youLabel.textContent = CHOICE_EMOJIS[playerChoice] + ' ' + playerChoice

  const indexChoice = Math.floor(Math.random() * 3)

  const cpuChoice = CHOICES[indexChoice]

  $cpuLabel.textContent = CHOICE_EMOJIS[cpuChoice] + ' ' + cpuChoice

  if (playerChoice === cpuChoice) return 'Draw'

  const win =
    (playerChoice === 'rock' && cpuChoice === 'scissors') ||
    (playerChoice === 'paper' && cpuChoice === 'rock') ||
    (playerChoice === 'scissors' && cpuChoice === 'paper')
      ? 'Win'
      : 'Lose'

  return win
}

// function reset() {
//   WIN = 0
//   LOSE = 0

//   $scoreYouLabel.textContent = 0
//   $scoreCpuLabel.textContent = 0
//   $resultLabel.textContent = 'Make your move!'
//   $youLabel.textContent = '-'
//   $cpuLabel.textContent = '-'
// }

function reset() {
  WIN = 0
  LOSE = 0
  DRAW = 0
  updateDisplay()
}

function updateDisplay() {
  $scoreYouLabel.textContent = WIN
  $scoreCpuLabel.textContent = LOSE
  $scoreDrawLabel.textContent = DRAW
  $resultLabel.textContent = 'Make your move!'
  $youLabel.textContent = '—'
  $cpuLabel.textContent = '—'
}