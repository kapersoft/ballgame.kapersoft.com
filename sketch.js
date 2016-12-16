// game objects
var game;
var banner;
var fps;
var infoScreen;

//
var global = {obstaclesLeft: 0, difficulty: 0, score: 0, lastscore: 0, highscore: 0};



function setup() {
    global.highscore = Cookies.get('highscore') || 0;
    global.lastscore = Cookies.get('lastscore') || 0;

    createCanvas(windowWidth, windowHeight);
    game = new Game(global, banner);
    infoScreen = new InfoScreen(global);
    fps = new Fps();
}

function draw() {
    background(0, 0, 255);

    if (banner) {
        banner.removeBanner ? banner = null : banner.draw();
    } else{
        game.draw();
        saveScores();

    }

    infoScreen.draw();
    fps.draw();
}

function saveScores() {
    Cookies.set('highscore', global.highscore);
    Cookies.set('lastscore', global.lastscore);
}

function userInput() {
    if (banner) {
        banner.userInput();
    } else {
        game.userInput();
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