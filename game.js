const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaRadius = 25; // Raggio della patatina
let patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - patatinaRadius; // Posizione verticale della patatina
let jumping = false;
let gameFinished = false;
let obstacles = []; // Array per memorizzare gli ostacoli
let level = 1; // Livello corrente
const obstacleWidth = 50; // Larghezza degli ostacoli
const obstacleHeight = 50; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)
let score = 0; // Punteggio

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.beginPath();
    ctx.arc(patatinaX, patatinaY, patatinaRadius, 0, Math.PI * 2);
    ctx.fillStyle = "brown"; // Colore della patatina
    ctx.fill();
    ctx.closePath();
}

// Funzione per gestire il salto
function jump() {
    if (jumping || gameFinished) return; // Non saltare se già saltando o gioco finito
    jumping = true;
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            falling();
        } else {
            jumpHeight += 5;
            patatinaY -= 5; // Alza la patatina
            draw();
        }
    }, 20);
}

// Funzione per gestire la caduta
function falling() {
    const fallInterval = setInterval(() => {
        if (patatinaY >= canvas.height - patatinaRadius) {
            clearInterval(fallInterval);
            jumping = false;
        } else {
            patatinaY += 5; // Abbassa la patatina
            draw();
        }
    }, 20);
}

// Funzione per generare ostacoli (coltelli)
function generateObstacle() {
    const obstacleY = canvas.height - obstacleHeight; // Posizione Y dell'ostacolo
    obstacles.push({ x: canvas.width, y: obstacleY }); // Aggiungi un nuovo coltello
}

// Funzione per aggiornare la posizione degli ostacoli
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5; // Muovi l'ostacolo verso sinistra
        // Controlla collisioni
        if (
            patatinaX + patatinaRadius > obstacles[i].x &&
            patatinaX - patatinaRadius < obstacles[i].x + obstacleWidth &&
            patatinaY + patatinaRadius > obstacles[i].y
        ) {
            endGame(); // Se c'è collisione, termina il gioco
        }
        // Rimuovi coltelli fuori dallo schermo
        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
            score++; // Aumenta il punteggio se si supera un ostacolo
        }
    }
}

// Funzione per disegnare tutto
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas
    drawPatatina(); // Disegna la patatina

    // Disegna gli ostacoli (coltelli)
    for (let obstacle of obstacles) {
        ctx.fillStyle = "gray"; // Colore del coltello
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight); // Disegna il coltello
    }

    // Disegna il punteggio
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Punteggio: " + score, 10, 20);
}

// Funzione per terminare il gioco
function endGame() {
    gameFinished = true; // Imposta il gioco come finito
    document.getElementById("gameOver").style.display = "block"; // Mostra il messaggio di game over
}

// Event listener per il salto
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

// Disegna inizialmente la patatina e genera ostacoli
setInterval(() => {
    if (!gameFinished) {
        generateObstacle();
    }
}, obstacleFrequency);

// Aggiornamento delle posizioni degli ostacoli e disegno
const obstacleInterval = setInterval(() => {
    updateObstacles();
    draw();
}, 20);

// Disegna inizialmente la patatina
drawPatatina();
