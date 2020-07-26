const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keydown(function (e){
  if(!started){
    nextSequence();
    started = true;
  }
});

// This function generates the next GamePattern (by generating the next colour)
function nextSequence() {
  // clearing the userClickedPattern for the next Level
  userClickedPattern = [];

// Increasing the Level and displaying it in the level-title
  level += 1;
  $("#level-title").text('Level '+level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Fade animation for gamePattern
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

$(".btn").click(function () {

    let userChosenColour = this.classList[1];
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

  });

// Play sound on Button  Click
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

//  Animate the button on Click
function animatePress(currentColour) {
  let button = $("#"+ currentColour);
  button.addClass("pressed");
  setTimeout(function () {
      button.removeClass("pressed");
    }, 100);
}

// Compare the User Click Input against the GamePattern.
// This function is called every single time whenever the user clicks on a button.
function checkAnswer(index) {

  if(gamePattern[index] === userClickedPattern[index]) {

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }

  } else {
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      let audio = new Audio("sounds/wrong.mp3");
      audio.play();
      startOver();
    }
}
// Function to reset the GamePattern, Level and game condition
// Function is called if the user clicks on the wrong button.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
