Fps = function() {
    this.avgFrameRate = 0;
    const updateInterval = 1000; // 1 second
    var frameRates = [];
    var lastUpdate = new Date();


    this.draw = function () {
        frameRates.push(frameRate());
        if (new Date() - lastUpdate > updateInterval) {
            this.calculateAvgFrameRate();
        }

        fill(color(255, 0, 0));
        textSize(round(height / 30));
        textAlign(LEFT);
        text('FPS:' + round(this.avgFrameRate), width * 0.8, height * 0.05);
    };

    this.calculateAvgFrameRate = function() {
        var total = 0;
        for (var i = 0; i < frameRates.length; i++) {
            total += frameRates[i];
        }
        this.avgFrameRate = round(total / frameRates.length);
        lastUpdate = new Date();
        frameRates = [];
    }
};
