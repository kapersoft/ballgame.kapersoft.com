// game objects
var game;
var banner;
var fps;
var infoScreen;
var credits;

// Game info
var global = {obstaclesLeft: 0, difficulty: 0, score: 0, lastscore: 0, highscore: 0, frameRateModifier: 1};
const MODE_BANNER = 0;
const MODE_GAME = 1;
const MODE_CREDITS = 2;
var appMode = MODE_BANNER;

// Sounds
var music;
var soundEndgame;
var soundJump;
var soundNextlevel;


function preload() {
    music = loadSound("sounds/music.mp3");
    soundEndgame = loadSound("sounds/endgame.wav");
    soundJump = loadSound("sounds/jump.wav");
    soundNextlevel = loadSound("sounds/nextlevel.wav");

    global.highscore = Cookies.get('highscore') || 0;
    global.lastscore = Cookies.get('lastscore') || 0;

}


function setup() {
    createCanvas(windowWidth, windowHeight);
    game = new Game(global, banner);
    infoScreen = new InfoScreen(global);
    fps = new Fps();
}


function draw() {
    background(0, 0, 255);

    switch (appMode) {
        case MODE_BANNER:
            playMusic(false);
            if (!banner.closeBanner) {
                banner.draw()
            } else {
                banner = null;
                appMode = MODE_GAME;
            }
            break;
        case MODE_GAME:
            playMusic(true);
            game.draw();
            break;
        case MODE_CREDITS:
            playMusic(true);
            credits.draw();
            if (!credits.closeCredits) {
                credits.draw()
            } else {
                credits = null;
                appMode = MODE_GAME;
            }
            break;
    }

    infoScreen.draw();
    fps.draw();
    global.frameRateModifier = 60 / fps.avgFrameRate;
}


function playMusic(bool) {
    if (!music.isPlaying() && bool)
        music.loop();

    if (music.isPlaying() && !bool)
        music.stop();
}


function saveScores() {
    Cookies.set('highscore', global.highscore);
    Cookies.set('lastscore', global.lastscore);
}


function userInput() {
    switch (appMode) {
        case MODE_BANNER:
            banner.userInput();
            break;
        case MODE_CREDITS:
            credits.userInput();
            break;
        case MODE_GAME:
            infoScreen.userInput();
            if (appMode == MODE_GAME)
                game.userInput();
            break;
    }
}


function mouseIsPressed() {
    userInput();
    return false;
}


function keyPressed() {
    if (key = ' ') userInput();
    return false;
}


function touchStarted() {
    userInput();
    return false;
}