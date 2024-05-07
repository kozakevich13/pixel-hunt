const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
let score = 0;
let currentTimer = null;
let countdown = null;

function startGame() {
  const difficulty = document.getElementById("difficulty").value;
  if (!difficulty) {
    alert("Please choose a difficulty!");
    return;
  }
  const color = document.getElementById("colorPicker").value;
  toggleGameControls();
  clearInterval(currentTimer);
  clearInterval(countdown);
  adjustGameArea(difficulty);
  addSquare(difficulty, color);
  startCountdown(difficulty);
}

function toggleGameControls() {
  document.getElementById("difficulty").classList.toggle("hidden");
  document.getElementById("colorPicker").classList.toggle("hidden");
  document.getElementById("startButton").classList.toggle("hidden");
  document.getElementById("choose-difficulty").classList.toggle("hidden");
}

function adjustGameArea(difficulty) {
  switch (difficulty) {
    case "easy":
      gameContainer.style.width = "50%";
      gameContainer.style.height = "50vh";
      break;
    case "medium":
      gameContainer.style.width = "70%";
      gameContainer.style.height = "70vh";
      break;
    case "hard":
      gameContainer.style.width = "90%";
      gameContainer.style.height = "80vh";
      break;
  }
}

function startCountdown(difficulty) {
  let timeLimit;
  switch (difficulty) {
    case "easy":
      timeLimit = 4;
      break;
    case "medium":
      timeLimit = 2;
      break;
    case "hard":
      timeLimit = 1;
      break;
  }
  timerDisplay.textContent = `${timeLimit} sec`;
  countdown = setInterval(() => {
    timeLimit--;
    timerDisplay.textContent = `${timeLimit} sec`;
    if (timeLimit <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

function addSquare(difficulty, color) {
  const squareSize =
    difficulty === "hard" ? 20 : difficulty === "medium" ? 35 : 50;
  const square = document.createElement("div");
  square.style.backgroundColor = color;
  square.classList.add("square");
  square.style.width = square.style.height = `${squareSize}px`;
  square.style.top = `${
    Math.random() * (gameContainer.offsetHeight - squareSize)
  }px`;
  square.style.left = `${
    Math.random() * (gameContainer.offsetWidth - squareSize)
  }px`;
  square.onclick = function () {
    score++;
    scoreDisplay.textContent = score;
    gameContainer.removeChild(square);
    addSquare(difficulty, color);
    clearInterval(countdown);
    startCountdown(difficulty);
  };
  gameContainer.appendChild(square);

  let timeLimit;
  switch (difficulty) {
    case "easy":
      timeLimit = 4000;
      break;
    case "medium":
      timeLimit = 2000;
      break;
    case "hard":
      timeLimit = 1000;
      break;
  }

  currentTimer = setTimeout(() => {
    if (gameContainer.contains(square)) {
      gameContainer.removeChild(square);
      clearInterval(countdown);
      gameEnd();
    }
  }, timeLimit);
}

function gameEnd() {
  toggleGameControls();
  alert(`Game ower! Your score: ${score}. Congratulation!`);
  score = 0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = "0 sec";
}

document.getElementById("difficulty").addEventListener("change", function () {
  const startButton = document.getElementById("startButton");
  if (this.value) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
});

document.getElementById("start").addEventListener("click", startGame);
