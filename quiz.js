const questions = [
    {
        question: "Quanti anni ha Patatina?",
        options: ["Noni + noni", "Eh?", "No me lo wicoddo", "Noni mesi"],
        correctAnswer: "Noni mesi"
    },
    {
        question: "Che mutica accotta Patatina?",
        options: ["Pinguini tattici nucleari", "Twenty one pilots", "Nettuna pecche no sente", "Le cazzoni di ovetto"],
        correctAnswer: "Le cazzoni di ovetto"
    },
    {
        question: "Qual è i colowe pefewito di Patatina?",
        options: ["Giallo patata", "Blu", "Vedde", "Newo"],
        correctAnswer: "Newo"
    },
    {
        question: "Qual è i numewo più gaddi di tutti?",
        options: ["I numeri sono infiniti", "Otta", "Quiddici", "Noni"],
        correctAnswer: "Noni"
    },
    {
        question: "In quale città Patatina ha dato i pimo bacio a Guscio?",
        options: ["Caffo ne to", "Barcellona", "Marsiglia", "Nettuna"],
        correctAnswer: "Nettuna"
    },
    {
        question: "Qual è tato i pimo viaggio di Patatina e Ovetto?",
        options: ["Vienni", "Messina", "Londra", "Bristi"],
        correctAnswer: "Bristi"
    },
    {
        question: "Qual è tata la pima VACAZZA (ti ho fegato pima co i pimo viaggetto eh??) di Patatina e Ovetto?",
        options: ["Messina", "Londra", "CRACOVIA", "Vienni"],
        correctAnswer: "Vienni"
    },
    {
        question: "Qual è tato i wegalo pe i tei meti?",
        options: [], // Risposta aperta
        correctAnswer: "POWER POINT IO TI SGUSCIO UOVO CATTIVO"
    },
    {
        question: "Pe quatto teppo Patatina e Ovetto tawanno ittiemi?",
        options: ["Non lo so", "2/3 anni", "Fino al primo anno di convivenza", "Pe teppi yeeeeeee"],
        correctAnswer: "Pe teppi yeeeeeee"
    },
    {
        question: "Quanto mi ami dopo questo regalo?",
        options: ["Tantissimo", "Noni + noni x noni all'infinito", "No ti voglio più", "Uguale pecche gia ti amavino all'iffinito"],
        correctAnswer: "Uguale pecche gia ti amavino all'iffinito"
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const quizMessage = document.getElementById("quizMessage");
    const nextButton = document.getElementById("nextButton");

    quizMessage.innerText = ""; // Pulisci il messaggio precedente
    quizOptions.innerHTML = ""; // Pulisci le opzioni precedenti

    const questionData = questions[currentQuestion];
    quizQuestion.innerText = questionData.question;

    if (questionData.options.length > 0) {
        // Mescola le opzioni
        const options = [...questionData.options];
        shuffle(options);
        
        options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => selectOption(option);
            quizOptions.appendChild(button);
        });
    } else {
        // Creazione della barra di ricerca per la risposta aperta
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Scrivi la tua risposta qui...";
        quizOptions.appendChild(input);

        const submitButton = document.createElement("button");
        submitButton.innerText = "Invia";
        submitButton.onclick = () => selectOption(input.value);
        quizOptions.appendChild(submitButton);
    }

    nextButton.style.display = "none"; // Nascondi il pulsante per la prossima domanda
}

function selectOption(option) {
    const questionData = questions[currentQuestion];
    const quizMessage = document.getElementById("quizMessage");
    const nextButton = document.getElementById("nextButton");

    if (option === questionData.correctAnswer) {
        // Risposta corretta
        const correctResponses = [
            "Bavo tu ti che tei un ovetto!",
            "Yeeee hai iddovinato!!",
            "Bavo ovetto!",
            "Wow e come facevi a tapella"
        ];
        quizMessage.innerText = correctResponses[Math.floor(Math.random() * correctResponses.length)];
    } else {
        // Risposta sbagliata
        quizMessage.innerText = "Sbagliato. Wipova.";
    }

    nextButton.style.display = "block"; // Mostra il pulsante per la prossima domanda
}

document.getElementById("nextButton").onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        // Mostra un messaggio di fine quiz o riassunto
        document.getElementById("quizArea").innerHTML = "<h1>Quiz Completato!</h1>";
    }
};

// Funzione per mescolare le opzioni
function shuffle(array) {
    for (let i = array.length - 1; i > 
