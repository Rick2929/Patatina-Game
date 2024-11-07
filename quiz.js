const quizQuestions = [
    {
        question: "Quanti anni ha Patatina?",
        correctAnswer: "Noni mesi",
        wrongAnswers: ["Noni + noni", "Eh?", "No me lo wicoddo"]
    },
    {
        question: "Che mutica accotta Patatina?",
        correctAnswer: "Le cazzoni di ovetto",
        wrongAnswers: ["Pinguini tattici nucleari", "Twenty one pilots", "Nettuna pecche no sente"]
    },
    {
        question: "Qual è i colowe pefewito di Patatina?",
        correctAnswer: "No vede",
        wrongAnswers: ["Giallo patata", "Blu", "Vedde"]
    },
    {
        question: "Qual è i numewo più gaddi di tutti?",
        correctAnswer: "Noni",
        wrongAnswers: ["I numeri sono infiniti", "Otta", "Quiddici"]
    },
    {
        question: "In quale città Patatina ha dato i pimo bacio a Guscio?",
        correctAnswer: "Nettuna",
        wrongAnswers: ["Caffo ne to", "Barcellona", "Marsiglia"]
    },
    {
        question: "Qual è tato i pimo viaggio di Patatina e Ovetto?",
        correctAnswer: "Bristi",
        wrongAnswers: ["Vienni", "Messina", "Londra"]
    },
    {
        question: "Qual è tata la pima VACAZZA di Patatina e Ovetto?",
        correctAnswer: "Vienni",
        wrongAnswers: ["Messina", "Londra", "CRACOVIA"]
    },
    {
        question: "Qual è tato i wegalo pe i tei meti?",
        correctAnswer: "POWER POINT IO TI SGUSCIO UOVO CATTIVO",
        wrongAnswers: []
    },
    {
        question: "Pe quatto teppo Patatina e Ovetto tawanno ittiemi?",
        correctAnswer: "Pe teppi yeeeeeee",
        wrongAnswers: ["Non lo so", "2/3 anni", "Fino al primo anno di convivenza"]
    },
    {
        question: "Quanto mi ami dopo questo regalo?",
        correctAnswer: "Uguale pecche gia ti amavino all'iffinito",
        wrongAnswers: ["Tantissimo", "Noni + noni x noni all'infinito", "No ti voglio più"]
    },
    {
        question: "Cota tawa' accaduto i 13 dicebbi?",
        correctAnswer: "Noni mesi dal primo "ti amino"",
        wrongAnswers: ["No lo to", "Noni mesi dal primo bacio", "Noni mesi dal primo wegalo"]
    },
    {
        question: "Dove vive i quetto pewiodo ovetto?",
        correctAnswer: "A Minoni",
        wrongAnswers: ["A Cotoni", "A Itoli", "A Cosezzi"]
    },
    {
        question: "E e e e quiddi dove tawa' ovetto i 13 dicebbi?",
        correctAnswer: "A Minoni",
        wrongAnswers: ["A Cotoni", "A Itoli", "A Cosezzi"]
    },
    {
        question: "Dove vive i quetto pewiodo patatina?",
        correctAnswer: "A Cosezzi",
        wrongAnswers: ["A Cotoni", "A Itoli", "A Minoni"]
    },
    {
        question: "E e e e quiddi dove tawa' patatina i 13 dicebbi?",
        correctAnswer: "A Minoni",
        wrongAnswers: ["A Cotoni", "A Itoli", "A Cosezzi"]
    }
];

let currentQuestionIndex = 0;

function shuffleAnswers(correct, wrong) {
    const allAnswers = [correct, ...wrong];
    for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
}

function showQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    const responseContainer = document.getElementById('response');
    const nextButton = document.getElementById('next');
    
    if (currentQuestionIndex < quizQuestions.length) {
        const { question, correctAnswer, wrongAnswers } = quizQuestions[currentQuestionIndex];
        const answers = shuffleAnswers(correctAnswer, wrongAnswers);

        questionContainer.innerHTML = `<h2>${question}</h2>`;
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.className = 'button';
            button.onclick = () => checkAnswer(answer);
            questionContainer.appendChild(button);
        });
        responseContainer.innerHTML = '';
        nextButton.style.display = 'none'; // Nascondi il pulsante "Prossima domanda"
    } else {
        questionContainer.innerHTML = '<h2>Hai completato il quiz!</h2>';
        document.getElementById('response').innerHTML = '';
        document.getElementById('next').style.display = 'none';
    }
}

function checkAnswer(answer) {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    const responseContainer = document.getElementById('response');
    const nextButton = document.getElementById('next');
    
    if (answer === correctAnswer) {
        const responses = [
            "Bravo tu ti che tei un ovetto!",
            "Yeeee hai iddovinato!!",
            "Bravo ovetto!",
            "Wow e come facevi a tapella"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        responseContainer.innerHTML = `<span class="correct">${randomResponse}</span>`;
    } else {
        responseContainer.innerHTML = `<span class="wrong">Sbagliato. Wipova.</span>`;
    }

    nextButton.style.display = 'block'; // Mostra il pulsante "Prossima domanda"
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// Avvio del quiz
showQuestion();