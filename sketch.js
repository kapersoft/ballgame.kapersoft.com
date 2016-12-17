// game objects
var game;
var banner;
var fps;
var infoScreen;
var global = {obstaclesLeft: 0, difficulty: 0, score: 0, lastscore: 0, highscore: 0, frameRateModifier: 1};

// Sounds
var music;
var soundEndgame;
var soundJump;


function preload() {
    music = loadSound("sounds/music.mp3");
    soundEndgame = loadSound("sounds/endgame.wav");
    soundJump = loadSound("sounds/jump.wav");
}


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

    playMusic(banner == undefined);

    if (banner) {
        banner.removeBanner ? banner = null : banner.draw();
    } else{
        game.draw();
        saveScores();
    }

    infoScreen.draw();
    fps.draw();
    global.frameRateModifier = 60 / fps.avgFrameRate;
}

function playMusic(bool) {
    if (!music.isPlaying() && bool)
        music.play();

    if (music.isPlaying() && !bool)
        music.stop();
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