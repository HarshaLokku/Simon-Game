// Code starts here
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var active = false;
var level = 0;

// Snippet of keypress action to start game

$(document).keypress(function(){
   if(!active) {
      $("#level-title").text("Level "+ level)
      nextSequence()
      active = true
   }
})

//  Snippet of action when any button is clicked and generate userClickedPattern

$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour); 
   animatePress(userChosenColour);
   
   checkAnswer(userClickedPattern.length-1);
});

// Snippet to generate gamePattern

function nextSequence(){
   userClickedPattern = [];

   level++; 
   $("h1").text("Level "+ level);

   var randomNumber = Math.floor(Math.random()*4) ;
   var randomChoosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChoosenColour);

   $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChoosenColour);
}

// Snippet to play sound 

function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

// Snippet to add animation to clicked button 

function animatePress(currentColour){
   $("#" + currentColour).addClass("pressed");

   setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
   }, 100);
}


// Snippet of Game Logic

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      
      if (userClickedPattern.length === gamePattern.length){
         setTimeout(function () {
            nextSequence();
         }, 1000);
      }
   } else {
      $("body").addClass("game-over");
      playSound("wrong");

      setTimeout(() => {
         $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over! Press Any Key to Restart");
      startOver();
   }
}

// Start Over 

function startOver() {
   level = 0;
   gamePattern = [];
   active = false; 
}