class Game {
    constructor(GAME_WIDTH, GAME_HEIGHT, state) {
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT; 
        this.objects = [];
        this.camera;
        this.state = state;
        this.length = 0;
        this.input = null;
    }

    start() {
        this.input = new InputHandler();
        this.camera = new Camera();
        this.objects.push(new Player(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH/28, GAME_WIDTH/28, this.camera, this.state, this.GAME_WIDTH, this.GAME_HEIGHT));

        let walls = [[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                     [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
                     [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
                     [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
                     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
                     [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1]]

        // let walls = [[1, 1],
        //              [1, 0],
        //              [0, 0],
        //              [0, 1],
        //              [1, 1],
        //              [1, 1]]

        for(let row = 0; row < walls.length; row++) {
            for(let col = 0; col < walls[0].length; col++) {
                if(walls[row][col] == 1) this.objects.push(new Wall(this.GAME_WIDTH/1.5 + col * this.GAME_WIDTH/4, (row * this.GAME_HEIGHT/6), this.GAME_WIDTH/14, this.GAME_HEIGHT/5.9, this.camera));
            }
        }
        this.length = walls[0].length * (this.GAME_WIDTH/4) + this.GAME_WIDTH/1.5;
            
        
        this.objects[0].jump();
    }

    stop() {
        this.input.stop();
    }

    update(deltatime) {
        if(this.camera.camx > this.length) this.state.state = "win";

        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i] instanceof Player) {
                this.objects[i].update(deltatime, this.objects)
            }

            else {
                if(this.objects[i].x + this.objects[i].width < 0) {
                    this.objects.splice(i, 1)
                    i-=1;
                } else {
                    this.objects[i].update(deltatime)
                }
            }
            
        }
    }

    render(ctx, time) {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].x < this.GAME_WIDTH) {
                this.objects[i].draw(ctx)
            }
                
        }

        if(this.length - this.camera.camx < this.GAME_WIDTH) {
            ctx.fillStyle = "#ff0"
            ctx.fillRect(this.length - this.camera.camx + this.GAME_WIDTH/2 + 50, 0, 50, this.GAME_HEIGHT);
        }

        ctx.font = '40pt Kremlin Pro Web';
        ctx.fillStyle = '#1A0500';
        ctx.fillText('Timer: ' + parseInt(Math.round(time)/1000) + ":" + Math.round(time)%1000, 10, 50);
    }
    
}
