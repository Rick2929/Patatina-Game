// Seleziona il canvas e il contesto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Impostazioni del gioco
const potatoEmoji = "🥔"; // Emoji della patata
const knifeEmoji = "🔪"; // Emoji del coltello
const screenWidth = canvas.width;
const screenHeight = canvas.height;

let potato = {
    x: 50, // Posizione iniziale della patatina
    y: screenHeight - 60, // Posizione verticale
    width: 50, // Larghezza della patatina
    height: 50, // Altezza della patatina
    isDucking: false, // Stato di abbassamento
};

let knives = []; // Array di coltelli
let gameOver = false;
let score = 0;

// Genera coltelli a intervalli regolari
function createKnife() {
    const knifeHeight = Math.random() < 0.5 ? 50 : 100; // Altezza del coltello (basso o alto)
    knives.push({
        x: screenWidth,
        y: Math.random() < 0.5 ? screenHeight - knifeHeight : Math.random() * (screenHeight - knifeHeight - 50),
        width: 50,
        height: knifeHeight,
    });
}

// Aggiorna il gioco
function update() {
    if (gameOver) return;

    // Muovi i coltelli verso sinistra
    for (let i = 0; i < knives.length; i++) {
        knives[i].x -= 5; // Velocità di movimento dei coltelli

        // Controlla se la patatina colpisce un coltello
        if (
            potato.x < knives[i].x + knives[i].width &&
            potato.x + potato.width > knives[i].x &&
            potato.y < knives[i].y + knives[i].height &&
            potato.y + potato.height > knives[i].y
        ) {
            gameOver = true;
            alert("Patatina si è sbucciata! Riprova."); // Messaggio di game over
            document.location.reload(); // Ricarica il gioco
        }
    }

    // Rimuovi coltelli fuori dallo schermo
    knives = knives.filter(knife => knife.x + knife.width > 0);

    // Aggiorna il punteggio
    score += 1; // Incrementa il punteggio

    // Ridisegna il gioco
    draw();
}

// Disegna il gioco
function draw() {
    ctx.clearRect(0, 0, screenWidth, screenHeight); // Pulisci il canvas
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';

    // Disegna la patatina
    ctx.fillText(potatoEmoji, potato.x, potato.y + 40);

    // Disegna i coltelli
    for (let knife of knives) {
        ctx.fillText(knifeEmoji, knife.x, knife.y + 40);
    }

    // Disegna il punteggio
    ctx.fillText("Punteggio: " + score, screenWidth / 2, 50);

    // Se la patatina è abbassata, mostra "SMASH POTATO"
    if (potato.isDucking) {
        ctx.font = '30px Arial';
        ctx.fillText("SMASH POTATO", potato.x + potato.width + 10, potato.y + 20);
    }
}

// Controlla i tasti premuti
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !potato.isDucking) {
        // Salto
        potato.y -= 50; // Salto
        setTimeout(() => { 
            potato.y += 50; // Torna giù dopo un po'
        }, 300); 
    } else if (event.code === 'ArrowDown') {
        potato.isDucking = true; // Abbassati
        potato.y += 30; // Abbassa la patatina
    }
});

// Ritorna alla posizione originale quando il tasto ArrowDown viene rilasciato
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowDown') {
        potato.isDucking = false; // Torna su
        potato.y -= 30; // Ripristina la posizione verticale
    }
});

// Genera coltelli ogni 1500 ms
setInterval(createKnife, 1500);

// Aggiorna il gioco ogni 100 ms
setInterval(update, 100);
