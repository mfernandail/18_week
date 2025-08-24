const $choices = document.querySelector('.choices')
const $youLabel = document.getElementById('you')
const $cpuLabel = document.getElementById('cpu')
const $resultLabel = document.getElementById('result')
const $scoreYouLabel = document.getElementById('score-you')
const $scoreCpuLabel = document.getElementById('score-cpu')
const $scoreDrawLabel = document.getElementById('score-draws')
const $reset = document.getElementById('reset')

const $drawsLabel = document.getElementById('draws')
const $totalGamesLabel = document.getElementById('total-games')
const $winPercentageLabel = document.getElementById('win-percentage')
const $winsLabel = document.getElementById('wins')
const $losesLabel = document.getElementById('loses')

const $currentStreakLabel = document.getElementById('current-streak')
const $maxStreakLabel = document.getElementById('max-streak')

let gameStats = {
  wins: 0,
  loses: 0,
  draws: 0,
  totalGames: 0,
  currentStreak: 0,
  maxWinStreak: 0,
  maxLoseStreak: 0,
  streakType: null,
  gameHistory: [],
}

// Constantes
const CHOICES = ['rock', 'paper', 'scissors']
const CHOICE_EMOJIS = { rock: '✊', paper: '✋', scissors: '✌' }

const STREAK_MESSAGES = {
  win: {
    3: '🔥 On fire!',
    5: '🚀 Unstoppable!',
    10: '👑 LEGEND!',
    default: '✨ You win!',
  },
  lose: {
    3: '😅 Rough patch...',
    5: '😰 Take a breath!',
    default: '😔 You lose',
  },
  draw: "🤝 It's a tie!",
}

let WIN = 0
let LOSE = 0
let DRAW = 0

$choices.addEventListener('click', onChoiceClick)
$reset.addEventListener('click', reset)

loadGameData()

function onChoiceClick(e) {
  const btn = e.target.closest('button[data-choice]')
  if (!btn) return

  const playerChoice = btn.dataset.choice
  const result = startGame(playerChoice)

  if (result.outcome === 'Win') {
    WIN++
    gameStats.wins++
  } else if (result.outcome === 'Lose') {
    LOSE++
    gameStats.loses++
  } else {
    DRAW++
    gameStats.draws++
  }
  gameStats.totalGames++

  updateStreak(result.outcome)
  addToHistory(result.outcome, playerChoice, result.cpuChoice)

  const streakMessage = getStreakMessage(result.outcome)
  $resultLabel.textContent = streakMessage

  saveGameData()
  updateAllDisplays()
}

function startGame(playerChoice) {
  $youLabel.textContent = CHOICE_EMOJIS[playerChoice] + ' ' + playerChoice

  const indexChoice = Math.floor(Math.random() * 3)
  const cpuChoice = CHOICES[indexChoice]

  $cpuLabel.textContent = CHOICE_EMOJIS[cpuChoice] + ' ' + cpuChoice

  let outcome
  if (playerChoice === cpuChoice) {
    outcome = 'Draw'
  } else {
    const playerWins =
      (playerChoice === 'rock' && cpuChoice === 'scissors') ||
      (playerChoice === 'paper' && cpuChoice === 'rock') ||
      (playerChoice === 'scissors' && cpuChoice === 'paper')

    outcome = playerWins ? 'Win' : 'Lose'
  }

  return { outcome, cpuChoice }
}

function updateStreak(result) {
  if (result === 'Win') {
    if (gameStats.streakType === 'win') {
      gameStats.currentStreak++
    } else {
      gameStats.currentStreak = 1
      gameStats.streakType = 'win'
    }
    gameStats.maxWinStreak = Math.max(
      gameStats.maxWinStreak,
      gameStats.currentStreak
    )
  } else if (result === 'Lose') {
    if (gameStats.streakType === 'lose') {
      gameStats.currentStreak++
    } else {
      gameStats.currentStreak = 1
      gameStats.streakType = 'lose'
    }
    gameStats.maxLoseStreak = Math.max(
      gameStats.maxLoseStreak,
      gameStats.currentStreak
    )
  } else {
    gameStats.currentStreak = 0
    gameStats.streakType = null
  }
}

function addToHistory(result, playerChoice, cpuChoice) {
  gameStats.gameHistory.unshift({
    result: result,
    playerChoice: playerChoice,
    cpuChoice: cpuChoice,
    timestamp: new Date().toLocaleTimeString(),
    gameNumber: gameStats.totalGames,
  })

  if (gameStats.gameHistory.length > 10) {
    gameStats.gameHistory.pop()
  }
}

function getStreakMessage(result) {
  if (result === 'Draw') return STREAK_MESSAGES.draw

  const messages = STREAK_MESSAGES[result.toLowerCase()]
  const streak = gameStats.currentStreak

  for (const [threshold, message] of Object.entries(messages)) {
    if (threshold !== 'default' && streak >= parseInt(threshold)) {
      return message
    }
  }

  return messages.default
}

function updateAllDisplays() {
  $scoreYouLabel.textContent = WIN
  $scoreCpuLabel.textContent = LOSE
  $scoreDrawLabel.textContent = DRAW

  $drawsLabel.textContent = gameStats.draws
  $winsLabel.textContent = gameStats.wins
  $losesLabel.textContent = gameStats.loses
  $totalGamesLabel.textContent = gameStats.totalGames

  const gamesWithoutDraws = gameStats.totalGames - gameStats.draws
  const winPercentage =
    gamesWithoutDraws > 0
      ? ((gameStats.wins / gamesWithoutDraws) * 100).toFixed(2)
      : 0
  $winPercentageLabel.textContent = winPercentage + '%'

  updateStreakDisplay()
}

function updateStreakDisplay() {
  if ($currentStreakLabel) {
    if (gameStats.currentStreak > 0) {
      const streakText = gameStats.streakType === 'win' ? 'wins' : 'loses'
      $currentStreakLabel.textContent = `${gameStats.currentStreak} ${streakText}`
      $currentStreakLabel.className = `streak ${gameStats.streakType}`
    } else {
      $currentStreakLabel.textContent = 'Sin racha'
      $currentStreakLabel.className = 'streak'
    }
  }

  if ($maxStreakLabel) {
    $maxStreakLabel.textContent = `${gameStats.maxWinStreak} wins`
  }
}

function reset() {
  WIN = 0
  LOSE = 0
  DRAW = 0

  gameStats = {
    wins: 0,
    loses: 0,
    draws: 0,
    totalGames: 0,
    currentStreak: 0,
    maxWinStreak: 0,
    maxLoseStreak: 0,
    streakType: null,
    gameHistory: [],
  }

  updateDisplay()
  updateStreakDisplay()

  localStorage.removeItem('rpsGameStats')
}

function updateDisplay() {
  $scoreYouLabel.textContent = WIN
  $scoreCpuLabel.textContent = LOSE
  $scoreDrawLabel.textContent = DRAW
  $resultLabel.textContent = 'Make your move!'
  $youLabel.textContent = '—'
  $cpuLabel.textContent = '—'

  $drawsLabel.textContent = '0'
  $winsLabel.textContent = '0'
  $losesLabel.textContent = '0'
  $totalGamesLabel.textContent = '0'
  $winPercentageLabel.textContent = '0%'
}

function saveGameData() {
  try {
    gameStats.wins = WIN
    gameStats.loses = LOSE
    gameStats.draws = DRAW

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

      WIN = gameStats.wins
      LOSE = gameStats.loses
      DRAW = gameStats.draws

      updateAllDisplays()
    }
  } catch (error) {
    console.error('Error loading game data:', error)
  }
}
