const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Elephant", correct: false},
            {text: "Blue-whale", correct: true},
            {text: "Giraffe", correct: false},
        ]
    },

    {
        question: "Which is the largest continent in world?",
        answers: [
            {text: "Austlia", correct: false},
            {text: "North-America", correct: false},
            {text: "South-America", correct: false},
            {text: "Asia", correct: true},
        ]
    },

    {
        question: "Which indian captain won the odi world-cup in year 2011?",
        answers: [
            {text: "Ms-Dhoni", correct: true},
            {text: "Rahul Dravid", correct: false},
            {text: "Virat Kholi", correct: false},
            {text: "Anil Kumla", correct: false},
        ]
    },

    {
        question: "who is called 'Bapu' of india?",
        answers: [
            {text: "Subhas Chandra Bose", correct: false},
            {text: "Mahatma Gandhi", correct: true},
            {text: "Indra Gandhi", correct: false},
            {text: "Jawaharlal Nahru", correct: false},
        ]
    }  
    
];

const questionBtn = document.getElementById("question");
const answerBtn = document.getElementById("answerBtn");
const nextBtn =  document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionBtn.innerHTML = questionNo + "." +  currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e) {
   const selectedBtn = e.target;
   const iscorrect = selectedBtn.dataset.correct === "true";
   if(iscorrect){
    selectedBtn.classList.add("correct");
    score++;
   }else {
    selectedBtn.classList.add("incorrect");
   }
   Array.from(answerBtn.children).forEach(button => {
     if(button.dataset.correct === "true"){
        button.classList.add("correct");
     }
     button.disabled = true;
   });
   nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionBtn.innerHTML = `your scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore();
    }
}


nextBtn.addEventListener('click', ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
      startQuiz();
  }

});

startQuiz();