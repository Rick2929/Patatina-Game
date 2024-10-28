const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - 50; // Posizione verticale della patatina
let jumping = false;
let gameFinished = false;
let crouching = false; // Variabile per gestire se la patatina è accovacciata

const obstacles = []; // Array per memorizzare gli ostacoli
const obstacleWidth = 50; // Larghezza degli ostacoli
const obstacleHeight = 50; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.font = "40px Arial";
    ctx.fillText("🥔", patatinaX, patatinaY); // Disegna la patatina
}

// Funzione per gestire il salto
function jump() {
    if (jumping || gameFinished || crouching) return; // Non saltare se già saltando, gioco finito, o se accovacciato
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

// Funzione per abbassare la patatina
function crouch() {
    if (jumping || gameFinished || crouching) return; // Non abbassare se già saltando, gioco finito, o già accovacciato
    crouching = true;
    patatinaY += 20; // Abbassa la patatina

    setTimeout(() => {
        // Ripristina la posizione dopo un certo tempo (per esempio, 1 secondo)
        patatinaY -= 20; 
        crouching = false; // Ripristina lo stato accovacciato
        draw();
    }, 1000);
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
            patatinaX + 40 > obstacles[i].x &&
            patatinaX < obstacles[i].x + obstacleWidth &&
            patatinaY + 40 > obstacles[i].y
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas

    // Disegna gli ostacoli (coltelli)
    for (let obstacle of obstacles) {
        ctx.font = "50px Arial"; // Dimensione del coltello
        ctx.fillText("🔪", obstacle.x, obstacle.y + obstacleHeight); // Disegna l'emoji del coltello
    }

    drawPatatina(); // Disegna la patatina

    // Se la patatina è accovacciata, disegna la scritta "SMASH POTATO"
    if (crouching) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white"; // Colore del testo
        ctx.fillText("SMASH POTATO!", patatinaX + 60, patatinaY - 30); // Posiziona la scritta
    }
}

// Funzione per terminare il gioco e avviare il quiz
function endGame() {
    gameFinished = true; // Imposta il gioco come finito
    clearInterval(obstacleInterval); // Ferma la generazione degli ostacoli
    document.getElementById("quizArea").style.display = "block"; // Mostra l'area del quiz
    loadQuestion(); // Carica la prima domanda del quiz
}

// Event listener per il salto e l'abbassamento
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
    if (event.code === "ArrowDown") {
        crouch();
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
