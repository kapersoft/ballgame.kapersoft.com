Game = function() {

    // game objects
    var ball = new Ball();
    var obstacles = [];

    // difficulty parameters
    var minimalObstacleOpening = 0;
    var maximumObstacleOpening = 0;
    var newObstacleRate = 0;
    var gameSpeed = 5;

    // misc
    var count = 0;
    var obstacleLocation = 0;

    newGame();

    this.draw = function() {

        // Draw ball
        ball.update();
        ball.show();

        // Add obstacles
        if (((count == 0) || (count % round(newObstacleRate) == 0)) &&
            (global.obstaclesLeft - obstacles.length > 0)) {
            var opening = random(minimalObstacleOpening, maximumObstacleOpening);
            obstacleLocation = obstacleLocation + random(-2, 2) * global.difficulty;
            obstacleLocation = Math.min(Math.max(obstacleLocation, -5), 5);
            obstacles.push(new Obstacle(opening, obstacleLocation, gameSpeed));
        }

        // Display obstacles and check for hits
        for (var i = obstacles.length - 1; i >= 0; i--) {
            if (obstacles[i].checkHit(ball)) {
                newGame();
                break;
            }
            if (obstacles[i].onscreen()) {
                obstacles[i].update();
                obstacles[i].show();
            } else {
                if (!obstacles[i].isHit) {
                    global.score += map(global.difficulty, 1, 10, 100, 500);
                    global.obstaclesLeft -= 1;
                }
                obstacles.splice(i, 1);
            }
        }

        // Set score and level
        global.score += global.difficulty;
        if (global.obstaclesLeft == 0) {
            global.score += map(global.difficulty, 1, 10, 1000, 50000);
            setLevel();
        }

        // Loop
        count += 1;
    };

    this.userInput = function() {
        ball.up();
    };

    function newGame() {
        obstacles = [];
        global.lastscore = global.score;
        if (global.highscore < global.score) {
            global.highscore = global.score;
        }
        count = 0;
        global.score = 0;
        setLevel(1);
    }

    function setLevel(level) {
        global.difficulty = level ? level : global.difficulty + 1;
        global.difficulty = Math.min(Math.max(global.difficulty, 1), 10);

        // Calc difficulty
        newObstacleRate = map(global.difficulty, 1, 10, 120, 60);
        minimalObstacleOpening = ball.size * map(global.difficulty, 1, 10, 4, 2.5);
        maximumObstacleOpening = ball.size * map(global.difficulty, 1, 10, 7, 5);
        var baseGravity = windowHeight / 2000;
        ball.setGravity(map(global.difficulty, 1, 10, baseGravity, baseGravity * 2));
        ball.setLift(map(global.difficulty, 1, 10, baseGravity * 20, baseGravity * 30));
        global.obstaclesLeft = global.difficulty * 5;
        gameSpeed = map(global.difficulty, 1, 10, 5, 10);

        // soft-reset game
        obstacles = [];
        count = 0;
        this.banner = new Banner('Ballgame', 'Level ' + round(global.difficulty), global.difficulty == 1 ? 5 : 3);
    }


};