const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - 50; // Posizione verticale della patatina
let jumping = false;
let crouching = false;
let gameFinished = false;
let obstacles = []; // Array per memorizzare gli ostacoli
let level = 1; // Livello corrente
let score = 0; // Punteggio
let jumpCount = 0; // Conteggio dei salti per livello
const maxJumps = 10; // Salti massimi per livello
const obstacleWidth = 50; // Larghezza degli ostacoli
const obstacleHeight = 50; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.font = "50px Arial";
    ctx.fillText("🥔", patatinaX, patatinaY); // Disegna la patatina
}

// Funzione per gestire il salto
function jump() {
    if (jumping || crouching || gameFinished) return; // Non saltare se già saltando, abbassandosi o gioco finito
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
    const isAirborne = Math.random() < 0.5; // 50% chance di essere in aria
    const obstacleY = isAirborne ? Math.random() * (canvas.height - 200) : canvas.height - obstacleHeight; // Posizione Y dell'ostacolo

    obstacles.push({ x: canvas.width, y: obstacleY, isAirborne }); // Aggiungi un nuovo coltello
}

// Funzione per aggiornare la posizione degli ostacoli
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5; // Muovi l'ostacolo verso sinistra
        // Controlla collisioni
        if (
            patatinaX + 40 > obstacles[i].x &&
            patatinaX < obstacles[i].x + obstacleWidth &&
            patatinaY + (crouching ? 0 : 50) > obstacles[i].y
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
        ctx.font = "50px Arial"; // Dimensione del coltello
        ctx.fillText("🔪", obstacle.x, obstacle.y + obstacleHeight); // Disegna l'emoji del coltello
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
    document.getElementById("gameCanvas").style.display = "none"; // Nascondi il canvas
}

// Funzione per reset del gioco
function resetGame() {
    patatinaY = canvas.height - 50; // Ripristina la posizione verticale della patatina
    jumping = false;
    crouching = false;
    gameFinished = false;
    obstacles = []; // Svuota gli ostacoli
    score = 0; // Ripristina il punteggio
    jumpCount = 0; // Ripristina il conteggio dei salti
    document.getElementById("gameOver").style.display = "none"; // Nascondi il messaggio di game over
    document.getElementById("gameCanvas").style.display = "block"; // Mostra il canvas
}

// Funzione per gestire la crouch
function crouch() {
    if (jumping || gameFinished) return; // Non abbassarsi se già saltando o gioco finito
    crouching = true;
    const crouchMessage = document.getElementById("smashMessage");
    crouchMessage.style.display = "block"; // Mostra il messaggio "SMASH POTATO!"
    setTimeout(() => {
        crouching = false;
        crouchMessage.style.display = "none"; // Nascondi il messaggio
    }, 1000); // Mostra per 1 secondo
}

// Event listener per i controlli
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
        jumpCount++;
        if (jumpCount >= maxJumps) {
            alert("Hai completato il livello " + level + "!");
            resetGame();
            level++; // Incrementa il livello
            jumpCount = 0; // Reset dei salti per il nuovo livello
        }
    } else if (event.code === "ArrowDown") {
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
