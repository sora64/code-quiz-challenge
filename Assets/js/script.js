
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
const scoreValueEl = document.getElementById('score-value')

let questionIndex = 0;
let score = [];

startButtonEl.addEventListener('click', startQuiz);
answerOne.addEventListener('click', handleAnswer);
answerTwo.addEventListener('click', handleAnswer);
answerThree.addEventListener('click', handleAnswer);
answerFour.addEventListener('click', handleAnswer);

function timer() {
    let timeLeft = 75;

    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Timer: 0";
            clearInterval(timeInterval);
            if(confirm("You ran out of time! Would you like to try again?") == true) {
                location.reload();
            } else {
                initialsPage();
            }
        };
    }, 750)
}

function startQuiz() {
    welcomeTextEl.classList.add('hidden');
    startButtonEl.classList.add('hidden');
    showQuestion();
    timer();
    nextQuestion();
}

function showQuestion() {
    questionContainerEl.classList.remove('hidden');
}

function nextQuestion() {
    if (questionIndex >= questions.length) {
        initialsPage();
        localStorage.setItem('score', JSON.stringify(timerEl.innerText));
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
        alert("false");
        nextQuestion();
    }
}

function initialsPage() {
    topTextEl.textContent = "Add Your Initals Below";
    questionContainerEl.classList.add('hidden');
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

    scoreValueEl.textContent = score[0];
    
    console.dir(score[0]);
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
        question: "A very useful tool used during development and debugin for printing content to the debugger is...",
        answers: [
            { text: "console.log", correct: true },
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false }
        ]
    }
];