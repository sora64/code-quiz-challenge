// global constants used throughout the code that won't change
const quizMainEL = document.getElementById('quiz-main');
const timerEl = document.getElementById('timer');
const startButtonEl = document.getElementById('start-btn');
const topTextEl = document.getElementById('top-text');
const welcomeTextEl = document.getElementById('welcome-text');
const questionContainerEl = document.getElementById('question-container');
const answerGridEl = document.getElementById('answer-grid');
const answerOne = document.getElementById('choice-one');
const answerTwo = document.getElementById('choice-two');
const answerThree = document.getElementById('choice-three');
const answerFour = document.getElementById('choice-four');
const resultsEl = document.getElementById('results');
const answerButtonsEl = document.querySelectorAll('.answer-btn');
const scoreContainerEL = document.getElementById('score-container');
const scoreValueEl = document.getElementById('score-value');
const inputFormEl = document.getElementById('input-form');
const initialLabelEl = document.getElementById('initial-label');
const inputValueEl = document.getElementById('initials');
const initialValueEl = document.querySelector('.initials-value');
const submitButtonEl = document.getElementById('submit-btn');
const highScoreEl = document.getElementById('high-score-container');
const restartButtonEl = document.getElementById('restart-btn');
const clearHighScoresButtonEl = document.getElementById('clear-high-scores-btn');

// global variables used throughout the code that may change in value
let questionIndex = 0;
let timeLeft = 75;
let score = [];
let username = [];

// event listeners for different buttons on the page
startButtonEl.addEventListener('click', startQuiz);
answerOne.addEventListener('click', handleAnswer);
answerTwo.addEventListener('click', handleAnswer);
answerThree.addEventListener('click', handleAnswer);
answerFour.addEventListener('click', handleAnswer);
submitButtonEl.addEventListener('click', submit);
restartButtonEl.addEventListener('click', restart);
clearHighScoresButtonEl.addEventListener('click', clearHighScores);

// function that counts down from 75 once the start button is clicked
function timer() {
    let timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            alert("You're out of time! Please try again.");
            localStorage.setItem("score", JSON.stringify(0));
            clearInterval(timeInterval);
            initialsPage();
        }
    }, 1000);
}

// goes to the first question of the quiz when the start button is pressed
function startQuiz() {
    timer();
    welcomeTextEl.classList.add('hidden');
    startButtonEl.classList.add('hidden');
    showQuestion();
    nextQuestion();
}

// displays the question container on the page
function showQuestion() {
    questionContainerEl.classList.remove('hidden');
}

// goes to the next question based on the current question's index
function nextQuestion() {
    if (questionIndex >= questions.length) {
        localStorage.setItem('score', JSON.stringify(timerEl.textContent));
        initialsPage();
    } else {
        for (var i = 0; i < answerButtonsEl.length; i++) {
            answerButtonsEl[i].textContent = questions[questionIndex].answers[i].text;
            answerButtonsEl[i].dataset.correct = questions[questionIndex].answers[i].correct;
        }
        topTextEl.textContent = questions[questionIndex].question;
        
        questionIndex++;
    }
}

// tells the page what to do in the event that the user selects the correct answer for a question or not
function handleAnswer(event) {
    let correct = event.target.dataset.correct;
    if (correct === "true") {
        nextQuestion();
    } else {
        timeLeft -= 10;
        alert("Wrong!");
    }
}


// function for the element wherein a user will input their initials
function initialsPage() {
    resultsEl.style.display = "flex";
    scoreContainerEL.classList.add('hidden');
    topTextEl.textContent = "Add Your Initals Below";
    // timerEl.classList.add('hidden');
    questionContainerEl.classList.add('hidden');
    highScoreEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    getScore();
}

// gets the score (remaining time) from local storage and then displays it on the page
function getScore() {
    let savedScore = localStorage.getItem('score');
    if(!savedScore) {
        return false;
    }
    console.log("Saved score found!")
    
    savedScore = JSON.parse(savedScore);
    
    score.push(savedScore);

    for (var i = 0; i < score.length; i++) {
        scoreValueEl.textContent = score[i];
    }
}

// defines that happens when the submit button in the intials element is clicked
function submit(event) {
    event.preventDefault();
    setInputValue();
}

// saves user-input initals onto the client's local storage
function setInputValue() {
    localStorage.setItem('user', JSON.stringify(inputValueEl.value));
    getInputValue();
}

// retrieves user-input intiials form local storage
function getInputValue() {
    let savedName = localStorage.getItem('user');
    
    console.log("Saved name found!")

    savedName = JSON.parse(savedName);

    username.push(savedName);

    for (var i = 0; i < username.length; i++) {
        initialValueEl.textContent = username[i];
    }

    highScorePage();
}

// displays the user's initials alongside their score on the quiz
function highScorePage() {
    inputFormEl.classList.add('hidden');
    initialLabelEl.classList.add('hidden');
    inputValueEl.classList.add('hidden');
    submitButtonEl.classList.add('hidden');
    highScoreEl.classList.remove('hidden');
    restartButtonEl.classList.remove('hidden');
    clearHighScoresButtonEl.classList.remove('hidden');
    topTextEl.textContent = 'Score';
}

// reloads the page when the restart button is clicked
function restart() {
    location.reload();
}

// clears local storage when the clear scores button is clicked
function clearHighScores() {
    localStorage.clear();
    clearHighScoresButtonEl.classList.add('hidden');
    topTextEl.textContent = "So long!";
    resultsEl.textContent = '';
}

// constant variable containing the quiz's questions and available answers
const questions = [
    {
        question: "Commonly used data types do NOT include...",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    },
    
    {
        question: "The condition in an if/else statement is enclosed within...",
        answers: [
            { text: "quotes", correct: false },
            { text: "parentheses", correct: true },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false }
        ]
    },

    {
        question: "Arrays in JavaScript can be used to store...",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of these", correct: true }
        ]
    },

    {
        question: "Within what must string values be enclosed when being assigned to variables?",
        answers: [
            { text: "commas", correct: false },
            { text: "quotes", correct: true },
            { text: "curly brackets", correct: false },
            { text: "parentheses", correct: false }
        ]
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is...",
        answers: [
            { text: "console.log", correct: true },
            { text: "terminal/bash", correct: false },
            { text: "JavaScript", correct: false },
            { text: "for loops", correct: false }
        ]
    }
];