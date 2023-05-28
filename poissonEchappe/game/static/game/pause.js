class Pause {
    constructor(GAME_WIDTH, GAME_HEIGHT, state) {
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT; 
        this.state = state;
    }

    // Binding the click event on the canvas
    start() {
        let state = this.state
        document.addEventListener('keydown', (event) => {
            var code = event.code;

            switch(code) {
                case 'Space':
                    state.state = "game";
                    break;
            }
        })
        document.getElementById("right").addEventListener("mousedown", () => {
            state.state = "game";
        })
    }
  
    // Question code
    render(ctx) {
        if(this.GAME_WIDTH < 1200)
            ctx.font = '20pt Kremlin Pro Web';
        else 
            ctx.font = '40pt Kremlin Pro Web';

        ctx.fillStyle = '#000000';
        ctx.fillText('PRESS SPACE OR FORWARD TO START', 25, (window.innerHeight - GAME_HEIGHT) / 2.5+this.GAME_HEIGHT/2); 
    }
}