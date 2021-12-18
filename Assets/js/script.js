var startButton = document.querySelector("#start-btn");
var questionContainerEl = document.querySelector("#question-container");
var welcomeTextEl = document.querySelector("#info-text");
var questionEl = document.querySelector("#top-text");
var answerButtonsEl = document.querySelector("#answer-btn");

var shuffleQuestions;
var currentQuestonIndex;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    console.log("Started");
    startButton.className = "hidden";
    welcomeTextEl.className = "hidden";
    shuffleQuestions = questions.sort(function() {
        Math.random() - .5
    });
    currentQuestonIndex = 0;
    questionContainerEl.classList.remove ("hidden");
    nextQuestion();
};

function nextQuestion() {
    showQuestion(shuffleQuestions[currentQuestonIndex]);
};

function showQuestion(question) {
    questionEl.textContent = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.textContent = answer.text;
        button.className = "btn";
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    })
};

function chooseAnswer() {

};

var questions = [
    {
        question: "Commonly used data types do NOT include...",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    }
]