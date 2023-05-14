class Player {
 
    constructor(x, y, width, height, camera, state, gameWidth, gameHeight) {
        this.width = width;
        this.height = height;
    

        this.velY = 0;
        this.maxVelY = gameHeight/932;
        this.velX = 0;
        this.jumpX = gameWidth/2800;
        this.slowDownX = gameWidth/2800000;

        this.state = state;
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.camera = camera;

        this.color = "#0ff"

        this.cooldown = 0;
        this.cooldown_reset = 500;

        this.x = x;
        this.y = y;
    }

    // Draw
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Jump
    jump() {
        if(this.cooldown <= 0) {
            this.velX += this.jumpX;
            this.cooldown = this.cooldown_reset
        } 
    }

    update(deltaTime, objects) {
        if(!deltaTime) return;

        // Check for Collision
        for(let i = 0; i < objects.length; i++) {
            if(!(objects[i] instanceof Wall))continue;

            if(objects[i].x > 0 && objects[i].x < this.gameWidth) {
                if(this.checkCollision(objects[i])) {
                    this.state.state = "death";
                }
            }
        }

        // Call jump or change velocity
        if(window.buttons[2]) this.jump();
        if(window.buttons[0]) this.velY = -this.maxVelY;
        if(window.buttons[1]) this.velY = this.maxVelY;
        if(!window.buttons[0] && !window.buttons[1]) this.velY = 0;

        // Change y and clamp edge of screen
        this.y += this.velY * deltaTime;
        if(this.y < 0)
            this.y = 0;
        else if(this.y + this.height > GAME_HEIGHT)
            this.y = GAME_HEIGHT - this.height;

        // Change x, slow down continously
        this.camera.camx += (this.velX * deltaTime);
        if(this.velX > 0) this.velX -= this.slowDownX * deltaTime;
        else if(this.velX < 0) this.velX = 0;
        
        // Lower Cooldow
        if(this.cooldown >= 0) this.cooldown -= (deltaTime);
        
    }

    checkCollision(object) {
        if(object.x < this.x + this.width && this.x < object.x + object.width)
            if(object.y < this.y + this.height && this.y < object.y + object.height)    
                return true
    }
}