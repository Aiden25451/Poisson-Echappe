class Player {
 
    constructor(x, y, width, height, camera, state, gameWidth, gameHeight, border_space) {
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

        this.color = "#FF8B00"

        this.cooldown = 0;
        this.cooldown_reset = 500;

        this.x = x;
        this.y = y;

        this.img;
        this.player1 = document.getElementById("player1")
        this.player2 = document.getElementById("player2")
        this.player3 = document.getElementById("player3")
        this.img = player1;
        this.startjump = 0;

        this.border_space = border_space;
    }

    // Draw
    draw(ctx) {
        // Draw player
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Jump
    jump() {
        // Jump
        if(this.cooldown <= 0) {
            this.velX += this.jumpX;
            this.cooldown = this.cooldown_reset
            this.startjump = 0;
        } 
    }

    update(deltaTime, objects) {
        if(!deltaTime) return;

        // Animate the player based off time since his jump
        if(this.startjump < 150) this.img = this.player2;
        else if(this.startjump < 300) this.img = this.player3;
        else if(this.startjump < 450) this.img = this.player2;
        else if(this.startjump < 600) this.img = this.player1;

        this.startjump += deltaTime;

        // Check for Collision
        for(let i = 0; i < objects.length; i++) {
            if(!(objects[i] instanceof Wall))continue;

            if(objects[i].x > 0 && objects[i].x < this.gameWidth) {
                if(this.checkCollision(objects[i])) {
                    this.state.state = "death";
                    // here document.getElementById("return_ingame").style.display = "block";
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
        if(this.y - this.border_space < 0)
            this.y = this.border_space
        else if(this.y + this.height - this.border_space > GAME_HEIGHT)
            this.y = GAME_HEIGHT - this.height + this.border_space;

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