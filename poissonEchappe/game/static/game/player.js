class Player {
 
    constructor(gameWidth, gameHeight, camera, state, input) {
        this.width = 50;
        this.height = 50;
        this.speedX = 0;
        this.velY = 0;
        this.maxVelY = 0.5;
        this.velX = 0;
        this.state = state;
        this.input = input;

        this.gameWidth = gameWidth;

        this.camera = camera;

        this.color = "#0ff"

        this.cooldown = 0;
        this.cooldown_reset = 100;

        this.maxSpeedY = 70;

        this.position = {
            x: gameWidth/2,
            y: gameHeight/2,
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.color = "#0ff"
    }

    jump() {
        if(this.cooldown <= 0) {
            this.velX += 0.5;
            this.cooldown = this.cooldown_reset
        } 
    }

    update(deltaTime, objects) {
        if(!deltaTime) return;

        for(let i = 0; i < objects.length; i++) {
            if(!(objects[i] instanceof Wall))continue;

            if(objects[i].position.x > 0 && objects[i].position.x < this.gameWidth) {
                if(this.checkCollision(objects[i])) {
                    this.state.state = "death";
                }
            }
        }

        if(this.input.buttons[2]) this.jump();

        if(this.input.buttons[0]) this.velY = -this.maxVelY;
        if(this.input.buttons[1]) this.velY = this.maxVelY;
        
        if(!this.input.buttons[0] && !this.input.buttons[1]) this.velY = 0;

        // if(this.velY > this.maxVelY) this.velY = this.maxVelY;
        // else if(this.velY < -this.maxVelY) this.velY = -this.maxVelY;

        this.position.y += this.velY * deltaTime;

        if(this.position.y < 0)
            this.position.y = 0;
        else if(this.position.y + this.height > GAME_HEIGHT)
            this.position.y = GAME_HEIGHT - this.height;

        // this.position.x += this.velX / deltaTime;
        this.camera.camx += (this.velX * deltaTime);
        // console.log("velx: " + this.velX + " time: " + deltaTime + " CamxChange: " + this.velX / deltaTime)

        if(this.cooldown >= 0) this.cooldown -= (deltaTime);

        if(this.velX > 0) this.velX -= 0.0005 * deltaTime;
        else if(this.velX < 0) this.velX = 0;
    }

    checkCollision(object) {
        if(object.position.x < this.position.x + this.width && this.position.x < object.position.x + object.width)
            if(object.position.y < this.position.y + this.height && this.position.y < object.position.y + object.height)    
                return true
    }
}