const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const patatinaX = 100;
const groundLevel = canvas.height - 40; 
let patatinaY = groundLevel;
let jumping = false;
let gameFinished = false;
let isSmashed = false;

// Posizione fissa di prova per i coltelli
const fixedObstacleX = 300; // Posizione orizzontale fissa per test
const fixedObstacleY = groundLevel; // Altezza del coltello

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.font = "40px Arial";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("🥔", patatinaX, patatinaY); 
}

// Funzione per disegnare il coltello di test
function drawFixedObstacle() {
    ctx.font = "30px Arial";
    ctx.fillText("🔪", fixedObstacleX, fixedObstacleY); // Coltello in posizione fissa
}

// Funzione di disegno che disegna patatina e coltello fisso
function draw() {
    drawPatatina();
    drawFixedObstacle();
}

// Disegna inizialmente la patatina e il coltello
draw();
