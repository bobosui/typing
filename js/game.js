var placeLetterInterval = 500;
var placeLetterTimer, moveLettersTimer;
var startButton, resetButton;
var box, message, score;

function placeLetter() {
    var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    var newLetter = document.createElement("div");
    newLetter.innerHTML = letter;
    newLetter.className = letter;

    newLetter.style.top = Math.random() * 300 + "px";
    newLetter.style.right = 1000 - (Math.random() * 500) + "px";

    box.appendChild(newLetter);
}

function moveLetters() {
    var boxes = document.querySelectorAll("#box > div");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.right = parseInt(boxes[i].style.right) - 10 + "px";
        if (parseInt(boxes[i].style.right) <= -10) {
            endGame();
        }
    }
}

function decreaseLetterSpeed(score) {
    if (parseInt(score.innerHTML) % 20 === 0) {
        clearInterval(placeLetterTimer);
        placeLetterInterval = placeLetterInterval * 1.1
        placeLetterTimer = setInterval(placeLetter, placeLetterInterval)
    }
}

function endGame() {
    clearInterval(moveLettersTimer);
    clearInterval(placeLetterTimer);
    document.removeEventListener('keydown', keyboardInput);
    message.classList.remove("hidden");
    resetButton.classList.add("disabled");
    startButton.lastChild.nodeValue = "Start";
}


function pauseGame(){
    if (pauseButton.lastChild.nodeValue == "Pause"){
        // pause
        clearInterval(placeLetterTimer);
        clearInterval(moveLettersTimer);
        pauseButton.lastChild.nodeValue = "Resum";
    }else{
        // resume
        moveLettersTimer = setInterval(moveLetters, 100);
        placeLetterTimer = setInterval(placeLetter, 500);
        pauseButton.lastChild.nodeValue = "Pause";
    }
}
function resetGame() {
    message.classList.add("hidden");
    score.innerHTML = 0;

    var boxes = document.querySelectorAll("#box > div");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].remove();
    }
}

function keyboardInput() {
    if (event.keyCode === 27) {
        return endGame();
    };

    var key = String.fromCharCode(event.keyCode).toLowerCase();
    var boxes = document.getElementsByClassName(key);

    if (boxes[0]) {
        boxes[0].remove();
        score.innerHTML = parseInt(score.innerHTML) + 1;
        decreaseLetterSpeed(score);
    } else {
        score.innerHTML = parseInt(score.innerHTML) - 1;
    }

}


function startGame() {
    if (startButton.lastChild.nodeValue == "Start")
    {
        resetGame();
        placeLetterTimer = setInterval(placeLetter, placeLetterInterval);
        moveLettersTimer = setInterval(moveLetters, 100);
        document.addEventListener('keydown', keyboardInput);
        resetButton.classList.remove("disabled")
        startButton.lastChild.nodeValue = "Stop ";
    }else{
        endGame();
        resetGame();
    }
    
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("OH HAI THERE!");

    message = document.getElementById('message');
    box = document.getElementById('box');
    score = document.getElementById("score");

    startButton = document.getElementById('start')
    startButton.onclick = startGame;

    pauseButton = document.getElementById('pause')
    pauseButton.onclick = pauseGame;

    resetButton = document.getElementById('reset')
    resetButton.onclick = resetGame;
});
