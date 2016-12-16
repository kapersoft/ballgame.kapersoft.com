// game objects
var ball;
var obstacles = [];
var banner;

// score
var score = 0;
var lastscore = 0;
var highscore = Cookies.get('highscore') || 0;

// difficulty
var difficulty = 0;
var obstaclesLeft = 0;
var minimalObstacleOpening = 0;
var maximumObstacleOpening = 0;
var newObstacleRate = 0;
var gameSpeed = 5;

// misc
var count = 0;
var obstacleLocation = 0;
var fps = {frameRates: [], avgFrameRate: 0, lastUpdate: new Date()};

function newGame() {
    obstacles = [];
    lastscore = score;
    if (highscore < score) {
        highscore = score;
        Cookies.set('highscore', highscore);
    }
    count = 0;
    score = 0;
    setLevel(1);
}

function setLevel(level) {
    difficulty = level ? level : difficulty + 1;
    if (difficulty > 10) difficulty = 10;
    if (difficulty < 1) difficulty = 1;

    // Calc difficulty
    newObstacleRate = map(difficulty, 1, 10, 120, 60);
    minimalObstacleOpening = ball.size * map(difficulty, 1, 10, 4, 2.5);
    maximumObstacleOpening = ball.size * map(difficulty, 1, 10, 7, 5);
    var baseGravity = windowHeight / 2000;
    ball.setGravity(map(difficulty, 1, 10, baseGravity, baseGravity * 2));
    ball.setLift(map(difficulty, 1, 10, baseGravity * 20, baseGravity * 30));
    obstaclesLeft = difficulty * 5;
    gameSpeed = map(difficulty, 1, 10, 5, 10);

    // soft-reset game
    obstacles = [];
    count = 0;
    banner = new Banner('Ballgame', 'Level ' + round(difficulty));
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    ball = new Ball();
    newGame();
}

function draw()
{
    background(0, 0, 255);

    if (banner) {
        bannerDraw();
    } else{
        gameDraw();
    }

    // Show score, difficulty and fps
    fill(0);
    rect(0, height-200, width, height);
    fill(color(255,255,0));
    textSize(round(windowHeight / 30));
    textAlign(LEFT);
    text('Score: ' + round(score) + ' (last: ' + round(lastscore) + ', high: ' + round(highscore) + ')', 50, height-125);
    text('Level: ' + round(difficulty) + '/10 (' + round(obstaclesLeft) + ' obstacle' + (obstaclesLeft>1 ? 's ' : ' ') + 'left)', 50, height-50);
    fill(color(255, 0, 0));
    text('FPS:' + round(getAvgFrameRate()), windowWidth * 0.8, windowHeight * 0.05);
}


function getAvgFrameRate() {
    const updateInterval = 1000; // milliseconds

    if (new Date() - fps.lastUpdate > updateInterval) {
        var total = 0;
        for (var i = 0; i < fps.frameRates.length; i++) {
            total += fps.frameRates[i];
        }
        fps.avgFrameRate = round(total / fps.frameRates.length);
        fps.lastUpdate = new Date();
        fps.frameRates = [];
    }
    fps.frameRates.push(frameRate());
    return fps.avgFrameRate;
}


function bannerDraw()
{
    banner.speed = gameSpeed;
    banner.update();
    banner.show();
}

function gameDraw()
{
    // Draw ball
    ball.update();
    ball.show();

    // Add obstacles
    if (((count == 0) || (count % round(newObstacleRate) == 0)) &&
        (obstaclesLeft - obstacles.length > 0)) {
        var opening = random(minimalObstacleOpening, maximumObstacleOpening);
        obstacleLocation = obstacleLocation + random(-2, 2) * difficulty;
        obstacleLocation = Math.min(Math.max(obstacleLocation, -5), 5);
        obstacles.push(new Obstacle(opening, obstacleLocation, gameSpeed));
    }

    // Display obstacles and check for hits
    for (var i=obstacles.length-1; i >= 0; i--) {
        if (obstacles[i].checkHit(ball)) {
            newGame();
            break;
        }
        if (obstacles[i].onscreen()) {
            obstacles[i].update();
            obstacles[i].show();
        } else {
            if (!obstacles[i].isHit) {
                score += map(difficulty, 1, 10, 100, 500);
                obstaclesLeft -= 1;
            }
            obstacles.splice(i, 1);
        }

    }

    // Set score and level
    score = score + difficulty;
    if (obstaclesLeft == 0) {
        score += map(difficulty, 1, 10, 1000, 50000);
        setLevel();
    }

    // Loop
    count += 1;
}

function userInput()
{
    if(banner) {
        banner = null
    } else {
        ball.up();
    }

}

function keyPressed() {
    if (key = ' ') userInput();
    return false;
}

function touchStarted() {
    userInput();
    return false;
}