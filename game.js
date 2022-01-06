
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;

var userClickedPattern = [];

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playAudio(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

  //console.log(userClickedPattern);

});



// GAME START HERE
$(document).on("keypress", function(){

  updateLevel();
  if(level==0)
  nextSequence();
});

function updateLevel()
{
  $("#level-title").text("Level : " + level);

}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playAudio("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    $("#level-title").text("Game Over, Press Any Key to Restart");
  }

}

function nextSequence() {
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(randomChosenColour);
  playAudio(randomChosenColour);

}

function playAudio(chosenColour){
  var audio = new Audio("sounds/" + chosenColour + ".mp3");
  audio.play();

}


function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
