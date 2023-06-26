//Selecting elements
const topbar = document.querySelector(".topbar");
const viewHighScoresDiv = document.querySelector(".viewhighscores");
const timerDisplay = document.querySelector(".timerclock");
const statementDiv = document.querySelector(".quiz_question");
const timerstamp = document.querySelector(".timer");
const response = document.querySelector(".answer");
const startquizDiv = document.querySelector(".statement_question");
const highScoresDiv = document.querySelector(".highScores");
const scoresHigh = document.querySelector(".displayscores");
//time intervals 75 15 seconds sub if wrong 15 seconds add if right

//Array of objects with key value the statememt number 2  statement and multiple choice
const quizPageContent = [
  {
    statement: "How do you stop a timed interval?",
    options: ["stop", "button", "clear timeout", "clear"],
    answer: 2,
  },
  {
    statement: "What does acronym DOM stand for?",
    options: ["Day on Mars", "IDk", "MOD", "Document Object Model"],
    answer: 3,
  },
  {
    statement: "How are arrays stored?",
    options: ["[]", "{}", "||", "&&"],
    answer: 0,
  },
  {
    statement: "What are class selectors?",
    options: [
      "[]",
      "a css form of obtaining a class within the html document in order to manipulate the css style of the element",
      "||",
      "&&",
    ],
    answer: 1,
  },
  {
    statement: "Where do you link a script tag within an html page?",
    options: ["head and or body", "body", "head", "all of the above"],
    answer: 3,
  },
];

const highScoreContent = {
  statement: "High Score",
  options: ["Restart Quiz", "clear high score"],
};

//set interval

//
let timer = 75;
let currentQuestionIndex = 0;
let intervalId;
//where closure and parameter should enclose the timer
const startquiz = function () {
  displayingQuizPage;
  intervalId = setInterval(updateTimer, 1000);
};
//function that will create elements for each value of the array of object quizpage
const displayingQuizPage = function () {
  statementDiv.innerHTML = "";
  console.log(currentQuestionIndex);

  //setting the set of question to 0 as a variable
  const currentQuestion = quizPageContent[currentQuestionIndex];
  //   console.log(currentQuestion);
  //creating div and a heading element adding a class and appending the statement to the elements
  const question = currentQuestion.statement;
  console.log(question);
  //create parent to store the statement/question
  const statementContainer = document.createElement("div");
  statementContainer.classList.add("questionStatementDiv");
  //create element to store the question value
  const statementTag = document.createElement("h1");
  //adding class to the question tag
  statementTag.classList.add("question");
  //adding the value of the array object statement
  statementTag.textContent = question;
  //appending tag to the div
  statementContainer.appendChild(statementTag);

  //options multiple choices
  currentQuestion.options.forEach((valueOptionArray, indexOptionArray) => {
    const button = document.createElement("button");
    statementContainer.appendChild(button);
    statementDiv.appendChild(statementContainer);
    button.classList.add("option-button");
    const indexStartingAtOne = indexOptionArray + 1; // Increment index by 1
    button.textContent = indexStartingAtOne + ". " + valueOptionArray;
    button.addEventListener("click", () => {
      checkAnswer(currentQuestion, indexOptionArray);
    });
  });
};
const checkAnswer = function (currentobject, selectedOptionIndex) {
  const correctOptionIndex = currentobject.answer;

  if (timer <= 0) {
    endQuiz(timer);
    return;
  }

  if (selectedOptionIndex === correctOptionIndex) {
    const correct = document.createElement("p");
    correct.classList.add("selectedAnswer");
    correct.textContent = "Correct!";
    statementDiv.appendChild(correct);
    console.log("Correct!");
    timer += 15; // Adding time when the answer is correct.
  }
  // Only subtract time if the answer is wrong and it's not the last question.
  else {
    const incorrect = document.createElement("p");
    incorrect.classList.add("selectedAnswer");
    incorrect.textContent = "Incorrect!";
    statementDiv.appendChild(incorrect);
    console.log("Incorrect!");
    if (currentQuestionIndex < quizPageContent.length - 1) {
      timer -= 15;
    }
    // Subtracting time when the answer is incorrect.
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizPageContent.length) {
    setTimeout(() => {
      // Clear previous correct/incorrect messages
      statementDiv.innerHTML = "";
      // Show the next question
      displayingQuizPage();
    }, 1000);
  }
};

const updateTimer = function () {
  if (timer <= 0 || currentQuestionIndex === quizPageContent.length) {
    // timer = 0;
    timerstamp.textContent = timer;
    endQuiz(timerstamp);
    return;
  } else {
    timer--;
    timerstamp.textContent = timer;
  }
};
const endQuiz = function (timerDisplay) {
  // console.log ('timeout');
  //makes code run indefinetly

  clearInterval(intervalId);
  //   displayingQuizPage ();
  submitHighscore(timerDisplay);
  //display high score submition and store timer to local storage with the initial
};

function submitHighscore() {
  //div and p within quizquestion div to none
  // statementContatiner.style.display="none";
  if (statementDiv.children[0]) statementDiv.children[0].style.display = "none";
  if (statementDiv.children[1]) statementDiv.children[1].style.display = "none";
  const submitContent = document.createElement("div");
  const statement = document.createElement("h1");
  statement.classList.add("titleInitial");
  statement.textContent = "Type your initials:";
  submitContent.appendChild(statement);
  statementDiv.appendChild(submitContent);

  const inputinitials = document.createElement("input");
  inputinitials.classList.add("input-initials");
  submitContent.appendChild(inputinitials);

  //     const inputinitials = document.createElement('input');
  //    submitContent.appendChild(inputinitials);

  const submitbutton = document.createElement("button");
  submitbutton.classList.add("subitHighScorebtn");
  submitbutton.textContent = "Submit Score";
  submitContent.appendChild(submitbutton);
  function addNewHighScore(name, score) {
    // Fetch existing scores from local storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log("storedValues", highScores);
    // Create new score object
    let newScore = { name, score };

    // Add new score to high scores array
    highScores.push(newScore);

    // Store updated high scores back in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  const handleSubmission = () => {
    //name
    const valueinitials = inputinitials.value;
    addNewHighScore(valueinitials, timer);
    statementDiv.innerHTML = "";
    showhighscore();
    submitbutton.removeEventListener("click", handleSubmission); // Remove the event listener after submission
  };

  submitbutton.addEventListener("click", handleSubmission);
}

function showhighscore() {
  scoresHigh.innerHTML = "";
  const scorePageContent = document.createElement("div");
  scorePageContent.classList.add("pageContent");
  const scoreStatement = document.createElement("h1");
  scoreStatement.textContent = highScoreContent.statement;
  console.log(highScoreContent.statement);
  scorePageContent.appendChild(scoreStatement);

  // const scoreNameContent = document.createElement("div");
  const storeBtnDiv = document.createElement("div");
  storeBtnDiv.classList.add("btndiv");

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restartbtn");
  const clearScoreButton = document.createElement("button");
  clearScoreButton.classList.add("clearbtn");

  restartBtn.textContent = highScoreContent.options[0];
  clearScoreButton.textContent = highScoreContent.options[1];

  storeBtnDiv.appendChild(restartBtn);
  storeBtnDiv.appendChild(clearScoreButton);
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  if (highScores.length > 0) {
    //for loop through all elements
    highScores.forEach((scoreObj, indexOptionArray) => {
      const name = scoreObj.name;
      const score = scoreObj.score;
      const displayScores = name + " - " + score;
      console.log(displayScores);
      const divScores = document.createElement("div");
      divScores.classList.add("divScores");
      const containerScores = document.createElement("p");
      containerScores.classList.add("containerScore");
      const indexStartingAtOne = indexOptionArray + 1; // Increment index by 1
      containerScores.textContent = indexStartingAtOne + ". " + displayScores;
      divScores.appendChild(containerScores);
      scorePageContent.appendChild(divScores);
    });

    restartBtn.addEventListener("click", () => {
      resetQuiz();
    });
    clearScoreButton.addEventListener("click", () => {
      localStorage.clear();

      // scoreNaxmeContent.textContent = "";
    });
    scorePageContent.appendChild(storeBtnDiv);
    scoresHigh.appendChild(scorePageContent);
    statementDiv.appendChild(scoresHigh);
  }
}

function resetQuiz() {
  startquizDiv.style.display = "block";
  scoresHigh.innerHTML = ""; // Clear the high scores
  scoresHigh.style.display = "none"; // Hide the high scores
  // statementDiv.style.display = "none";
  timer = 75;
  currentQuestionIndex = 0;
}
response.addEventListener("click", () => {
  startquizDiv.style.display = "none";
  // scoresHigh.style.display = "none";
  displayingQuizPage();
  intervalId = setInterval(updateTimer, 1000);
});

function displayStoredScores() {
  if (highScoresDiv.style.display === "none") {
    highScoresDiv.style.display = "block";
    startquizDiv.style.display = "none";
    //get local stored items
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    //for each item create a p tag for values to be stored in
    //if highscores more than one then
    if (highScores.length > 0) {
      //for loop through all elements
      highScores.forEach((scoreObj, indexOptionArray) => {
        const name = scoreObj.name;
        const score = scoreObj.score;
        const displayScores = name + " - " + score;
        console.log(displayScores);
        const divScores = document.createElement("div");
        divScores.classList.add("divScores");
        const containerScores = document.createElement("p");
        containerScores.classList.add("containerScore");
        const indexStartingAtOne = indexOptionArray + 1; // Increment index by 1
        containerScores.textContent = indexStartingAtOne + ". " + displayScores;
        // const highScoreName = document.createElement("p");
        // highScoreName.classList.add("nameStored");
        // highScoreName.textContent = name;
        // const highScoreValue = document.createElement("p");
        // highScoreValue.classList.add("timeScore");
        // highScoreValue.textContent = score;
        divScores.appendChild(containerScores);
        // divScores.appendChild(highScoreName);
        // divScores.appendChild(highScoreValue);
        highScoresDiv.appendChild(divScores);
      });
    }
  } else {
    startquizDiv.style.display = "";
    highScoresDiv.style.display = "none";
  }
}
viewHighScoresDiv.addEventListener("click", displayStoredScores);
