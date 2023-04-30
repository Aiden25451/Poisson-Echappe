class Game {
    constructor(GAME_WIDTH, GAME_HEIGHT, state) {
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT; 
        this.objects = [];
        this.camera;
        this.state = state;
        this.length = 0;
    }

    start() {
        let input = new InputHandler();
        this.camera = new Camera();
        this.objects.push(new Player(GAME_WIDTH, GAME_HEIGHT, this.camera, this.state, input));

        let walls = [[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                     [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                     [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
                     [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
                     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
                     [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1]]

        for(let row = 0; row < walls.length; row++) {
            for(let col = 0; col < walls[0].length; col++) {
                if(walls[row][col] == 1) this.objects.push(new Wall(1500 + col * 400, (row * 100), this.camera));
            }
        }
        this.length = walls[0].length * (400+100) + 1500;
            
        
        this.objects[0].jump();
    }

    update(deltatime) {
        if(this.camera.camx > this.length) this.state.state = "win";

        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i] instanceof Player) {
                this.objects[i].update(deltatime, this.objects)
            }

            else {
                if(this.objects[i].position.x + this.objects[i].width < 0) {
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
            if(this.objects[i].position.x < this.GAME_WIDTH) {
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
