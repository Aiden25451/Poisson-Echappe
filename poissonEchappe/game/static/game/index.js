//Width and Height
GAME_WIDTH = window.innerWidth;
GAME_HEIGHT = GAME_WIDTH/2.75;

// Canvas stuff
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

ctx.canvas.width  = GAME_WIDTH;
ctx.canvas.height = window.innerHeight;
// canvas.style.top = String((window.innerHeight - GAME_HEIGHT) / 2) + "px"

window.buttons = [false, false, false];
// document.getElementById("return_table").style.top = ((window.innerHeight - GAME_HEIGHT) / 2.75) + "px";

//Set state
let state = new State("menu")

//Function to check if mobile
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
    
};

// If mobile, turn on the buttons for moving
if(window.mobileAndTabletCheck()) {
    document.getElementById("up").style.display="block";
    document.getElementById("down").style.display="block";
    document.getElementById("right").style.display="block";
}

//Create game and pause menu instance
let game = new Game(GAME_WIDTH, GAME_HEIGHT, state);
let pause = new Pause(GAME_WIDTH, GAME_HEIGHT, state);

//Time variables
let lastTime = 0;
let start_time = 0;
let best_time = 0;

//Set the time shown on screen
var time = document.getElementById("id_time")
time.value = "DNF"

//Gameloop
function gameLoop(timestamp) {
    //Manage time
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Clear Screen
    ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);

    //Start game
    if(state.state == "game") {
        //Render update and run again
        game.update(deltaTime);
        game.render(ctx, timestamp-start_time)
        requestAnimationFrame(gameLoop);
    } 
    else if(state.state == "pause") { 
        //Render game and pause and run again
        start_time = timestamp;
        game.render(ctx, timestamp-start_time)
        pause.render(ctx)
        requestAnimationFrame(gameLoop);
    } 
    else if(state.state == "death") { 
        //On death, reset set a new game and pause
        game.stop();
        pause.stop()
        lastTime = 0;

        startGame()

        state.state = "pause"
        gameLoop(0)
    } 
    else if(state.state == "win") { 
        //Check if the best time has improved
        game.stop();
        pause.stop()
        if(best_time == 0 || timestamp-start_time < best_time) {
            best_time = timestamp-start_time;
        }

        // Create a new game and pause menu
        game = null;
        pause = null;
        
        // Set time and open the menu
        lastTime = 0;
        openMenu() 
    }
}

// Open the main game menu
function openMenu() {
    var screen = window.document.getElementById("main");
    var menu = window.document.getElementById("menu");
    var time = window.document.getElementById("id_time");

    window.document.getElementById("body").style.borderStyle = "solid"
    window.document.getElementById("body").style.overflow = "scroll";
    window.document.getElementById("return_table").style.display = "none";

    GAME_WIDTH = window.innerWidth;
    GAME_HEIGHT = GAME_WIDTH/2.75;

    game = new Game(GAME_WIDTH, GAME_HEIGHT, state);
    pause = new Pause(GAME_WIDTH, GAME_HEIGHT, state);

    ctx.canvas.width  = GAME_WIDTH;
    ctx.canvas.height = window.innerHeight;
    // canvas.style.top = String((window.innerHeight - GAME_HEIGHT) / 2) + "px"

    // Get rid of the screen and show the menu
    screen.style.display = "none";
    menu.style.display = "block";

    state.state = "pause";  
    
    // Set the right time
    if(best_time != 0)
        time.value = (parseInt(Math.round(best_time)/1000) + ":" + Math.round(best_time)%1000);
    else {
        time.value = "DNF";
    }
}

// Start game
function startGame() { 
    // Check to make sure the name is there
    if(window.document.getElementById("id_name").value == "" && state.state != "death") {
        alert("PLEASE ENTER A NAME");
        return;
    }

    if(window.innerWidth < window.innerHeight) {
        alert("Please Flip your phone");
        openMenu();
        return;
    }

    var start_button = "Click spacebar to start"
    if(window.mobileAndTabletCheck()) {
        var start_button = "Press forward to start";
    }

    window.document.getElementById("body").style.borderStyle = "hidden";

    window.document.getElementById("body").style.overflow = "hidden";

    var ret_table = document.getElementById("return_table");
    ret_table.style.display = "block";
    
    // ret_table.style.top = ((window.innerHeight - GAME_HEIGHT) / 2.75) + "px";
    
    GAME_WIDTH = window.innerWidth;
    GAME_HEIGHT = GAME_WIDTH/2.75;

    game = new Game(GAME_WIDTH, GAME_HEIGHT, state);
    pause = new Pause(GAME_WIDTH, GAME_HEIGHT, state, start_button);

    ctx.canvas.width  = GAME_WIDTH;
    ctx.canvas.height = window.innerHeight;
    // canvas.style.top = String((window.innerHeight - GAME_HEIGHT) / 2.5) + "px"

    var screen = window.document.getElementById("main");
    var menu = window.document.getElementById("menu");

    // Show the screen, erase the menu
    screen.style.display = "block";
    menu.style.display = "none";

    // Start the game, pause and loop
    state.state = "pause";  
    game.start()
    pause.start()
   
    gameLoop(0)
    

}


function doSubmit(){
    if(best_time == 0) {
        alert("Set a Time First")
        return false;
    } else if(document.getElementById("id_name").value == "") {
        alert("Enter a name")
        return false;
    } else if(document.getElementById("id_name").value.length >= 200) {
        alert("Enter a shorter name")
        return false;
    } else if(best_time >= 2147483647) {
        alert("Too slow")
        return false;
    } 
    
    var form = document.getElementById("score");
    form.submit();
}

// Function to go to home menu
function home(link){
    window.location.href = link;
}

