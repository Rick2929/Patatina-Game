const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
let isJumping = false;
let gravity = 0.9;
let isGameOver = false;
let score = 0;

// Funzione per far saltare il dinosauro
function jump() {
  let position = 0;
  if (isJumping) return;
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
        dino.style.bottom = position + 'px';
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

// Funzione per creare i cactus
function createCactus() {
  let cactusPosition = 800;
  let randomTime = Math.random() * 4000;

  cactus.style.left = cactusPosition + 'px';
  const cactusInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(cactusInterval);
      score++;
      scoreElement.innerText = score;
      cactusPosition = 800;
    } else if (cactusPosition > 0 && cactusPosition < 60 && !isJumping) {
      clearInterval(cactusInterval);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  if (!isGameOver) setTimeout(createCactus, randomTime);
}

function startGame() {
  document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      jump();
    }
  });
  createCactus();
}

startGame();
