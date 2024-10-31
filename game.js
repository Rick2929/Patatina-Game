const potato = document.getElementById('potato');
const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');

let isJumping = false;
let isGameOver = false;
let gravity = 0.9;
let score = 0;
let speed = 10;
let cactusInterval;

function startGame() {
  document.addEventListener('keydown', handleKeyDown);
  createCactus();
  gameLoop();
}

function handleKeyDown(event) {
  if (event.key === ' ' || event.key === 'ArrowUp') {
    if (!isJumping) jump();
  }
}

function jump() {
  let position = 0;
  isJumping = true;

  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        position *= gravity;
        potato.style.bottom = position + 'px';
      }, 20);
    } else {
      position += 20;
      potato.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  cactus.style.width = `${Math.random() * 10 + 20}px`;
  cactus.style.height = `${Math.random() * 40 + 50}px`;
  cactus.style.position = 'absolute';
  cactus.style.bottom = '0px';
  cactus.style.left = '800px';
  cactus.style.backgroundColor = '#008000';
  gameArea.appendChild(cactus);

  const cactusMoveInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(cactusMoveInterval);
      cactus.remove();
      return;
    }

    const cactusPosition = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
    const potatoPosition = parseInt(window.getComputedStyle(potato).getPropertyValue('bottom'));

    if (cactusPosition < 50 && cactusPosition > 0 && potatoPosition < parseInt(cactus.style.height)) {
      gameOver();
      clearInterval(cactusMoveInterval);
    }

    if (cactusPosition <= -20) {
      cactus.remove();
      score++;
      scoreElement.textContent = `Score: ${score}`;
      speed += 0.1;
    } else {
      cactus.style.left = `${cactusPosition - speed}px`;
    }
  }, 20);

  if (!isGameOver) setTimeout(createCactus, Math.random() * 3000 + 1000);
}

function gameOver() {
  isGameOver = true;
  document.removeEventListener('keydown', handleKeyDown);
  alert('Game Over! Your score: ' + score);
}

function gameLoop() {
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

startGame();
