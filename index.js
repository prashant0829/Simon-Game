
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$('.start-button').click(function(){
    console.log('clicked');
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;}
  });

$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
    else {
        var pressedButton = event.key;
        var userPressedButton;
        switch (pressedButton) {
            case "q": userPressedButton = "green";
                userClickedPattern.push(userPressedButton);
                playSound(userPressedButton);
                animatePress(userPressedButton);
                checkAnswer(userClickedPattern.length - 1)
                break;
            case "w": userPressedButton = "red";
                userClickedPattern.push(userPressedButton);
                playSound(userPressedButton);
                animatePress(userPressedButton);
                checkAnswer(userClickedPattern.length - 1)
                break;
            case "a": userPressedButton = "yellow";
                userClickedPattern.push(userPressedButton);
                playSound(userPressedButton);
                animatePress(userPressedButton);
                checkAnswer(userClickedPattern.length - 1)
                break;
            case "s": userPressedButton = "blue";
                userClickedPattern.push(userPressedButton);
                playSound(userPressedButton);
                animatePress(userPressedButton);
                checkAnswer(userClickedPattern.length - 1)
                break;

            default: console.log(pressedButton)
                break;
        }

    }
}
);

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");


        startOver();
    }

}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {


    level = 0;
    gamePattern = [];
    started = false;
}
