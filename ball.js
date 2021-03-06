function Ball() {
    this.x = width/10;
    this.y = height /2;
    this.gravity = 0;
    this.lift = this.gravity * 30;
    this.velocity = 0;
    this.radius = height/50;
    this.size = this.radius * 2;

    this.show = function() {
        fill(color(255,0,0));
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    };

    this.update = function() {
        // Move object
        this.velocity += this.gravity * global.frameRateModifier;
        this.y += this.velocity;

        // Check constrains (bird can't fly away!)
        if (this.y > (height - this.radius - 200))
        {
            this.y = height - this.radius - 200;
            this.velocity = 0;
        }
        if (this.y < this.radius) {
            this.y = this.radius;
            this.velocity = 0;
        }
    };

    this.up = function() {
        this.velocity =- this.lift * global.frameRateModifier;
    };

    this.setGravity = function(gravity) {
        this.gravity = gravity;
    };

    this.setLift = function(lift) {
        this.lift = lift;
    };

}