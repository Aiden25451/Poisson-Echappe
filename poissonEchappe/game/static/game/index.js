let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext('2d');

const GAME_WIDTH = 1400;
const GAME_HEIGHT = 600;

let state = new State("menu")

let game = new Game(GAME_WIDTH, GAME_HEIGHT, state);
let pause = new Pause(GAME_WIDTH, GAME_HEIGHT, state);

let lastTime = 0;
let start_time = 0;
let best_time = 0;

var time = document.getElementById("time")
if(time.innerHTML != "Best Time: DNF") {
    best_time = time.innerHTML.substring(11);
    best_time = parseInt(best_time) //Seperate the time from the text Best Time: 
    alert(best_time);
    time.innerHTML = "Best Time: " + parseInt(Math.round(best_time)/1000) + ":" + Math.round(best_time)%1000;
}

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Clear Screen
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if(state.state == "game") {
        game.update(deltaTime);
        game.render(ctx, timestamp-start_time)
        requestAnimationFrame(gameLoop);
    } else if(state.state == "pause") { 
        start_time = timestamp;
        game.render(ctx, timestamp-start_time)
        pause.render(ctx)
        requestAnimationFrame(gameLoop);
    } else if(state.state == "death") { 
        game = new Game(GAME_WIDTH, GAME_HEIGHT, state);
        pause = new Pause(GAME_WIDTH, GAME_HEIGHT, state);

        lastTime = 0;
        game.start()
        pause.start()

        state.state = "pause"
        gameLoop(0)
    } 
    else if(state.state == "win") { 
        if(best_time == 0 || timestamp-start_time < best_time) {
            best_time = timestamp-start_time;
        }

        game = new Game(GAME_WIDTH, GAME_HEIGHT, state);
        pause = new Pause(GAME_WIDTH, GAME_HEIGHT, state);
        
        lastTime = 0;
        openMenu()

        
    }
}

function openMenu() {
    var screen = window.document.getElementById("gameScreen");
    var menu = window.document.getElementById("menu");

    screen.style.visibility = "hidden";
    menu.style.visibility = "visible";
    var time = window.document.getElementById("time");

    time.innerHTML = ("Best Time: " + parseInt(Math.round(best_time)/1000) + ":" + Math.round(best_time)%1000);
}

function startGame() { 
    if(window.document.getElementById("name").innerHTML == "") {
        alert("PLEASE ENTER A NAME");
        return;
    }
    var screen = window.document.getElementById("gameScreen");
    var menu = window.document.getElementById("menu");

    screen.style.visibility = "visible";
    menu.style.visibility = "hidden";

    state.state = "pause";  

    game.start()
    pause.start()
        
    gameLoop(0)

}

function saveTime() {
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

    if(best_time != 0) {
        sendPOSTRequest();
    } else {
        alert("NO TIME SET");
    }    
}

function  home(){
    window.location.href += "return/";
}

