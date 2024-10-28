const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100;
const groundLevel = canvas.height - 40; // Linea del suolo per la patatina
let patatinaY = groundLevel;
let jumping = false;
let gameFinished = false;
let isSmashed = false;

const obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 30;
const obstacleFrequency = 1500;

function drawPatatina() {
    ctx.font = "40px Arial";
    ctx.clearRect(patatinaX - 10, 0, canvas.width, canvas.height); // Pulisce solo vicino alla patatina
    if (isSmashed) {
        ctx.fillText("🥔", patatinaX, groundLevel + 20); // Patatina abbassata fino al terreno
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Smash Potato!", patatinaX, patatinaY - 30);
    } else {
        ctx.fillText("🥔", patatinaX, patatinaY); // Patatina normale allineata al suolo
    }
}

function jump() {
    if (jumping || gameFinished || isSmashed) return;
    jumping = true;
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            falling();
        } else {
            jumpHeight += 5;
            patatinaY -= 5;
            draw();
        }
    }, 20);
}

function falling() {
    const fallInterval = setInterval(() => {
        if (patatinaY >= groundLevel) {
            clearInterval(fallInterval);
            jumping = false;
            patatinaY = groundLevel; // Assicura che si fermi al livello del suolo
        } else {
            patatinaY += 5;
            draw();
        }
    }, 20);
}

function generateObstacle() {
    const isAirObstacle = Math.random() < 0.5;
    const obstacleY = isAirObstacle ? groundLevel - 100 : groundLevel; // Altezza casuale per ostacoli
    obstacles.push({ x: canvas.width, y: obstacleY });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5;

        if (!isSmashed &&
            patatinaX + 30 > obstacles[i].x &&
            patatinaX < obstacles[i].x + obstacleWidth &&
            patatinaY + 20 > obstacles[i].y
        ) {
            endGame();
        }

        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let obstacle of obstacles) {
        ctx.font = "30px Arial";
        ctx.fillText("🔪", obstacle.x, obstacle.y + obstacleHeight);
    }

    drawPatatina();
}

function endGame() {
    gameFinished = true;
    clearInterval(obstacleInterval);
    document.getElementById("quizArea").style.display = "block";
    loadQuestion();
}

function smash() {
    if (!isSmashed && !jumping) {
        isSmashed = true;
        patatinaY = groundLevel + 20; // Abbassamento al livello del suolo
        draw();
        setTimeout(() => {
            isSmashed = false;
            patatinaY = groundLevel; // Ritorno alla posizione normale
            draw();
        }, 800);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
    if (event.code === "ArrowDown") {
        smash();
    }
});

setInterval(() => {
    if (!gameFinished) {
        generateObstacle();
    }
}, obstacleFrequency);

const obstacleInterval = setInterval(() => {
    updateObstacles();
    draw();
}, 20);

drawPatatina();