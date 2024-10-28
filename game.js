const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const groundLevel = canvas.height - 40; // Posizione del suolo
let patatinaX = 100; // Posizione iniziale orizzontale
let patatinaY = groundLevel; // Posizione iniziale verticale
let jumping = false;
let isSmashed = false;
let level = 1;
let obstacles = [];
let gameOver = false;
let dialogVisible = false;

// Configurazioni per i livelli
const levels = [
    { obstacles: 15, message: "Eh?", endingMessage: "Patatina aiuto!!" },
    { obstacles: 25, message: "ovetto, e e e come hai fatto a fa addawe via i ladwo", endingMessage: "PatatinaPool savvamiiiii" },
    { obstacles: 50, message: "C'è tolo u modo pe copillo.......ITTEWOGATOWIO", endingMessage: "Inizio Quiz!" },
];

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillText(isSmashed ? "🥔 Smash Potato!" : "🥔", patatinaX, patatinaY);
}

// Funzione per far saltare la patatina
function jump() {
    if (jumping || gameOver || isSmashed) return;
    jumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            falling();
        } else {
            jumpHeight += 5;
            patatinaY -= 5;
            drawPatatina();
        }
    }, 20);
}

// Funzione per far abbassare la patatina
function smash() {
    if (isSmashed || jumping) return;
    isSmashed = true;
    patatinaY = groundLevel + 20;
    drawPatatina();
    setTimeout(() => {
        isSmashed = false;
        patatinaY = groundLevel;
        drawPatatina();
    }, 800);
}

// Funzione per gestire la caduta dopo il salto
function falling() {
    const fallInterval = setInterval(() => {
        if (patatinaY >= groundLevel) {
            clearInterval(fallInterval);
            patatinaY = groundLevel;
            jumping = false;
            drawPatatina();
        } else {
            patatinaY += 5;
            drawPatatina();
        }
    }, 20);
}

// Funzione per generare ostacoli
function generateObstacle() {
    const isAirObstacle = Math.random() < 0.5;
    const obstacleY = isAirObstacle ? groundLevel - 100 : groundLevel;
    obstacles.push({ x: canvas.width, y: obstacleY });
}

// Funzione per disegnare e aggiornare gli ostacoli
function updateObstacles() {
    if (obstacles.length < levels[level - 1].obstacles) generateObstacle();
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5;
        ctx.font = "30px Arial";
        ctx.fillText("🔪", obstacles[i].x, obstacles[i].y);
        if (obstacles[i].x + 30 < 0) obstacles.splice(i, 1); // Rimuove i coltelli fuori schermo
        if (collisionCheck(obstacles[i])) return endGame();
    }
}

// Funzione per controllare le collisioni
function collisionCheck(obstacle) {
    return !isSmashed &&
           patatinaX + 30 > obstacle.x &&
           patatinaX < obstacle.x + 30 &&
           patatinaY + 20 > obstacle.y;
}

// Funzione per mostrare il dialogo e gestire le transizioni tra i livelli
function endLevel() {
    dialogVisible = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillText(levels[level - 1].message, patatinaX + 40, groundLevel - 20);
    setTimeout(() => {
        ctx.fillText(levels[level - 1].endingMessage, patatinaX + 60, groundLevel);
        level++;
        dialogVisible = false;
    }, 2000);
}

// Funzione di fine gioco in caso di collisione
function endGame() {
    gameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillText("La Patata E' Stata Sbucciata", canvas.width / 2 - 100, canvas.height / 2);
}

// Funzione per avviare il quiz
function startQuiz() {
    // Quiz logic goes here
}

// Ciclo di aggiornamento
function gameLoop() {
    if (!gameOver && !dialogVisible) {
        drawPatatina();
        updateObstacles();
        if (obstacles.length >= levels[level - 1].obstacles) endLevel();
    }
    requestAnimationFrame(gameLoop);
}

// Gestione dei controlli di salto e abbassamento
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
    if (e.code === "ArrowDown") smash();
});

// Inizia il ciclo del gioco
gameLoop();
