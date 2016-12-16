Banner = function(title, line, countDown) {
    const BOTTOM_EDGE = 225 + height * 0.1;
    this.title = title;
    this.line = line;
    this.y = height * 0.1;
    this.x = width * 0.1;
    this.width = width * 0.8;
    this.height = height - this.y - BOTTOM_EDGE;
    this.removeBanner = false;

    var userClick = 2;
    var lastUpdate = new Date();
    const updateInterval = 1000; // 1 second


    this.draw = function () {
        // Create black background
        fill(color(0, 0, 0));
        rect(this.x, this.y, this.width, this.height);

        // Title
        fill(color(255,255,0));
        textSize(height / 15);
        textAlign(CENTER);
        text(this.title,
            this.x + this.width * 0.1,
            this.y + this.height * 0.15,
            this.width * 0.90);

        // info line
        textSize(height / 15);
        textAlign(CENTER);
        fill(color(255,255,0));
        text(this.line,
            this.x + this.width * 0.1,
            this.y + this.height * 0.8,
            this.width * 0.90);

        // counter
        this.updateCountDown();
        fill(color(0,255,0));
        textAlign(CENTER);
        textSize(height / 5);
        text(countDown,
            this.x + this.width * 0.1,
            this.y + this.height * 0.55,
            this.width * 0.90);
    };


    this.userInput = function () {
        userClick -= 1;
        if (userClick == 0)
            this.removeBanner = true;
    };


    this.updateCountDown = function() {
        if (new Date() - lastUpdate > updateInterval) {
            countDown -= 1;
            lastUpdate = new Date();
        }
        if (countDown < 1) {
            this.removeBanner = true;
        }
    }

};
