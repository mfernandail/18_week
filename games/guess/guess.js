const $guessInput = document.getElementById('guessInput')
const $guessBtn = document.getElementById('guessBtn')
const $message = document.getElementById('message')
const $resetBtn = document.getElementById('resetBtn')
const $attempts = document.getElementById('attempts')
const $difficultySelect = document.getElementById('difficulty')
const $startNumber = document.getElementById('start_number')
const $endNumber = document.getElementById('end_number')

let MIN = 1
let MAX = 50

const DIFFICULTY_LEVELS = {
  easy: {
    min: 1,
    max: 50,
    label: 'Easy (1-50)',
  },
  medium: {
    min: 1,
    max: 100,
    label: 'Medium (1-100)',
  },
  hard: {
    min: 1,
    max: 500,
    label: 'Hard (1-500)',
  },
  expert: {
    min: 1,
    max: 1000,
    label: 'Expert (1-1000)',
  },
}

let RANDOM_NUMBER = getRandom(MIN, MAX)
let COUNTER = 0

let currentDifficulty = 'medium'

$guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startGame()
})

$guessBtn.addEventListener('click', startGame)
$resetBtn.addEventListener('click', resetGame)
$difficultySelect.addEventListener('change', changeDifficulty)

function startGame() {
  const raw = $guessInput.value.trim()
  const player_number = Number(raw)

  if (
    !raw ||
    Number.isNaN(player_number) ||
    player_number < MIN ||
    player_number > MAX
  ) {
    $message.textContent = `Please enter a valid number between ${MIN} and ${MAX}.`
    $guessInput.focus()
    return
  }

  COUNTER++
  $attempts.textContent = COUNTER

  if (player_number === RANDOM_NUMBER) {
    $message.textContent = `You win the number is ${player_number}`
    $guessInput.value = null
    RANDOM_NUMBER = Math.floor(Math.random() * MAX) + 1
    $guessInput.focus()
  } else if (player_number > RANDOM_NUMBER) {
    $message.textContent = 'Too high. Try a smaller number.'
    $guessInput.focus()
  } else {
    $message.textContent = 'Too low. Try a bigger number.'
    $guessInput.focus()
  }

  console.log(RANDOM_NUMBER)
}

function resetGame() {
  COUNTER = 0
  RANDOM_NUMBER = getRandom(MIN, MAX)
  $attempts.textContent = COUNTER
  $message.textContent = 'Make a guess!'
  $guessInput.value = ''
  $guessInput.focus()
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function changeDifficulty(e) {
  currentDifficulty = e.target.value
  const level = DIFFICULTY_LEVELS[currentDifficulty]

  MIN = level.min
  MAX = level.max

  $startNumber.textContent = MIN
  $endNumber.textContent = MAX
}
