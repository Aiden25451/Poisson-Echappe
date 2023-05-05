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
        ctx.font = '40pt Kremlin Pro Web';
        ctx.fillStyle = '#000000';
        ctx.fillText('PRESS SPACE TO START', 0, 200); 
    }
}