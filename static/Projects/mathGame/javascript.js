let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;
//click strat or reset button check playing or not
document.getElementById("startreset").onclick = function(){
 //if playing reload page
  if(playing == true){

    location.reload();//reload page
  }else{
    //change mode to playing
    playing = true;

    //if not playing >set score to 0
    score = 0;
    document.getElementById("scoreValue").innerHTML = score;
    //show countdown
    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    //hide gameover panel
    hide("gameOver");
    
    //change button to rese
    document.getElementById("startreset").innerHTML = "Reset Game";

    //start countdown
    startCoutdown();

    //generate a new q & A
    generateQA();
  }
}

//clicking on answerbox
for(i=1; i<5; i++){
  document.getElementById("box" + i).onclick =
function(){
//check if playing
if(playing == true){
if(this.innerHTML == correctAnswer){
  //correct answer
  score++;
  document.getElementById("scoreValue").innerHTML = score;
//hide wrong box and show correct box
hide("wrong");
show("correct");
setTimeout(function(){
  hide("correct");
}, 1000);
//generate new qyestion
generateQA();

}else{
  //wrong answer
  hide("correct");
  show("wrong");
  setTimeout(function(){
    hide("wrong");
  }, 1000);
  
}
}
}
}
 //reduce time by 1sec
//check if time left
//yes-continue
//no-game over
//change button to reset
//generate new game

//click answer box
//check if playing or not
//yes-check correct
//correct ? yes >increase answer by 1>show correct box
//genereate new questions

//if wrong >show try again

//functions
//start counter
function startCoutdown(){
action = setInterval(function(){
timeremaining -= 1;
document.getElementById("timeremainingvalue").innerHTML = timeremaining;
if(timeremaining == 0){
  //gameover
  stopCountdown();
  show("gameOver");
  document.getElementById("gameOver").innerHTML = "<p>Game over !</p><p>Your score: </p> <p> "+ score + "</p>";
  hide("timeremaining");
  hide("correct");
  hide("wrong");
  playing = false;
document.getElementById("startreset").innerHTML = "Start Game";
}
},1000);
}

//stop counter
function stopCountdown(){
  clearInterval(action);
}

//hide element by Id
function hide(id){
  document.getElementById(id).style.display="none";
}

//show element by Id
function show(id){
  document.getElementById(id).style.display="block";
}

// generate questions and answers
function generateQA(){
let x = 1 + Math.round(Math.random()*9);
let y = 1 + Math.round(Math.random()*9);
correctAnswer = x*y;
document.getElementById("question").innerHTML = x + "x" + y;

let correctPosition = 1 + Math.round(Math.random()*3);
document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with correct answer

//fill boxes with wrong answers
let answers = [correctAnswer];
for(i=1; i<5; i++){
if(i !== correctPosition){
let wrongAnswer;
  do{
    
      wrongAnswer= (1 + Math.round(Math.random()*9)) * (1 + Math.round(Math.random()*9));//wrong answer
     
  }
while(answers.indexOf(wrongAnswer)>-1)
document.getElementById("box" + i).innerHTML = wrongAnswer;
answers.push(wrongAnswer);
}
}

}