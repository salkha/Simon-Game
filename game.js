let buttonColors = ['red', 'blue','green','yellow']; //Array for the Button color

let gamePattern = [];           //Empty Array to put gamepattern inside
let userClickedPattern = [];    //Empty Array to put users pattern inside

let started = false;
let level = 0;

//keypressed function to start the game (Anykey)
$(document).keypress(function() {
    if(! started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started= true;
    }
  });


  //click detection function
$(".btn").click(function () { 
    let userChosenColor= $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
    
});

  //Check Answer function

  function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title ").text("Game Over!!! Please Press Any Key To Restart");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startOver();
    }

  }

//Gameplay Function

function nextSequence () {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

//function for button-animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }




//Function for playing sounds
function playSound(name) {
        let audio = new Audio ("sounds/" + name +".mp3");
        audio.play();
}




  
//Resten-Game

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }






