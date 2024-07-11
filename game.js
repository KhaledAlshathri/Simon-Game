var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level;
var started = false;


$(document).on("keydown" , function(event){

    if(event.key == "Enter"){
    if(started === false){

        playSound("start")
        level = 0;

        $("#level-title").text("level " + level)

        setTimeout(function(){
            nextSequence();
        }, 1800)
    
    started = true;

    }
}
    
})

$(".btn").on("click" , function(){
        
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);

})


function nextSequence() {

    userClickedPattern = [];

    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    
    $("#level-title").text("level " + level)
    
}


function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3")
        audio.play();
}


function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
    
}


function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
       
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    
    } else{

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Enter to Restart The Game")
        playSound("wrong");
    
        setTimeout(function () {
            $("body").removeClass("game-over");
         }, 200);

        startOver();

    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

