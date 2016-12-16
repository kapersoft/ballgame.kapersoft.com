InfoScreen = function() {

    this.draw = function() {
        fill(0);
        rect(0, height-200, width, height);
        fill(color(255,255,0));
        textSize(round(height / 30));
        textAlign(LEFT);
        text('Score: ' + round(global.score) + ' (last: ' + round(global.lastscore) + ', high: ' + round(global.highscore) + ')', 50, height - 125);
        text('Level: ' + round(global.difficulty) + '/10 (' + round(global.obstaclesLeft) + ' obstacle' + (global.obstaclesLeft>1 ? 's ' : ' ') + 'left)', 50, height - 50);

    };
};