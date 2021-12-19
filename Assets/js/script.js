
const viewHighScoresEL = document.getElementById('hs-link');
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
const scoreValueEl = document.getElementById('score-value');
const inputFormEl = document.getElementById('input-form');
const inputValueEl = document.getElementById('initials');
const initialValueEl = document.querySelector('.initials-value');
const submitButtonEl = document.getElementById('submit-btn');
const highScoreEl = document.getElementById('high-score-container');
const restartButtonEl = document.getElementById('restart-btn');
const clearHighScoresButtonEl = document.getElementById('clear-high-scores-btn');

let questionIndex = 0;
let timeLeft = 75;
let score = [];
let username = [];

// viewHighScoresEL.addEventListener('click', getInputValue);
startButtonEl.addEventListener('click', startQuiz);
answerOne.addEventListener('click', handleAnswer);
answerTwo.addEventListener('click', handleAnswer);
answerThree.addEventListener('click', handleAnswer);
answerFour.addEventListener('click', handleAnswer);
submitButtonEl.addEventListener('click', submit);
restartButtonEl.addEventListener('click', restart);
clearHighScoresButtonEl.addEventListener('click', clearHighScores);

function timer() {
    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            timerEl.textContent = "0";
            clearInterval(timeInterval);
            initialsPage();
        };
    }, 1000);
}

function startQuiz() {
    timer();
    welcomeTextEl.classList.add('hidden');
    startButtonEl.classList.add('hidden');
    showQuestion();
    nextQuestion();
}

function showQuestion() {
    questionContainerEl.classList.remove('hidden');
}

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

function handleAnswer(event) {
    let correct = event.target.dataset.correct;
    if (correct === "true") {
        nextQuestion();
    } else {
        timeLeft -= 10;
        alert("Wrong!");
    }
}

function initialsPage() {
    resultsEl.style.display = "flex";
    topTextEl.textContent = "Add Your Initals Below";
    timerEl.classList.add('hidden');
    timeLeft = undefined;
    questionContainerEl.classList.add('hidden');
    highScoreEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    getScore();
}

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

function submit(event) {
    event.preventDefault();
    setInputValue();
}

function setInputValue() {
    localStorage.setItem('user', JSON.stringify(inputValueEl.value));
    getInputValue();
}

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

function highScorePage() {
    inputFormEl.classList.add('hidden');
    welcomeTextEl.classList.add('hidden');
    highScoreEl.classList.remove('hidden');
    restartButtonEl.classList.remove('hidden');
    clearHighScoresButtonEl.classList.remove('hidden');
    topTextEl.textContent = 'Scores';
}

function restart() {
    location.reload();
}

function clearHighScores() {
    localStorage.clear();
    clearHighScoresButtonEl.classList.add('hidden');
    topTextEl.textContent = "So long!";
    resultsEl.textContent = '';
}

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
            { text: "all of the above", correct: true }
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
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false }
        ]
    }
];