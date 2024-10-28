const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let patatinaY = canvas.height - 50; // Posizione verticale della patatina
let patatinaX = 50; // Posizione orizzontale della patatina
let jumping = false;

// Funzione per disegnare la patatina
function drawPatatina() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas
    ctx.font = "40px Arial";
    ctx.fillText("🥔", patatinaX, patatinaY); // Disegna la patatina
}

// Funzione per gestire il salto
function jump() {
    if (jumping) return;
    jumping = true;
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            falling();
        } else {
            jumpHeight += 5;
            patatinaY -= 5; // Alza la patatina
            drawPatatina();
        }
    }, 20);
}

// Funzione per gestire la caduta
function falling() {
    const fallInterval = setInterval(() => {
        if (patatinaY >= canvas.height - 50) {
            clearInterval(fallInterval);
            jumping = false;
            endGame(); // Passa al quiz dopo la caduta
        } else {
            patatinaY += 5; // Abbassa la patatina
            drawPatatina();
        }
    }, 20);
}

// Funzione per terminare il gioco e avviare il quiz
function endGame() {
    document.getElementById("quizArea").style.display = "block"; // Mostra l'area del quiz
    loadQuestion(); // Carica la prima domanda del quiz
}

// Event listener per il salto
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

// Disegna inizialmente la patatina
drawPatatina();
