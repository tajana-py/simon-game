var buttonColors = ["rose", "blue", "beige", "lilac"];

var gamePattern = [];
var userClickedPattern = [];

var gameHasStarted = false;
var level = 0;

$(document).on("keypress", function() {
    if (!gameHasStarted) {
        nextSequence();
        gameHasStarted = true;
}
});


$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id"); // moze i samo this.id
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];  
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function startOver() {
    gameHasStarted = false;
    level = 0;
    gamePattern = [];
}

function playSound(name) {
    var audio = new Audio(src="./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



    

