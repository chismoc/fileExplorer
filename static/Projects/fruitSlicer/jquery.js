let playing = false;
let score;
let trailsRemaining;
let step;
let action; //set interval action
let fruits = ['apple', 'banana', 'watermelon', 'cherries', 'orange', 'mango', 'pineapple', 'strawberry', 'tomato'];
$(function(){

  //click on start/reset button
$("#startreset").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
      }else{

          //we are not playing
          playing = true; //game initiated

          //set score to 0
          score = 0; //set score to 0
          $("#scoreValue").html(score);

          //show trials left 
          $("#trialsRemaining").show();
          trailsRemaining = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();
      }
    });

    $("#fruit1").mouseover(function(){
      score++;
      $("#scoreValue").html(score); //update score
    $("#sliceSound")[0].play();//play sound
    //stop fruit from going down
   clearInterval(action);
   //hide fruit
$("#fruit1").hide("explode",500);//slice
    //send new fruit
    setTimeout(startAction,500);
    
    });
   
    //slice a fruit
    //play sound
    //explode fruit


//check if playing
//if playing reload page
//fi not showtrialslest box, button box to reset
//create random fruits
function addHearts(){
  $("#trialsRemaining").empty();
  for(i= 0; i< trailsRemaining; i++){
    $("#trialsRemaining").append('<img src="images/heart.png" class="life">');
    }

}
//start sending fruits
function startAction(){

//generate a fruit
 $("#fruit1").show();
 chooseFruit();//choose a random fruit

 //random position
 $("#fruit1").css({'left' : Math.round(550*Math.random()), top : -50
});

//generate random step
step = 1 + Math.round((Math.random())*5);

//move fruit down by one step every 1sec
action = setInterval(function(){
$("#fruit1").css('top', $("#fruit1").position().top + step);

//check if fruit is too low
if($("#fruit1").position().top > $("#fruitContainer").height()){

  //check if trials left
  if(trailsRemaining > 1){
//generate a fruit
$("#fruit1").show();
chooseFruit();//choose a random fruit

//random position
$("#fruit1").css({'left' : Math.round(550*Math.random()), top : -50
});

//generate random step
step = 1 + Math.round((Math.random())*5);

//reduce trialsRemaining by 1
trailsRemaining --;

//populate trialsRemaining box
addHearts();

  }else{
    //game over
    playing = false; //we are not playing anymore
    $("#startreset").html("Start Game"); // change button to Start Game
    $("#gameOver").show();
    $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
    $("#trialsRemaining").hide();
    stopAction();

  }
}
}, 10);


 }

 //generate a random fruit
 function chooseFruit(){
  $("#fruit1").attr('src', 'images/' + fruits[Math.round((Math.random())*8)] + '.png');
 }

 //stop dropping fruits
 function stopAction(){
  clearInterval(action);
  $("#fruit1").hide();
 }
});