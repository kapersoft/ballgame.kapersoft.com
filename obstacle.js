function Obstacle(opening, location, speed) {
    const TOP_EDGE = 25;
    const BOTTOM_EDGE = 225;
    this.opening = opening;
    this.y = map(location, -5, 5, TOP_EDGE, height - this.opening - BOTTOM_EDGE);
    this.x = width;
    this.width = windowWidth/15;
    this.speed = speed;
    this.isHit = false;

    this.show = function () {
        fill(color(0, 255, 0));
        rect(this.x, 0, this.width, this.y);
        rect(this.x, this.y + this.opening, this.width, height);
    };

    this.update = function() {
        this.x  -= this.speed;
    };

    this.checkHit = function(ball) {
        var ballTop =  ball.y - ball.radius;
        var ballBottom = ball.y + ball.radius;
        var ballLeft = ball.x - ball.radius;
        var ballRight = ball.x + ball.radius;
        var hit = false;

        if (ballRight > this.x && ballLeft < this.x + this.width)
            hit = (ballTop < this.y || ballBottom > this.y + this.opening);

        return hit;

    };

    this.passedBall = function(ball)
    {
        return this.x + this.width < ball.x - ball.radius;
    };

    this.onscreen = function() {
        return this.x + this.width > 0;
    };

}