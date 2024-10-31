<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz di Patatina</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="quiz.js"></script>
    <style>
        body {
            background-color: #004d00; /* Verde scuro */
            color: white; /* Colore del testo */
            font-family: Arial, sans-serif;
            text-align: center;
            position: relative; /* Per l'animazione dell'emoji */
            overflow: hidden; /* Nasconde eventuali overflow */
        }

        .emoji {
            font-size: 100px; /* Dimensione dell'emoji */
        }

        .egg {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            animation: bounce 1s infinite alternate; /* Animazione di rimbalzo */
            z-index: -1; /* Porta l'emoji sullo sfondo */
        }

        @keyframes bounce {
            0% {
                transform: translate(-50%, 0); /* Posizione originale */
            }
            100% {
                transform: translate(-50%, -20px); /* Posizione su */
            }
        }

        .button {
            background-color: #007bff; /* Colore del pulsante */
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 20px;
            cursor: pointer;
            margin: 10px;
        }

        .button:hover {
            background-color: #0056b3; /* Colore del pulsante al passaggio del mouse */
        }

        .response {
            margin-top: 20px;
            font-size: 24px;
        }

        .wrong {
            color: red; /* Rosso per la risposta sbagliata */
        }

        .correct {
            color: green; /* Verde per la risposta corretta */
        }
    </style>
</head>
<body>
    <div class="emoji">🥔</div>
    <div class="egg">🥚</div> <!-- Emoji dell'uovo -->
    <h1>Quiz di Patatina</h1>
    <div id="quiz-container"></div>
    <div id="response" class="response"></div>
    <button id="next" class="button" onclick="nextQuestion()" style="display:none;">Prossima Domanda</button>
</body>
</html>
