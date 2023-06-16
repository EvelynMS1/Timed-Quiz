//Selecting elements
const topbar = document.getElementsByClassName ('.topbar');
const highscores = document.getElementsByClassName ('.viewhighscores');
const timerDisplay = document.querySelector ('.timerclock');
const statementDiv = document.querySelector ('.quiz_question');
const response = document.querySelector ('.answer');

//time intervals 75 15 seconds sub if wrong 15 seconds add if right
//set interval one time
//set timeout repeatedly on set time
//clear interval will top the time

//Array of objects with key value the statememt number 2  statement and multiple choice
const quizPageContent = [
  {
    statement: 'How do you stop a timed interval',
    options: ['stop', 'button', 'clear timeout', 'clear'],
    answer: 2,
  },
  {
    statement: 'What does DOM stand for',
    options: ['Day on Mars', 'IDk', 'MOD', 'Document Object Model'],
    answer: 3,
  },
  {
    statement: 'How are arrays stored',
    options: ['[]', '{}', '||', '&&'],
    answer: 0,
  },
  {
    statement: 'What are class selectors',
    options: [
      '[]',
      'a css form of obtaining a class within the html document in order to manipulate the css style of the element',
      '||',
      '&&',
    ],
    answer: 1,
  },
  {
    statement: 'Where do you link a script tagin html',
    options: ['head and or body', 'body', 'head', 'all of the above'],
    answer: 3,
  },
];

const highScoreContent = {
  statement: 'High Score',
  options: ['Restart Quiz', 'clear high score'],
};

//set interval

//
let timer = 75;
let currentQuestionIndex = 0;
let intervalId;
//where closure and parameter should enclose the timer

//function that will create elements for each value of the array of object quizpage
const displayingQuizPage = function () {
    statementDiv.innerHTML='';
  console.log (currentQuestionIndex);

  //setting the set of question to 0 as a variable
  const currentQuestion = quizPageContent[currentQuestionIndex];
  if (!currentQuestion) {
    console.log('No more questions!');
    submitHighscore();
    return; // or handle this case in some other way
  }
//   console.log(currentQuestion);
  //creating div and a heading element adding a class and appending the statement to the elements
  const question = currentQuestion.statement;
  console.log(question);
  //create parent to store the statement/question
  const statementContainer = document.createElement ('div');
  //create element to store the question value
  const statementTag = document.createElement ('h3');
  //adding class to the question tag
  statementTag.classList.add ('question');
  //adding the value of the array object statement
  statementTag.textContent = question;
  //appending tag to the div
  statementContainer.appendChild (statementTag);
   

  //options multiple choices
  currentQuestion.options.forEach ((valueOptionArray, indexOptionArray) => {
    const button = document.createElement ('button'); 
     statementContainer.appendChild (button); 
     statementDiv.appendChild (statementContainer); 
    button.classList.add ('option-button');
    button.textContent = valueOptionArray;
    //function for event listener
    // button.addEventListener("click", 
   
    // })'
   
    button.addEventListener ('click', () => {
      checkAnswer (currentQuestion, indexOptionArray);
   
      //reset page
    }); 
  
  
  });
  // statementcontainer.appendChild(statementtag);
  intervalId = setInterval (updateTimer(), 1000);

  //  response.removeEventListener('click', displayingQuizPage);
};

const checkAnswer = function (currentobject, selectedOptionIndex) {
  // const question = quizpage[questionIndex];
  const correctOptionIndex = currentobject.answer;

  if (selectedOptionIndex === correctOptionIndex) {
    // The answer is correct
    console.log ('Correct!');
    timer += 15;
    // updateTimer();
    //add time to the timere
  } else {
    // The answer is incorrect
    console.log ('Incorrect!');
    timer -= 15;
    // updateTimer();
    //subtract time to timer
    if (timer < 0) {
      timer = 0;
      endQuiz();
    }
  }
  currentQuestionIndex++;   
  displayingQuizPage ();
  console.log (currentQuestionIndex);
};

// var timer = settimeout(,1000)
const updateTimer = function () {
  if (timer <= 0) {
    endQuiz ();
    return;
  }
  timer--;
  timerDisplay.textContent = timer;
};
const endQuiz = function () {
  console.log ('timeout');

  submitHighscore (timerDisplay); 
   clearInterval (intervalId);
//   displayingQuizPage ();

  //display high score submition and store timer to local storage with the initial
};

function submitHighscore () {
  const submitContent = document.createElement ('div');
  const statement = document.createElement ('p');
  statement.textContent = 'Type your initials:';
  submitContent.appendChild (statement);
  statementDiv.appendChild (submitContent);

  const inputinitials = document.createElement ('input');
  inputinitials.classList.add ('input-initials');
  submitContent.appendChild (inputinitials);

  //     const inputinitials = document.createElement('input');
  //    submitContent.appendChild(inputinitials);

  const submitbutton = document.createElement ('button');
  submitbutton.textContent = 'Submit Score';
  submitContent.appendChild (submitbutton);

  const handleSubmission = () => {
    const valueinitials = inputinitials.value;
    localStorage.setItem ('initials', valueinitials);
    localStorage.setItem ('score', timer);
    statementDiv.innerHTML='';
    showhighscore ();
    submitbutton.removeEventListener ('click', handleSubmission); // Remove the event listener after submission
  };

  submitbutton.addEventListener ('click', handleSubmission);
}

function showhighscore () {
  const scorePageContent = document.createElement ('div');
  const scoreStatement = document.createElement ('p');
  scoreStatement.textContent = highScoreContent.statement;
  scorePageContent.appendChild (scoreStatement);
  statementDiv.appendChild (scorePageContent);

  const initials = localStorage.getItem ('initials');
  const score = localStorage.getItem ('score');

  const scoreDisplay = document.createElement ('p');
  scoreDisplay.textContent = score;
  scorePageContent.appendChild (scoreDisplay);

  const finalinitialsdisplay = document.createElement ('p');
  finalinitialsdisplay.textContent = initials;
  scorePageContent.appendChild (finalinitialsdisplay);
  statementDiv.appendChild (scorePageContent);

  const restartBtn = document.createElement ('button');
  const clearScoreButton = document.createElement ('button');

  restartBtn.textContent = highScoreContent.options[0];
  clearScoreButton.textContent = highScoreContent.options[1];
  scorePageContent.appendChild (restartBtn);
  scorePageContent.appendChild (clearScoreButton);
  restartBtn.addEventListener ('click', () => {
    statementDiv.innerHTML='';
    resetQuiz ();
  });
  clearScoreButton.addEventListener ('click', () => {
    localStorage.clear ();

    scorePageContent.textContent = '';
  });
}

function resetQuiz () {
  currentQuestionIndex = 0;
  timer = 75;
//   statementDiv.textContent = '';

}
response.addEventListener ('click', displayingQuizPage);

//locALSTORAGE
//Hide css property to ea
