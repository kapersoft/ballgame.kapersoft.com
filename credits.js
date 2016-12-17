Credits = function() {
    const BOTTOM_EDGE = 225 + height * 0.1;
    this.title = 'XXX';
    this.line = "YYYY";
    this.y = height * 0.1;
    this.x = width * 0.1;
    this.width = width * 0.8;
    this.height = height - this.y - BOTTOM_EDGE;
    this.closeCredits = false;

    appMode = MODE_CREDITS;


    this.draw = function () {
        // Create black background
        fill(color(0, 0, 0));
        rect(this.x, this.y, this.width, this.height);

        // Main line
        fill(color(0,255,0));
        textAlign(CENTER);
        textSize(width / 6);
        text("Ballgame",
            this.x + this.width * 0.1,
            this.y + this.height * 0.45,
            this.width * 0.9);

        // Bottom line
        textSize(height / 40);
        textAlign(CENTER);
        fill(color(255,255,0));
        text("Click here for credits and info",
            this.x + this.width * 0.1,
            this.y + this.height * 0.8,
            this.width * 0.8);
    };


    this.userInput = function () {

        var x = mouseX || touches[touches.length -1].x;
        var y = mouseY || touches[touches.length -1].y;

        if ((x >= (this.x + this.width * 0.1)) &&
            (x <= (this.x + this.width * 0.8)) &&
            (y >= (this.y + this.height * 0.7) &&
            (y <= (this.y + this.height * 0.8)))) {
            open("https://github.com/kapersoft/ballgame.kapersoft.com/");
        }
        else {
            this.closeCredits = true;
        }
    };


};
