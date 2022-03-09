document.addEventListener("keydown", (event, keyCode) => {
    if(event.key === "ArrowLeft"){moveLeft();}
    if(event.key === "ArrowRight"){moveRight();}
    if(event.key === " "){pause();}
});

const character = document.getElementById("character");
const block = document.getElementById("block");
const overlay = document.getElementById("overlay");
const counterEl = document.getElementById("counter");
const reloadButton = document.getElementById("reloadBtn");
const startButton = document.getElementById("startBtn");
const rightEl = document.getElementById("right")
const leftEL = document.getElementById("left")
const game = document.getElementById("game");
const startPage = document.getElementById("start-page")
const timerEl = document.getElementById("timer");
const off = document.getElementById("off");
const pauseEl = document.getElementById("pause");



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function moveLeft(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 100;
    if(left >= 0){
        character.style.left = left + "px";
    }
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 100;
    if(left < 300){
        character.style.left = left + "px";
    }
}
let counter = 0;
let total = 0;
let random;
let flag = false;
let soundFlag = true;

block.addEventListener('animationiteration', () => {
    counterTemp = 0;
    if (getRandomInt(2) === 1) {
        random = 1;
        block.style.backgroundImage = "url('img/stone.png')";
        // block.style.backgroundColor = "#000";

    } else {
        random = 2;
        block.style.backgroundImage = "url('img/coin1.png')";
        // block.style.backgroundColor = "#FFF";
    }
    left = getRandomInt(3) * 100;
    block.style.left = left + "px";
    if (flag) {
        counter++;
        // console.log(counter);
        flag = false;
        if (soundFlag) {
            coinSound();
        }
    }
    total++;
});


setInterval(function(){
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    if((characterLeft === blockLeft && blockTop < 500 && blockTop > 300) && random === 1){
        // alert("Game over. Score: " + counter);
        block.style.animation = "none";
        block.style.display = "none";
        character.style.top = "400px";
        overlay.style.display = "block";
        counterEl.innerText = counter;
        timerEl.innerText = total;
        if (soundFlag) {
            gameOverSound();
        }
    } else if ((characterLeft === blockLeft && blockTop < 500 && blockTop > 300) && random === 2) {
            flag = true;
    }

},10);




rightEl.addEventListener("touchstart", moveRight);
leftEL.addEventListener("touchstart", moveLeft);





reloadButton.addEventListener("click", function() {
    location.reload();
    startPage.style.display = "none";
});

startButton.addEventListener("click", function() {
    startPage.style.display = "none";
    leftEL.style.display = "block";
    rightEl.style.display = "block";
    game.style.display = "block";
});





//   Sounds ==============

function coinSound (){
    let myAudio = new Audio;
    myAudio.src = "sounds/claim-coin1.mp3";
    myAudio.play();
}

function gameOverSound (){
    let myAudio = new Audio;
    myAudio.src = "sounds/game-over.mp3";
    myAudio.play();
}

off.addEventListener("click", function () {
    soundFlag = false;
    off.style.display = "none"
})

//=======================
// console.log(getComputedStyle(block).animationPlayState)
function pause() {
    if (getComputedStyle(block).animationPlayState === "running"){
        block.style.animationPlayState = "paused";
        pauseEl.style.backgroundColor = "#C70101FF";
    } else {
        block.style.animationPlayState = "running";
        pauseEl.style.background = "none";
    }
}

pauseEl.addEventListener("click", pause);

// pause ================