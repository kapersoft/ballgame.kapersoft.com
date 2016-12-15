Banner = function(title, line) {
    const BOTTOM_EDGE = 225 + windowHeight * 0.1;
    this.title = title;
    this.line = line;
    this.y = windowHeight * 0.1;
    this.x = windowWidth * 0.1;
    this.width = windowWidth * 0.8;
    this.height = windowHeight - this.y - BOTTOM_EDGE;
    this.speed = 0;

    this.show = function () {
        fill(color(0, 0, 0));
        rect(this.x, this.y, this.width, this.height);
        fill(color(255,255,0));
        textSize(windowHeight / 15);
        textAlign(CENTER);
        text(this.title,
            this.x + this.width * 0.1,
            this.y + this.height * 0.15,
            this.width * 0.90);

        text(this.line,
            this.x + this.width * 0.1,
            this.y + this.height * 0.8,
            this.width * 0.90);


    };

    this.update = function()
    {
        // this.x -= this.speed;
    };

    this.onscreen = function() {
        return this.x + this.width > 0;
    };

};
