const quizArea = document.getElementById('quizArea');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizMessage = document.getElementById('quizMessage');
const nextButton = document.getElementById('nextButton');
const answerInput = document.getElementById('answerInput');

let currentQuestionIndex = 0;
let totalQuestions = 10;

// Domande e risposte
const questions = [
    {
        question: "Quanti anni ha Patatina?",
        correctAnswer: "Noni mesi",
        wrongAnswers: ["Noni + noni", "Eh?", "No me lo wicoddo"],
    },
    {
        question: "Che mutica accotta Patatina?",
        correctAnswer: "Le cazzoni di ovetto",
        wrongAnswers: ["Pinguini tattici nucleari", "Twenty one pilots", "Nettuna pecche no sente"],
    },
    {
        question: "Qual è i colowe pefewito di Patatina?",
        correctAnswer: "Newo",
        wrongAnswers: ["Giallo patata", "Blu", "Vedde"],
    },
    {
        question: "Qual è i numewo più gaddi di tutti?",
        correctAnswer: "Noni",
        wrongAnswers: ["I numeri sono infiniti", "Otta", "Quiddici"],
    },
    {
        question: "In quale città Patatina ha dato i pimo bacio a Guscio?",
        correctAnswer: "Nettuna",
        wrongAnswers: ["Caffo ne to", "Barcellona", "Marsiglia"],
    },
    {
        question: "Qual è tato i pimo viaggio di Patatina e Ovetto?",
        correctAnswer: "Bristi",
        wrongAnswers: ["Vienni", "Messina", "Londra"],
    },
    {
        question: "Qual è tata la pima VACAZZA di Patatina e Ovetto?",
        correctAnswer: "Vienni",
        wrongAnswers: ["Messina", "Londra", "CRACOVIA"],
    },
    {
        question: "Qual è tato i wegalo pe i tei meti?",
        correctAnswer: "POWER POINT IO TI SGUSCIO UOVO CATTIVO",
        wrongAnswers: [],
        isOpenEnded: true,
    },
    {
        question: "Pe quatto teppo Patatina e Ovetto tawanno ittiemi?",
        correctAnswer: "Pe teppi yeeeeeee",
        wrongAnswers: ["Non lo so", "2/3 anni", "Fino al primo anno di convivenza"],
    },
    {
        question: "Quanto mi ami dopo questo regalo?",
        correctAnswer: "Uguale pecche gia ti amavino all'iffinito",
        wrongAnswers: ["Tantissimo", "Noni + noni x noni all'infinito", "No ti voglio più"],
    },
];

// Inizializza il quiz
function initQuiz() {
    currentQuestionIndex = 0;
    quizArea.style.display = 'block';
    showQuestion();
}

// Mostra la domanda corrente
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizQuestion.innerText = currentQuestion.question;
    quizMessage.innerText = '';
    answerInput.value = '';

    // Se la domanda è a risposta aperta
    if (currentQuestion.isOpenEnded) {
        quizOptions.style.display = 'none';
        answerInput.style.display = 'block';
        answerInput.focus();
    } else {
        answerInput.style.display = 'none';
        quizOptions.innerHTML = ''; // Pulisci le opzioni precedenti

        // Mostra le opzioni di risposta
        const allAnswers = [currentQuestion.correctAnswer, ...currentQuestion.wrongAnswers];
        shuffle(allAnswers); // Mischia le risposte

        allAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.onclick = () => checkAnswer(answer);
            quizOptions.appendChild(button);
        });
    }
}

// Verifica la risposta
function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    // Controlla se la risposta è corretta
    if (selectedAnswer === currentQuestion.correctAnswer) {
        const positiveMessages = [
            "Bavo tu ti che tei un ovetto!",
            "Yeeee hai iddovinato!!",
            "Bavo ovetto!",
            "Wow e come facevi a tapella"
        ];
        quizMessage.style.color = 'green';
        quizMessage.innerText = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    } else {
        quizMessage.style.color = 'red';
        quizMessage.innerText = "Sbagliato. Wipova.";
    }

    // Mostra il pulsante per la prossima domanda
    nextButton.style.display = 'block';
}

// Mischia le risposte
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Passa alla prossima domanda
nextButton.onclick = () => {
    nextButton.style.display = 'none'; // Nascondi il pulsante

    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion(); // Mostra la prossima domanda
    } else {
        quizArea.style.display = 'none'; // Nascondi il quiz al termine
        alert('Hai completato il quiz!'); // Messaggio di completamento
        // Riavvia o fai qualcosa al termine del quiz
    }
};

// Inizializza il quiz quando necessario
initQuiz();
