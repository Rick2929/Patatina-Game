const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100; // Posizione orizzontale fissa della patatina
let patatinaY = canvas.height - 50; // Posizione verticale della patatina
let jumping = false;
let crouching = false;
let gameFinished = false;
let jumpCount = 0;

const obstacles = []; // Array per memorizzare gli ostacoli
const obstacleWidth = 50; // Larghezza degli ostacoli
const obstacleHeight = 50; // Altezza degli ostacoli
const obstacleFrequency = 1500; // Tempo tra la generazione degli ostacoli (in millisecondi)

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.font = "40px Arial"; // Dimensione del carattere per la patatina
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
            jumpCount++;
            if (jumpCount >= 10) {
                endLevel(); // Controlla se il primo livello è finito
            }
        } else {
            patatinaY += 5; // Abbassa la patatina
            draw();
        }
    }, 20);
}

// Funzione per abbassarsi
function crouch() {
    if (crouching || jumping || gameFinished) return; // Non abbassarsi se già abbassati o saltando
    crouching = true;
    draw(); // Disegna immediatamente per mostrare l'abbassamento
    setTimeout(() => {
        crouching = false; // Torna alla posizione normale dopo un breve intervallo
        draw();
    }, 500); // Tempo di abbassamento
}

// Funzione per generare ostacoli (coltelli)
function generateObstacle() {
    const randomHeight = Math.random() < 0.5 ? canvas.height - obstacleHeight : canvas.height - obstacleHeight - 100; // Genera ostacoli a diverse altezze
    obstacles.push({ x: canvas.width, y: randomHeight }); // Aggiungi un nuovo coltello
}

// Funzione per aggiornare la posizione degli ostacoli
function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5; // Muovi l'ostacolo verso sinistra
        // Controlla collisioni
        if (
            patatinaX + 40 > obstacles[i].x &&
            patatinaX < obstacles[i].x + obstacleWidth &&
            ((crouching && patatinaY + 30 > obstacles[i].y) || (patatinaY + 40 > obstacles[i].y && !crouching))
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

    if (crouching) {
        ctx.font = "20px Arial";
        ctx.fillText("SMASH POTATO!", canvas.width / 2 - 50, canvas.height / 2); // Mostra il messaggio "SMASH POTATO!"
    }
}

// Funzione per terminare il livello
function endLevel() {
    // Logica per terminare il primo livello e passare al secondo
    // Mostrare un messaggio e resettare il gioco o fare altre azioni
    alert("Hai completato il primo livello!");
    // Aggiungi logica per passare al secondo livello se necessario
    jumpCount = 0; // Reset dei salti
}

// Funzione per terminare il gioco e mostrare il messaggio di Game Over
function endGame() {
    gameFinished = true; // Imposta il gioco come finito
    clearInterval(obstacleInterval); // Ferma la generazione degli ostacoli
    document.getElementById("gameOver").style.display = "block"; // Mostra il messaggio di Game Over
}

// Event listener per il salto e l'abbassamento
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump(); // Salta quando si preme la barra spaziatrice
    }
    if (event.code === "ArrowDown") {
        crouch(); // Abbassati quando si preme la freccia giù
    }
});

// Disegna inizialmente la patatina e genera ostacoli
setInterval(() => {
    if (!gameFinished) {
        generateObstacle();
    }
}, 1500); // Genera un ostacolo ogni 1.5 secondi

// Aggiornamento delle posizioni degli ostacoli e disegno
const obstacleInterval = setInterval(() => {
    updateObstacles();
    draw();
}, 20); // Aggiorna la posizione degli ostacoli ogni 20ms

// Disegna inizialmente la patatina
drawPatatina();
