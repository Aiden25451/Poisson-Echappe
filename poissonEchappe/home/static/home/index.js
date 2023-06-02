$(document).ready(function() {
    // document is loaded and DOM is ready
    var times = document.getElementsByClassName("time");

    for(let i = 0; i < times.length; i++) {
        let num_time = parseInt(times[i].innerHTML);
        let temp_time = 0;
        times[i].innerHTML = "";

        temp_time = parseInt(num_time/1000);
        if(temp_time < 10) times[i].innerHTML += "0"
        times[i].innerHTML += temp_time + ":";

        temp_time = num_time%1000;
        if(temp_time < 100) times[i].innerHTML += "0"
        if(temp_time < 10) times[i].innerHTML += "0"
        times[i].innerHTML += temp_time; 
    }
});

function goToGame() {
    window.location.href = "game/"
}

