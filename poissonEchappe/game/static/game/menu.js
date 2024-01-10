class Menu {
    constructor(GAME_WIDTH, GAME_HEIGHT, canvas, ctx, state, best_time) {
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT; 
        this.canvas = canvas;
        this.ctx = ctx;
        this.state = state;
        this.best_time = best_time;

        // The rectangle should have x,y,width,height properties 
        this.record_rect = {
            x: this.GAME_WIDTH/2 - 400/2,
            y: 50,
            width: 400,
            height: 100,
        };

        this.play_rect = {
            x: this.GAME_WIDTH/2 - 100,
            y: 200,
            width: 200,
            height: 100,
        };

        this.save_time = {
            x: this.GAME_WIDTH/2 - 200/2,
            y: 350,
            width: 200,
            height: 100,
        };

        this.return_rect = {
            x: this.GAME_WIDTH/2 - 300/2,
            y: 500,
            width: 300,
            height: 100,
        };
    }

    // Binding the click event on the canvas
    start() {
        let canvas = this.canvas
        let play_rect = this.play_rect
        let return_rect = this.return_rect
        let save_time = this.save_time;
        let state = this.state
        let best_time = this.best_time;

        function button(evt) {
            var mousePos = getMousePos(canvas, evt);
            
            if (isInside(mousePos, play_rect)) {
                state.state = "pause"; 
                window.scrollTo(0, 0);
                canvas.removeEventListener('mouseup', button, false);;
            } 

            if (isInside(mousePos, return_rect)) {
                window.location.href = "return/"
            } 

            if (isInside(mousePos, save_time)) {
                const getCookie = (name) => {
                    let cookieValue = null;
                    if(document.cookie && document.cookie !== '') {
                        const cookies = document.cookie.split(';');
                        for(let i = 0; i < cookies.length; i++) {
                            const cookie = cookies[i].trim();
                            if(cookie.substring(0, name.length + 1) === (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }

                const sendPOSTRequest = () => {
                    let form = document.createElement("form");
                    form.setAttribute("method", "post");
                    form.setAttribute("action", "");

                    const csrftoken = getCookie('csrftoken');

                    let csrf = document.createElement('input');
                    csrf.setAttribute("type", "hidden");
                    csrf.setAttribute("name", "csrfmiddlewaretoken");
                    csrf.setAttribute("value", csrftoken);
                    form.appendChild(csrf);

                    let time = document.createElement('input');
                    time.setAttribute("name", "best_time");
                    time.setAttribute("value", best_time);

                    let name = document.createElement('input');
                    name.setAttribute("name", "name");
                    name.setAttribute("value", document.getElementById("name").innerHTML);

                    form.style.display = "none";
                    form.appendChild(time);
                    form.appendChild(name);

                    document.body.appendChild(form);

                    form.submit();
                }

                best_time;
                if(best_time != 0) {
                    sendPOSTRequest();
                } else {
                    alert("NO TIME SET");
                }    
                
            } 

            // Function to check whether a point is inside a rectangle
            function isInside(pos, rect) {
                return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
            }
        }

        canvas.addEventListener('mouseup', button, false);

        // Function to get the mouse position
        function getMousePos(canvas, event) {
            var play_rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - play_rect.left,
                y: event.clientY - play_rect.top,
            };
        }

        
    }
  
    // Question code
    render(ctx) {
        this.render_rect(ctx, this.play_rect, "Play")
        this.render_rect(ctx, this.return_rect, "Return")
        this.render_rect(ctx, this.save_time, "Save")
        if(this.best_time == 0) 
            this.render_rect(ctx, this.record_rect, "Time: DNF")
        else 
            this.render_rect(ctx, this.record_rect, "Time: " + parseInt(Math.round(this.best_time)/1000) + ":" + Math.round(this.best_time)%1000)
    }

    render_rect(ctx, rect, text) {
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = 'rgba(225,225,225,0.5)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.closePath();
        ctx.font = '40pt Kremlin Pro Web';
        ctx.fillStyle = '#000000';
        ctx.fillText(text, rect.x + rect.width / 5, rect.y + 64);
    }
}