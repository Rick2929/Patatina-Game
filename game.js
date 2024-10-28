const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaRadius = 25; // Raggio della patatina
let patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - patatinaRadius; // Posizione verticale della patatina
let jumping = false;
let crouching = false;
let gameFinished = false;
let obstacles = []; // Array per memorizzare gli ostacoli
let level = 1; // Livello corrente
const obstacleWidth = 50; // Larghezza degli ostacoli
const obstacleHeight = 50; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)
let score = 0; // Punteggio
let jumpCount = 0; // Conteggio dei salti per livello
let maxJumps; // Salti massimi per livello

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
    const obstacleY = Math.random() < 0.5 ? canvas.height - obstacleHeight : Math.random() * (canvas.height - obstacleHeight - 50); // 50% chance di essere sul pavimento o in aria
    obstacles.push({ x: canvas.width, y: obstacleY, isAirborne: obstacleY < canvas.height - obstacleHeight }); // Aggiungi un nuovo coltello
}

// Funzione per aggiornare la posizione degli ostacoli
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5; // Muovi l'ostacolo verso sinistra
        // Controlla collisioni
        if (
            patatinaX + patatinaRadius > obstacles[i].x &&
            patatinaX - patatinaRadius < obstacles[i].x + obstacleWidth &&
            patatinaY + (crouching ? 0 : patatinaRadius) > obstacles[i].y
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
    patatinaY = canvas.height - patatinaRadius; // Ripristina la posizione verticale della patatina
    jumping = false;
    crouching = false;
    gameFinished = false;
    obstacles = []; // Svuota gli ostacoli
    score = 0; // Ripristina il punteggio
    jumpCount = 0; // Ripristina il conteggio dei salti
    maxJumps = level === 1 ? 10 : level === 2 ? 15 : 20; // Imposta i salti massimi per livello
    document.getElementById("gameOver").style.display = "none"; // Nascondi il messaggio di game over
    document.getElementById("gameCanvas").style.display = "block"; // Mostra il canvas
}

// Funzione per gestire la crouch
function crouch() {
    if (jumping || gameFinished) return; // Non abbassarsi se già saltando o gioco finito
    crouching = true;
    document.getElementById("smashMessage").style.display = "block"; // Mostra il messaggio "SMASH POTATO!"
    setTimeout(() => {
        crouching = false;
        document.getElementById("smashMessage").style.display = "none"; // Nascondi il messaggio
    }, 1000); // Mostra per 1 secondo
}

// Event listener per i controlli
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
        jumpCount++;
        if (jumpCount >= maxJumps) {
            if (level < 3) {
                level++;
                alert("Livello " + level + " Inizio!");
                resetGame();
            } else {
                alert("Hai completato tutti i livelli!"); // Messaggio di fine gioco
            }
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
