//Selecting elements 
const topbar = document.getElementsByClassName('.topbar');
const highscores = document.getElementsByClassName('.viewhighscores');
const timerDisplay = document.querySelector('.timerclock');
const statementdiv= document.querySelector('.quiz_question');
const response = document.querySelector('.answer');


//time intervals 75 15 seconds sub if wrong 15 seconds add if right 
//set interval one time 
//set timeout repeatedly on set time 
//clear interval will top the time 

//Object of array with key value the statememt number 2  statement and multiple choice
const quizpageContent = [

    {
        statement: "How do you stop a timed interval",
        options:["stop","button","clear timeout", "clear"],
        answer:2
    },
    {
        statement: "what does DOM stand for",
        options:["Day on Mars","IDk","MOD","Document Object Model"],
        answer:3
    },
    {
        statement: "How are arrays stored",
        options:["[]","{}","||","&&"],
        answer:0
    },
    {
        statement: "what are class selectors",
        options:["[]","a css form of obtaining a class within the html document in order to manipulate the css style of the element","||","&&"],
        answer:1
    },
    {
        statement: "Where do you link a script tagin html",
        options:["head and or body","body","head","all of the above"],
        answer:3
    },


]

const highScoreContent = {
    statement:"High Score",
    options:["Restart Quiz","clear high score"]
}


//set interval 

//
let timer = 75;
let currentQuestionIndex = 0;
let intervalId;
//where closure and parameter should enclose the timer
let quizStarted = false;
//function that will create elements for each value of the array of object quizpage
const displayingQuizPage = function(){
    if (currentQuestionIndex >= quizpageContent.length) {
        // Quiz has ended, do not execute further code
        return;
      }
      if (!quizStarted) {
        quizStarted = true;
     const currentQuestion = quizpageContent[currentQuestionIndex];
    //taking one away from the timer
    const question = currentQuestion.statement;
    //create parent to store the statement/question
    const statementcontainer = document.createElement("div");
    //create element to store the question value
    const statementtag = document.createElement("h3");
    //adding class to the question tag
    statementtag.classList.add("question");
    //adding the value of the array object statement 
    statementtag.textContent = question;
    //appending tag to the div
    statementcontainer.appendChild(statementtag);
    statementdiv.appendChild(statementcontainer);


    //options multiple choices
    currentQuestion.options.forEach((valueOptionArray,indexOptionArray)=>{
        const button = document.createElement("button");
        button.classList.add("option-button");
        button.textContent = valueOptionArray;
        //function for event listener
        // button.addEventListener("click",
        statementdiv.appendChild(button);
        // })'
        button.addEventListener("click", () => {
            checkAnswer(currentQuestion, indexOptionArray);
          });
        
    });
    // statementcontainer.appendChild(statementtag);
     intervalId = setInterval(updateTimer,1000);
     

    //  response.removeEventListener('click', displayingQuizPage);
}
};

const checkAnswer = function (currentobject,selectedOptionIndex) {
    // const question = quizpage[questionIndex];
    const correctOptionIndex = currentobject.answer;

    if (selectedOptionIndex === correctOptionIndex) {
      // The answer is correct
      console.log("Correct!");
      timer +=15;
      //add time to the timere
    } else {
      // The answer is incorrect
      console.log("Incorrect!");
      timer -=15;
      //subtract time to timer
      if (timer < 0) {
        timer = 0;
      }
    }
    currentQuestionIndex++
    if (currentQuestionIndex >= quizpageContent.length) {
        // All questions have been answered, end the quiz
        endQuiz();
      } else {
        // Display the next question
        displayingQuizPage();
      }
    };



 //get total time afterwards/ update current time 
 //whether time is 0 clear interval 
 //all question have been iterated through then clear interval 



// var timer = settimeout(,1000)
const updateTimer = function(){
  
    if (timer <= 0){
        endQuiz();
        return;
    }  
    timer--;
    timerDisplay.textContent = timer;
}
const endQuiz = function(){
    console.log('timeout');
    clearInterval(intervalId);
    submitHighscore(timer);
    displayingQuizPage();

    //display high score submition and store timer to local storage with the initial
}

function submitHighscore(){
    const submitContent = document.createElement('div');
    const statement = document.createElement('p');
    statement.textContent = "Type your initials:";
    submitContent.appendChild(statement);
    statementdiv.appendChild(submitContent);
    

        const inputinitials = document.createElement('input');
        inputinitials.classList.add('input-initials');
        submitContent.appendChild(inputinitials);
      
    
//     const inputinitials = document.createElement('input');
//    submitContent.appendChild(inputinitials);   
  
   const submitbutton = document.createElement('button');
   submitbutton.textContent = "Submit Score";
    submitContent.appendChild(submitbutton);

    const handleSubmission = () => {
        const valueinitials = inputinitials.value;
        localStorage.setItem('initials', valueinitials);
        localStorage.setItem('score', timer);
        showhighscore();
        submitbutton.removeEventListener('click', handleSubmission); // Remove the event listener after submission
      };
    
      submitbutton.addEventListener('click', handleSubmission);
//    submitbutton.addEventListener('click',()=>{ 
//     const valueinitials=  inputinitials.value;
//      localStorage.setItem('initials',valueinitials);
//      localStorage.setItem('score',timer);
//     showhighscore();
//    })
}

function showhighscore(){
    const scorePageContent = document.createElement('div');
    const scoreStatement = document.createElement('p');
    scoreStatement.textContent = highScoreContent.statement;
    scorePageContent.appendChild(scoreStatement);
    statementdiv.appendChild(scorePageContent);

    const initials = localStorage.getItem('initials');
     const score = localStorage.getItem('score');

    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent= score;
    scorePageContent.appendChild(scoreDisplay);

    const finalinitialsdisplay = document.createElement('p');
    finalinitialsdisplay.textContent = initials;
   scorePageContent.appendChild(finalinitialsdisplay);    
   statementdiv.appendChild(scorePageContent);

    const restartBtn = document.createElement('button');
    const clearScoreButton = document.createElement('button');

    restartBtn.textContent = highScoreContent.options[0];
    clearScoreButton.textContent = highScoreContent.options[1];
    scorePageContent.appendChild(restartBtn);
    scorePageContent.appendChild(clearScoreButton);
    restartBtn.addEventListener('click',()=>{
        resetQuiz();
    });
    clearScoreButton.addEventListener('click',()=>{
        localStorage.clear();
     
        scorePageContent.textContent = "";
        //localStorage.removeItem('initials');
    // localStorage.removeItem('score');
    // scorePageContent.textContent = "";
    })



}

function resetQuiz() {
    currentQuestionIndex = 0;
    timer = 75;
    statementdiv.textContent = "";
    displayingQuizPage();
  }
response.addEventListener('click',displayingQuizPage);
//locALSTORAGE
//Hide css property to ea
