class InputHandler {
 
    constructor() {
        this.buttons = [false, false, false];
        document.addEventListener('keydown', (event) => {
            // var name = event.key;
            var code = event.code;
            // Alert the key name and key code on keydown
            // alert(code);
        
            switch(code) {
                case 'ArrowUp':
                    this.buttons[0] = true;
                    break;
                case 'ArrowDown':
                    this.buttons[1] = true;
                    break;
                case 'Space':
                    this.buttons[2] = true;
                    break;
            }

          }, false);
          document.addEventListener('keyup', (event) => {
            // var name = event.key;
            var code = event.code;
            // Alert the key name and key code on keydown
            // alert(code);

            switch(code) {
                case 'ArrowUp':
                    this.buttons[0] = false;
                    break;
                case 'ArrowDown':
                    this.buttons[1] = false;
                    break;
                case 'Space':
                    this.buttons[2] = false;
                    break;
            }

            // if(!this.buttons[0] && !this.buttons[1]) player.setVelY(0);

          }, false);
    }

    
}