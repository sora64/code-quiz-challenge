var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var questionContainerEl = document.querySelector("#question-container");
var welcomeTextEl = document.querySelector("#info-text");
var questionEl = document.querySelector("#top-text");
var answerButtonsEl = document.querySelector("#answer-btn");

var shuffleQuestions;
var currentQuestonIndex;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestonIndex++;
    nextQuestion();
});

function startQuiz() {
    startButton.className = "hidden";
    welcomeTextEl.className = "hidden";
    shuffleQuestions = questions.sort(() => Math.random() - .5);
    currentQuestonIndex = 0;
    questionContainerEl.classList.remove ("hidden");
    nextQuestion();
};

function nextQuestion() {
    resetChoices()
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
        button.addEventListener("click", chooseAnswer);
        answerButtonsEl.appendChild(button);
    })
};

function resetChoices() {
    clearStatusClass(document.body);
    nextButton.className = "hidden";
    while(answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

function chooseAnswer(event) {
    var userChoice = event.target;
    var correct = userChoice.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.corect)
    })
    if (shuffleQuestions.length > currentQuestonIndex + 1) {
        nextButton.classList.remove("hidden");
    } else {
        startButton.textContent = "Restart";
        startButton.classList.remove("hidden");
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.className = "correct";
    } else {
        element.className = "wrong";
    }
};

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

var questions = [
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
            { text: "curly brackets", correct: false },
            { text: "parentheses", correct: true },
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
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: false },
            { text: "parentheses", correct: true }
        ]
    },

    {
        question: "A very useful tool used during development and debugin for printing content to the debugger is...",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true }
        ]
    }
];