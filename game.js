const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - 50; // Posizione verticale della patatina
let jumping = false;
let gameFinished = false;
let isSmashed = false; // Stato per indicare se la patatina è spiaccicata

const obstacles = []; // Array per memorizzare gli ostacoli
const obstacleWidth = 50; // Larghezza degli ostacoli
const obstacleHeight = 50; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.font = "40px Arial";
    ctx.fillText("🥔", patatinaX, patatinaY); // Disegna la patatina
    if (isSmashed) {
        ctx.fillStyle = "white"; // Colore per il messaggio
        ctx.font = "30px Arial";
        ctx.fillText("Smash Potato!", patatinaX, patatinaY - 30); // Disegna il messaggio
    }
}

// Funzione per gestire il salto
function jump() {
    if (jumping || gameFinished || isSmashed) return; // Non saltare se già saltando, gioco finito o spiaccicata
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
        if (patatinaY >= canvas.height - 50) {
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
    const obstacleY = Math.random() < 0.5 ? canvas.height - obstacleHeight : canvas.height - obstacleHeight - 100; // Posizione Y dell'ostacolo (in aria o a terra)
    obstacles.push({ x: canvas.width, y: obstacleY }); // Aggiungi un nuovo coltello
}

// Funzione per aggiornare la posizione degli ostacoli
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5; // Muovi l'ostacolo verso sinistra

        // Controlla collisioni
        if (
            patatinaX + 40 > obstacles[i].x &&
            patatinaX < obstacles[i].x + obstacleWidth &&
            patatinaY + 40 > obstacles[i].y
        ) {
            if (!isSmashed) { // Solo se non è spiaccicata
                endGame(); // Se c'è collisione, termina il gioco
            }
        }

        // Rimuovi coltelli fuori dallo schermo
        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
        }
    }
}

// Funzione per disegnare tutto
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas

    // Disegna gli ostacoli (coltelli)
    for (let obstacle of obstacles) {
        ctx.font = "50px Arial"; // Dimensione del coltello
        ctx.save();
        ctx.translate(obstacle.x + obstacleWidth, obstacle.y + obstacleHeight / 2); // Posiziona il coltello
        ctx.rotate(Math.PI); // Ruota di 180 gradi per puntare a sinistra
        ctx.fillText("🔪", 0, 0); // Disegna l'emoji del coltello
        ctx.restore();
    }

    drawPatatina(); // Disegna la patatina
}

// Funzione per terminare il gioco e avviare il quiz
function endGame() {
    gameFinished = true; // Imposta il gioco come finito
    clearInterval(obstacleInterval); // Ferma la generazione degli ostacoli
    document.getElementById("quizArea").style.display = "block"; // Mostra l'area del quiz
    loadQuestion(); // Carica la prima domanda del quiz
}

// Funzione per far "spiaccicare" la patatina
function smash() {
    if (!isSmashed && !jumping) {
        isSmashed = true; // Imposta la patatina come spiaccicata
        patatinaY = canvas.height - 20; // Imposta la patatina vicino al suolo
        draw(); // Ridisegna immediatamente
        setTimeout(() => {
            isSmashed = false; // Rimuovi la modalità spiaccicata dopo un po'
        }, 1000);
    }
}

// Event listener per il salto e per il "spiaccicamento"
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
    if (event.code === "ArrowDown") {
        smash(); // Chiamata alla funzione di spiaccicamento
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