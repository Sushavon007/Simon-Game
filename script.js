var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
    if(!started){
        // $("#level-title").text("Level " + level);
        $("#score-title").css("display","none");
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    // $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // playSound(randomChosenColor);
    var i=0;
    challange(i);
}

function challange(i){
    setTimeout(function(){
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        i++;
        if(i<gamePattern.length){
            challange(i);
        }
    }, 400);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        statOver();
    }
}

function statOver(){
    level = (level<=1)?1:level;
    $("#score-title").text("Your Score: " + (level-1));
    $("#score-title").css("display","flex");
    level = 0;
    gamePattern = [];
    started = false;
}