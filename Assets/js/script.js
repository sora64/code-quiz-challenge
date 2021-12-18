
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
const answerButtons = document.querySelectorAll(".answer-btn");
let questionIndex = 0;

startButtonEl.addEventListener('click', startQuiz);
answerOne.addEventListener('click', handleAnswer);
answerTwo.addEventListener('click', handleAnswer);
answerThree.addEventListener('click', handleAnswer);
answerFour.addEventListener('click', handleAnswer);


function startQuiz() {
    welcomeTextEl.classList.add('hidden');
    startButtonEl.classList.add('hidden');
    showQuestion();
    question();
}

function showQuestion() {
    questionContainerEl.classList.remove('hidden');
}

function question() {
    if (questionIndex >= questions.length) {
        resultsPage();
    } else {
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = questions[questionIndex].answers[i].text;
        answerButtons[i].dataset.correct = questions[questionIndex].answers[i].correct;
    }
    topTextEl.textContent = questions[questionIndex].question;
    
    // answerTwo.textContent = questions[questionIndex].answers[1].text;
    // answerTwo.dataset.correct = questions[questionIndex].answers[1].correct;
    // answerThree.textContent = questions[questionIndex].answers[2].text;
    // answerThree.dataset.correct = questions[questionIndex].answers[2].correct;
    // answerFour.textContent = questions[questionIndex].answers[3].text;
    // answerFour.dataset.correct = questions[questionIndex].answers[3].correct;
    questionIndex++;
    }
}

function handleAnswer(event) {
    let correct = event.target.dataset.correct;
    if (correct === "true") {
        question();
    } else {
        alert("false");
        question();
    }
}

// function questionTwo() {
//     topTextEl.textContent = questions[1].question;
//     questionContainerEl.classList.remove('hidden');
//     answerOne.textContent = questions[1].answers[0].text;
//     answerTwo.textContent = questions[1].answers[1].text;
//     answerThree.textContent = questions[1].answers[2].text;
//     answerFour.textContent = questions[1].answers[3].text;
//     answerTwo.addEventListener('click', questionThree);
// }

// function questionThree() {
//     topTextEl.textContent = questions[2].question;
//     questionContainerEl.classList.remove('hidden');
//     answerOne.textContent = questions[2].answers[0].text;
//     answerTwo.textContent = questions[2].answers[1].text;
//     answerThree.textContent = questions[2].answers[2].text;
//     answerFour.textContent = questions[2].answers[3].text;
//     answerFour.addEventListener('click', questionFour);
// }

// function questionFour() {
//     topTextEl.textContent = questions[3].question;
//     questionContainerEl.classList.remove('hidden');
//     answerOne.textContent = questions[3].answers[0].text;
//     answerTwo.textContent = questions[3].answers[1].text;
//     answerThree.textContent = questions[3].answers[2].text;
//     answerFour.textContent = questions[3].answers[3].text;
//     answerTwo.addEventListener('click', questionFive);
// }

// function questionFive() {
//     topTextEl.textContent = questions[4].question;
//     questionContainerEl.classList.remove('hidden');
//     answerOne.textContent = questions[4].answers[0].text;
//     answerTwo.textContent = questions[4].answers[1].text;
//     answerThree.textContent = questions[4].answers[2].text;
//     answerFour.textContent = questions[4].answers[3].text;
//     answerOne.addEventListener('click', resultsPage);
// }

function resultsPage() {
    topTextEl.textContent = "Add Your Initals Below";
    questionContainerEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
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