const $choices = document.querySelector('.choices')
const $youLabel = document.getElementById('you')
const $cpuLabel = document.getElementById('cpu')
const $resultLabel = document.getElementById('result')
const $scoreYouLabel = document.getElementById('score-you')
const $scoreCpuLabel = document.getElementById('score-cpu')
const $scoreDrawLabel = document.getElementById('score-draws')
const $reset = document.getElementById('reset')

let gameStats = {
  wins: 0,
  loses: 0,
  draws: 0,
  totalGames: 0,
}

const CHOICES = ['rock', 'paper', 'scissors']
const CHOICE_EMOJIS = { rock: '✊', paper: '✋', scissors: '✌' }

let WIN = 0
let LOSE = 0
let DRAW = 0

$choices.addEventListener('click', onChoiceClick)
$reset.addEventListener('click', reset)

loadGameData()

function onChoiceClick(e) {
  const btn = e.target.closest('button[data-choice]')
  if (!btn) return

  const result = startGame(btn.dataset.choice)

  $resultLabel.textContent = result

  if (result === 'Win') {
    WIN++
    gameStats.wins++
  } else if (result === 'Lose') {
    LOSE++
    gameStats.loses++
  } else {
    DRAW++
    gameStats.draws++
  }
  gameStats.totalGames++

  saveGameData()

  console.log(gameStats)
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

function reset() {
  WIN = 0
  LOSE = 0
  DRAW = 0
  updateDisplay()

  gameStats = {
    wins: 0,
    loses: 0,
    draws: 0,
    totalGames: 0,
  }
}

function updateDisplay() {
  $scoreYouLabel.textContent = WIN
  $scoreCpuLabel.textContent = LOSE
  $scoreDrawLabel.textContent = DRAW
  $resultLabel.textContent = 'Make your move!'
  $youLabel.textContent = '—'
  $cpuLabel.textContent = '—'
  localStorage.removeItem('rpsGameStats')
}

function saveGameData() {
  try {
    localStorage.setItem('rpsGameStats', JSON.stringify(gameStats))
  } catch (error) {
    console.error('Error saving game data:', error)
  }
}

function loadGameData() {
  try {
    const saveData = localStorage.getItem('rpsGameStats')
    if (saveData) {
      gameStats = { ...gameStats, ...JSON.parse(saveData) }
    }
  } catch (error) {
    console.error('Error loading game data:', error)
  }
}
