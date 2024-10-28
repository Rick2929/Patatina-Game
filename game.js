const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - 50; // Posizione verticale della patatina
let jumping = false;
let gameFinished = false;
let isSmashed = false; // Stato per indicare se la patatina è spiaccicata

const obstacles = []; // Array per memorizzare gli ostacoli
const obstacleWidth = 30; // Larghezza ridotta degli ostacoli per migliorare la hitbox
const obstacleHeight = 30; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.font = "40px Arial";
    ctx.fillText("🥔", patatinaX, patatinaY); // Disegna la patatina
    if (isSmashed) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Smash Potato!", patatinaX, patatinaY - 30); // Mostra "Smash Potato!" quando è abbassata
    }
}

// Funzione per gestire il salto
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

// Funzione per gestire la caduta
function falling() {
    const fallInterval = setInterval(() => {
        if (patatinaY >= canvas.height - 50) {
            clearInterval(fallInterval);
            jumping = false;
        } else {
            patatinaY += 5;
            draw();
        }
    }, 20);
}

// Funzione per generare ostacoli (coltelli) a terra e in aria
function generateObstacle() {
    const isAirObstacle = Math.random() < 0.5;
    const obstacleY = isAirObstacle ? canvas.height - obstacleHeight - 100 : canvas.height - obstacleHeight;
    obstacles.push({ x: canvas.width, y: obstacleY });
}

// Funzione per aggiornare la posizione degli ostacoli e controllare collisioni
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5; // Muovi l'ostacolo verso sinistra

        // Controlla collisioni solo se la patatina non è spiaccicata
        if (!isSmashed &&
            patatinaX + 30 > obstacles[i].x &&
            patatinaX < obstacles[i].x + obstacleWidth &&
            patatinaY + 20 > obstacles[i].y
        ) {
            endGame(); // Se c'è collisione, termina il gioco
        }

        // Rimuovi coltelli fuori dallo schermo
        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
        }
    }
}

// Funzione per disegnare tutto
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci l'intero canvas

    // Disegna gli ostacoli (coltelli)
    for (let obstacle of obstacles) {
        ctx.font = "30px Arial";
        ctx.fillText("🔪", obstacle.x, obstacle.y + obstacleHeight); // Disegna il coltello direttamente
    }

    drawPatatina(); // Disegna la patatina
}

// Funzione per terminare il gioco e avviare il quiz
function endGame() {
    gameFinished = true;
    clearInterval(obstacleInterval); // Ferma la generazione degli ostacoli
    document.getElementById("quizArea").style.display = "block";
    loadQuestion(); // Carica la prima domanda del quiz
}

// Funzione per far "spiaccicare" la patatina
function smash() {
    if (!isSmashed && !jumping) {
        isSmashed = true;
        patatinaY = canvas.height - 20;
        draw(); // Ridisegna immediatamente
        setTimeout(() => {
            isSmashed = false;
            patatinaY = canvas.height - 50;
            draw();
        }, 800);
    }
}

// Event listener per il salto e per il "spiaccicamento"
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
    if (event.code === "ArrowDown") {
        smash();
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
