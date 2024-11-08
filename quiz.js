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
        correctAnswer: "Noni mesi dal primo \"ti amino\"",
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
        // Risposte specifiche a partire dalla 12ª domanda (indice 11)
        if (currentQuestionIndex >= 11) {
            const specialResponses = [
                "NO E' GIUTTI",
                "TEPPE A MINONI TEI",
                "UFFI E PECCHE NO A MINONI?",
                "OH OH"
            ];
            const responseIndex = currentQuestionIndex - 11;
            const responseText = specialResponses[responseIndex] || "Bravo ovetto!";
            responseContainer.innerHTML = `<span class="correct">${responseText}</span>`;
        } else {
            const randomResponses = [
                "Bravo tu ti che tei un ovetto!",
                "Yeeee hai iddovinato!!",
                "Bravo ovetto!",
                "Wow e come facevi a tapella"
            ];
            const randomResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
            responseContainer.innerHTML = `<span class="correct">${randomResponse}</span>`;
        }
    } else {
        responseContainer.innerHTML = `<span class="wrong">Sbagliato. Wipova.</span>`;
    }

    nextButton.style.display = 'block';

    // Se siamo all'ultima domanda, dopo 2 secondi mostra il messaggio finale con l'immagine
    if (currentQuestionIndex === quizQuestions.length - 1) {
        setTimeout(() => {
            // Nascondi il contenuto del quiz e mostra il messaggio finale con l'immagine
            document.getElementById('quiz-container').innerHTML = '<h2>quetto è i mio wegalo pe te</h2>';
            
            // Crea un tag <img> per mostrare l'immagine di screenshot
            const screenshot = document.createElement('img');
            screenshot.src = 'screenshot.jpg'; // Qui devi usare il nome dell’immagine
            screenshot.alt = 'Screenshot finale';
            screenshot.style.width = '300px';  // Imposta una dimensione se necessario
            screenshot.style.marginTop = '20px';

            // Aggiungi l'immagine al contenitore del quiz
            document.getElementById('quiz-container').appendChild(screenshot);
            
            // Rimuovi la risposta (se c'era) per una schermata pulita
            document.getElementById('response').innerHTML = '';
        }, 2000);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// Avvio del quiz
showQuestion();
