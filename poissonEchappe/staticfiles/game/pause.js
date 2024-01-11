class Pause {
    constructor(GAME_WIDTH, GAME_HEIGHT, state, start_button) {
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT; 
        this.state = state;
        this.start_button = start_button;
    }

    // Binding the click event on the canvas
    /*

    I THINK IT SLOWS DOWN CAUSE THESE EVENT LISTENERS ARE NOT ERASED

    */
    space(event) {
        var code = event.code;

        switch(code) {
            case 'Space':
                document.getElementById("return_table").style.display = "none";
                state.state = "game";
                break;
        }
    }

    button() {
        document.getElementById("return_table").style.display = "none";
        state.state = "game";
    }

    start() {
        document.addEventListener('keydown', this.space, true)
        document.getElementById("right").addEventListener("mousedown", this.button, true)
    }

    stop() {
        document.removeEventListener('keydown', this.space, true)
        document.getElementById("right").removeEventListener("mousedown", this.button, true)
    }
  
    // Question code
    render(ctx) {
        ctx.fillStyle = '#ffffff';
        if(this.GAME_WIDTH < 1200) {
            ctx.font = '15pt Courier New';
            ctx.fillText(this.start_button, 10, (window.innerHeight - GAME_HEIGHT) / 2.75 + 40); 
        } else {
            ctx.font = '30pt Courier New';
            ctx.fillText(this.start_button, 10, (window.innerHeight - GAME_HEIGHT) / 2.75 + 75); 
        }
        
        
    }
}