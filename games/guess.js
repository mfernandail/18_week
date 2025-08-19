const $guessInput = document.getElementById('$guessInput')
const $guessBtn = document.getElementById('$guessBtn')
const $message = document.getElementById('$message')
const $resetBtn = document.getElementById('$resetBtn')
const $attempts = document.getElementById('$attempts')

const MIN = 1
const MAX = 100

let RANDOM_NUMBER = getRandom(MIN, MAX)
let COUNTER = 0

//RANDOM_NUMBER = Math.floor(Math.random() * 100) + 1

$guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startGame()
})

$guessBtn.addEventListener('click', startGame)
$resetBtn.addEventListener('click', resetGame)

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

  if (player_number === RANDOM_NUMBER) {
    COUNTER++
    $attempts.textContent = COUNTER
    $message.textContent = `You win the number is ${player_number}`
    $guessInput.value = null
    RANDOM_NUMBER = Math.floor(Math.random() * 100) + 1
    $guessInput.focus()
  } else if (player_number > RANDOM_NUMBER) {
    $message.textContent = 'Too high. Try a smaller number.'
  } else {
    $message.textContent = 'Too low. Try a bigger number.'
  }
}

function resetGame() {
  $message.textContent = 'Make a guess!'
  $attempts.textContent = 0
  $guessInput.value = null
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
