class Game {
    constructor() {
        this.level = 1;
        this.obstaclesPassed = 0;
        this.isGameOver = false;
        this.patata = new Patatina();
        this.ovetto = new Ovetto();
    }

    startGame() {
        this.playLevel(this.level);
    }

    playLevel(level) {
        switch (level) {
            case 1:
                this.playLevel1();
                break;
            case 2:
                this.playLevel2();
                break;
            case 3:
                this.playLevel3();
                break;
        }
    }

    playLevel1() {
        this.obstaclesPassed = 0;

        while (this.obstaclesPassed < 15 && !this.isGameOver) {
            this.movePatatina();
            if (this.checkCollisionWithObstacle()) {
                this.isGameOver = true;
            } else {
                this.obstaclesPassed++;
            }
        }

        if (!this.isGameOver) {
            this.level1EndScene();
        } else {
            this.displayGameOver();
        }
    }

    level1EndScene() {
        console.log("Patatina sees Ovetto.");
        console.log("Patatina: 'Eh?'");
        console.log("Ovetto: 'Patatina aiuto!!'");
        // Trigger transition to level 2
        this.level++;
        this.playLevel(this.level);
    }

    playLevel2() {
        this.obstaclesPassed = 0;

        while (this.obstaclesPassed < 25 && !this.isGameOver) {
            this.movePatatina();
            if (this.checkCollisionWithObstacle()) {
                this.isGameOver = true;
            } else {
                this.obstaclesPassed++;
            }
        }

        if (!this.isGameOver) {
            this.level2EndScene();
        } else {
            this.displayGameOver();
        }
    }

    level2EndScene() {
        console.log("Patatina: 'Ovetto, e e e come hai fatto a fa addawe via i ladwo?'");
        console.log("Ovetto: 'L'ho minacciato, l'ho guaddato e ho detto: NO SI FA! Ed è cappato via.'");
        console.log("Both: 'Yeeeeeee!!!!'");
        console.log("Ovetto: 'Oh oh!'");
        console.log("Ovetto: 'PatatinaPool savvamiiiii.'");
        // Transition to level 3
        this.level++;
        this.patata.transformToPatatinaPool();
        this.playLevel(this.level);
    }

    playLevel3() {
        this.obstaclesPassed = 0;

        while (this.obstaclesPassed < 50 && !this.isGameOver) {
            this.movePatatina();
            if (this.checkCollisionWithObstacle()) {
                this.isGameOver = true;
            } else {
                this.obstaclesPassed++;
            }
        }

        if (!this.isGameOver) {
            this.level3EndScene();
        } else {
            this.displayGameOver();
        }
    }

    level3EndScene() {
        console.log("PatatinaPool: 'Ma ma ma, due ovetti? Quale dei due è i mio ovetto??'");
        console.log("Ovetto 1: 'Patatina tei venuta a tavvammi! Gazie!'");
        console.log("Ovetto 2: 'Patatina tei venuta a tavvammi! Gazie!'");
        console.log("PatatinaPool: 'C'è tolo u modo pe copillo.......ITTEWOGATOWIO'");
        // Start quiz game
        this.startQuizGame();
    }

    checkCollisionWithObstacle() {
        // Implement collision detection logic
        return false; // For now, just a placeholder
    }

    movePatatina() {
        // Implement movement logic
    }

    displayGameOver() {
        console.log("La Patata E' Stata Sbucciata");
        // Implement game over logic
    }

    startQuizGame() {
        console.log("Inizio il gioco a quiz...");
        // Implement quiz logic
    }
}

class Patatina {
    constructor() {
        this.isPatatinaPool = false;
    }

    transformToPatatinaPool() {
        this.isPatatinaPool = true;
        console.log("Patatina si trasforma in PatatinaPool!");
        // Logic for changing appearance
    }
}

class Ovetto {
    // Implement Ovetto logic if needed
}

// Start the game
const game = new Game();
game.startGame();
