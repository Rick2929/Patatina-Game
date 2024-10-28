const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let patatina;
let knives = [];
let level = 1;
let gameOver = false;
let obstaclesCleared = 0;
const totalLevels = 3;
const totalObstaclesPerLevel = [15, 25, 50]; // Numero di ostacoli per livello
const gameOverMessage = document.getElementById('gameOverMessage');

// Classe per la Patatina
class Patatina {
    constructor() {
        this.x = 50;
        this.y = canvas.height / 2;
        this.radius = 20; // Raggio della patatina
    }

    draw() {
        ctx.fillStyle = 'saddlebrown'; // Colore della patatina
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    resetPosition() {
        this.x = 50;
        this.y = canvas.height / 2;
    }
}

// Classe per i Coltelli
class Knife {
    constructor(x) {
        this.x = x;
        this.y = Math.random() * (canvas.height - 20);
        this.width = 20;
        this.height = 60;
    }

    draw() {
        ctx.fillStyle = 'silver'; // Colore del coltello
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Inizializza il gioco
function init() {
    patatina = new Patatina();
    knives = [];
    obstaclesCleared = 0;
    gameOver = false;
    spawnKnives();
    requestAnimationFrame(gameLoop);
}

// Crea i coltelli
function spawnKnives() {
    for (let i = 0; i < totalObstaclesPerLevel[level - 1]; i++) {
        const knife = new Knife(400 + i * 100); // Posizione iniziale dei coltelli
        knives.push(knife);
    }
}

// Gestisci la logica del gioco
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas
    patatina.draw();
    knives.forEach((knife) => {
        knife.draw();
    });

    if (!gameOver) {
        checkCollision();
        update();
        requestAnimationFrame(gameLoop);
    }
}

// Controlla le collisioni
function checkCollision() {
    knives.forEach((knife, index) => {
        if (
            patatina.x + patatina.radius > knife.x &&
            patatina.x - patatina.radius < knife.x + knife.width &&
            patatina.y + patatina.radius > knife.y &&
            patatina.y - patatina.radius < knife.y + knife.height
        ) {
            gameOver = true;
            gameOverMessage.style.display = 'block';
            gameOverMessage.innerText = "La Patatina E' Stata Sbucciata";
        }
    });
}

// Aggiorna la posizione della Patatina
function update() {
    // Esempio di movimento della Patatina (puoi sostituire con controlli reali)
    if (keys['ArrowUp'] && patatina.y > 0) {
        patatina.y -= 2;
    }
    if (keys['ArrowDown'] && patatina.y < canvas.height) {
        patatina.y += 2;
    }

    // Controlla se il livello è completato
    if (obstaclesCleared >= totalObstaclesPerLevel[level - 1]) {
        level++;
        if (level > totalLevels) {
            // Gioco completato, puoi visualizzare un messaggio finale o resettare il gioco
            alert('Hai completato tutti i livelli!');
            resetGame();
        } else {
            // Resettare la Patatina e generare nuovi ostacoli
            patatina.resetPosition();
            obstaclesCleared = 0;
            spawnKnives();
        }
    }
}

// Resetta il gioco
function resetGame() {
    level = 1;
    init();
}

// Gestione dei tasti
const keys = {};
window.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
window.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Avvia il gioco
init();
