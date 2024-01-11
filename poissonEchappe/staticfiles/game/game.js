class Game {
    constructor(GAME_WIDTH, GAME_HEIGHT, state) {
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT; 
        this.objects = [];
        this.camera = new Camera();;
        this.state = state;
        this.length = 0;
        this.input = null;

        this.backgrounds = [];
        this.backgrounds[0] = 0;
        this.backgrounds[1] = this.GAME_WIDTH;

        this.background_drawing = window.document.getElementById("background");
        this.edge_img = window.document.getElementById("edge");
        this.flag = window.document.getElementById("flag");

        this.border_space = (window.innerHeight - GAME_HEIGHT) / 2.75;
    }

    // Initialise everything
    start() {
        this.input = new InputHandler();
        // NOTE THAT 
        this.objects.push(new Player(GAME_WIDTH/2, this.border_space + GAME_HEIGHT/2, GAME_WIDTH/28, GAME_WIDTH/28, this.camera, this.state, this.GAME_WIDTH, this.GAME_HEIGHT, this.border_space));

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
                if(walls[row][col] == 1) this.objects.push(new Wall(this.GAME_WIDTH/1.5 + col * this.GAME_WIDTH/4, this.border_space + (row * this.GAME_HEIGHT/6), this.GAME_HEIGHT/5.9, this.GAME_HEIGHT/5.9, this.camera));
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

        if(this.backgrounds[0] - this.camera.camx < - this.GAME_WIDTH) this.backgrounds[0] = this.backgrounds[1] + this.GAME_WIDTH
        if(this.backgrounds[1] - this.camera.camx  < - this.GAME_WIDTH) this.backgrounds[1] = this.backgrounds[0] + this.GAME_WIDTH
    }

    render(ctx, time) {
        // Draw the background
        ctx.drawImage(this.background_drawing, this.backgrounds[0] - this.camera.camx , this.border_space, this.GAME_WIDTH + 10, this.GAME_HEIGHT);
        ctx.drawImage(this.background_drawing, this.backgrounds[1] - this.camera.camx , this.border_space, this.GAME_WIDTH + 10, this.GAME_HEIGHT);
        
        // Draw the top edge
        ctx.drawImage(this.edge_img, this.backgrounds[0] - this.camera.camx , this.border_space - this.GAME_WIDTH/20, this.GAME_WIDTH, this.GAME_WIDTH/20);
        ctx.drawImage(this.edge_img, this.backgrounds[1] - this.camera.camx , this.border_space - this.GAME_WIDTH/20, this.GAME_WIDTH, this.GAME_WIDTH/20);
        
        // Draw the bottom edge
        ctx.drawImage(this.edge_img, this.backgrounds[0] - this.camera.camx , this.GAME_HEIGHT + this.border_space, this.GAME_WIDTH, this.GAME_WIDTH/20);
        ctx.drawImage(this.edge_img, this.backgrounds[1] - this.camera.camx , this.GAME_HEIGHT + this.border_space, this.GAME_WIDTH, this.GAME_WIDTH/20);
        
        // Drawing the walls
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].x < this.GAME_WIDTH) {
                this.objects[i].draw(ctx)
            }
                
        }

        // Drawing the finish
        if(this.length - this.camera.camx < this.GAME_WIDTH) {
            ctx.drawImage(this.flag, this.length - this.camera.camx + this.GAME_WIDTH/2 + 50, this.border_space, this.GAME_HEIGHT/5, this.GAME_HEIGHT);
        }

        // Drawing the timer
        ctx.fillStyle = '#ffffff';

        if(this.GAME_WIDTH < 1200) {
            ctx.font = '15pt Courier New';
            ctx.fillText('Timer: ' + parseInt(Math.round(time)/1000) + ":" + Math.round(time)%1000, 10, (window.innerHeight - GAME_HEIGHT) / 2.75 + 20);
        } else {
            ctx.font = '30pt Courier New';
            ctx.fillText('Timer: ' + parseInt(Math.round(time)/1000) + ":" + Math.round(time)%1000, 10, (window.innerHeight - GAME_HEIGHT) / 2.75 + 40);
        }
        
        

        
        
    }
    
}
