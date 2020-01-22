const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

const GAME_WIDTH = 900;
const GAME_HEIGHT = 300;
const gravity = 5;
const speed = 5;
const slowspeed = 2;

var time = 0;
var player;
var direction = "N";
var up = false;
var boxes = [];
var lava = [];
var elevators = [];
var victory = false;
var level;
var finish;
var gameRunning = false;
var playerName;
var intervalId;
var timeBlink = 0;

var nameCookie = getCookie("user-name");
if (nameCookie != ""){
    playerName = nameCookie;
    console.log("user_name:",playerName);
    document.getElementById("userName").innerHTML = fixPlayerName(playerName);
    initGame();
}

function submitForm() {
    playerName = document.getElementById("name").value;
    setCookie("user-name",playerName,90);
    console.log("user_name:",playerName);
    document.getElementById("userName").innerHTML = fixPlayerName(playerName);
    if (time == 0) {
        initGame();
    }
}

function initGame() {
    document.getElementById("game").style.visibility = "visible";
    //document.getElementById("form").style.visibility = "hidden";
    document.getElementById("welcome").style.visibility = "hidden";
    player = new Player();
    level = new Level();
    level.levelInit();
    level.drawLevel();
    player.reset();
    drawTime();
    // start();
}


function start() {
    if (!gameRunning) {
        document.getElementById("startText").style.visibility = "hidden";
        document.getElementById("controlsText").style.visibility = "hidden";
        document.getElementById("timeRecap").style.visibility = "hidden";
        player.reset();
        time = 0;
        victory = false;
        gameRunning = true;
        intervalId = window.setInterval(() => {
            drawFinish(finish);
            player.draw(direction, up);
            level.moveElevators();

        time++;
        drawTime();

            if (victory) {
                showResult();
            }
        }, 50)
    }
}

function showResult() {
    gameRunning = false;
    window.clearInterval(intervalId);
    var data = {};
    // var url = "http://localhost/reciever.php";
    var url = "http://localhost/js-muj/reciever.php";
    var urlArgs = url.concat("?time=",time.toString(),"&name=",playerName);
    $.post(urlArgs, data);
    var cookieTime = getCookie("best-time");
    if (cookieTime == "") {
        setCookie("best-time", time, 90);
        setCookie("best-name", playerName, 90);
    }else if(cookieTime > time){
        setCookie("best-time", time, 90);
        setCookie("best-name", playerName, 90);
    }
    fillCurrentTime();
    fillTopTime();
    document.getElementById("startText").innerHTML = "Press space to start again."
    document.getElementById("startText").style.visibility = "visible";
    document.getElementById("timeRecap").style.visibility = "visible";
}

window.addEventListener('keydown', checkKeyDown, false);
window.addEventListener('keyup', checkKeyUp, false);

function checkKeyDown(key) {
    if (key.keyCode == 37 || key.keyCode == 65){
        direction = "L";
    } else if (key.keyCode == 39 || key.keyCode == 68){
        direction = "R";
    } else if (key.keyCode == 38 || key.keyCode == 87){
        up = true;
    } else if (key.keyCode == 32){
        start();
    }
}

function checkKeyUp(key) {
    if ((key.keyCode == 37 || key.keyCode == 65) && direction == "L"){
        direction = "N"
    } else if ((key.keyCode == 39 || key.keyCode == 68) && direction == "R"){
        direction = "N"
    } else if (key.keyCode == 38 || key.keyCode == 87){
        up = false;
    }
}

function drawTime() {
    if (timeBlink == 0){
        document.getElementById("time").style.color = "black";
    }else {
        document.getElementById("time").style.color = "#ff090e";
        timeBlink--;
    }

    document.querySelector('#deciSec')
        .innerText = (time % 10).toString();

    document.querySelector('#sec')
        .innerText = twoDigit((Math.floor(time / 10) % 60).toString());

    document.querySelector("#min")
        .innerText = twoDigit((Math.floor(time / 600)).toString());
}

function fillCurrentTime() {
    document.querySelector('#deciSecCurrent')
        .innerText = (time % 10).toString();

    document.querySelector('#secCurrent')
        .innerText = twoDigit((Math.floor(time / 10) % 60).toString());

    document.querySelector("#minCurrent")
        .innerText = twoDigit((Math.floor(time / 600)).toString());
}

function fillTopTime() {
    var cookieTime = getCookie("best-time");
    var cookieName = getCookie("best-name");
    var topName = cookieName.concat(":");
    document.querySelector('#deciSecTop')
        .innerText = (cookieTime % 10).toString();

    document.querySelector('#secTop')
        .innerText = twoDigit((Math.floor(cookieTime / 10) % 60).toString());

    document.querySelector("#minTop")
        .innerText = twoDigit((Math.floor(cookieTime / 600)).toString());

    document.querySelector("#topPlayerName")
        .innerText = topName;
}


function fixPlayerName(plName) {
    var x = plName.split("<").join("&lt");
    var res = x.split(">").join("&gt");
    return res;
}

function twoDigit(num) {
    if (num < 10){
        var x = "0"
        var ret = x.concat(num);
        return ret;
    }else {
        return num;
    }
}

