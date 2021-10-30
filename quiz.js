const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('nextb');
const getName = document.getElementById('get-name');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const product = document.querySelectorAll('.result');
const avocado = document.getElementById('avocado');
const watermelon = document.getElementById('watermelon'); 
const flannel = document.getElementById('flannel');
  const headline = document.getElementById('quiz-headline');
  const nameChecker = document.getElementById('name-checker');
var score = [];
const nameSpan = document.getElementsByClassName('name-insert');
const dname = document.getElementById('dname');

startButton.addEventListener('click', getDogName);

function getDogName() {
getName.classList.remove('hide');
startButton.classList.add('hide');
headline.classList.add('hide');
}

nextButton.addEventListener('click', startQuiz);

function startQuiz() {
if (dname.value == '' || dname.value == undefined) {
  dname.classList.add('shake');
  setTimeout(function() {
      dname.classList.remove('shake');
  },300)
} else {
  getName.classList.add('hide');
  //nameSpan.innerText = dname.value;
  questionContainer.classList.remove('hide');
  availableQuestions = [...questions]
  currentQuestion = 0;
  setNextQuestion();}
};

const questions = [
  {
    question: 'How old is your_dog?',
    answers: [
      { text: 'Still a puppy', product: 'avocado' },
      { text: '1-3 y.o.', product: 'watermelon' },
      { text: '3-6 y.o.', product: 'flanell' },
      { text: '6+', product: 'camo' }
    ]
  },
  {
    question: 'How big is your_dog?',
    answers: [
      { text: 'A small doggy', product: 'avocado' },
      { text: 'Medium size', product: 'watermelon' },
      { text: 'A big boy/girl', product: 'flanell' }
    ]
  },
  {
    question: 'Does your_dog like the walkies?',
    answers: [
      { text: 'Loves it!', product: 'acovado' },
      { text: 'Sometimes', product: 'watermelon' },
      { text: 'Not so much', product: 'flanell' }
    ]
  }
];

function setNextQuestion() {
  if (availableQuestions.length === 0 || currentQuestion === 3) {
    questionElement.classList.add('hide');
    showResult();
    resetState();
  } else {
    resetState();
    showQuestion(availableQuestions[currentQuestion]);
    nameReplace();
  }
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.classList.add('quiz-btn');
    const result = answer.product;
    button.setAttribute("data", result);
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  })
};

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function nameReplace() {
  const questionSentence = questionElement.innerHTML; 
  const replacement = questionSentence.replace('your_dog', dname.value);
  questionElement.innerHTML = replacement.toUpperCase();
}

function selectAnswer(e) {
  currentQuestion++;
  setNextQuestion();
  const selectedButton = e.target
  const attr = selectedButton.getAttribute('data');
  if (attr == 'avocado') {
    score.push('avocado');
    //console.log(score)
  } else if (attr == 'watermelon') {
    score.push('watermelon');
    //console.log(score)
  } else {
    score.push('flannel');
  }
}

function insertName(){
for(var i = 0; i < nameSpan.length; i++) {
  nameSpan[i].style.textTransform = 'capitalize'
  nameSpan[i].innerText = dname.value + ' '
}
}

function showResult() {
const set = new Set(score);
const duplicates = score.filter(item => {
    if (set.has(item)) {
        set.delete(item);
    } else {
        return item;
    }
});

console.log(duplicates.toString());
  const answer = duplicates.toString();
  insertName();
  if (answer === 'avocado') {
      avocado.classList.remove('hide')
  } else if (answer === 'watermelon') {
      watermelon.classList.remove('hide')
  } else {
   flannel.classList.remove('hide')
  }
}