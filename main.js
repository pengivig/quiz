const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
         "Cock Super Sucking"
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit')

let score = 0;
let questionIndex = 0;





newQuestion();

function clearPage(){
headerContainer.innerHTML = '';
listContainer.innerHTML = '';
}

function showQuestion() {
   const questionAnswers = questions[questionIndex].answers;
   const questionTitle = questions[questionIndex].question;
   let liID = 1;
   headerContainer.innerHTML = `<h2 class = "title"> ${questionTitle} </h2>`;
   questionAnswers.forEach(function (element){
      const answerHTML = `<li>
      <label>
         <input id="${liID}" type="radio" class="answer" name="answer" />
            <span>${element}</span>
      </label>
      </li>`;
      listContainer.innerHTML += answerHTML;
      liID++;
      })
}

function saveToLocalStorage(){
   localStorage.setItem('questionIndex', JSON.stringify(questionIndex))
   localStorage.setItem('score', JSON.stringify(score))
}

function newQuestion(){
   if(localStorage.getItem('questionIndex')){
      questionIndex = JSON.parse(localStorage.getItem('questionIndex'));
   }
   if(localStorage.getItem('score')){
      score = JSON.parse(localStorage.getItem('score'));
   }
   clearPage()
   showQuestion()
   submitBtn.onclick = checkAnswer;
}

function checkAnswer(){
   const checkedRadio = listContainer.querySelector('input:checked');
   if(checkedRadio === null){
      location.reload();
   } if(checkedRadio.id == questions[questionIndex].correct){
      score++
      nextQuestion();
   }
   else{
      nextQuestion();
   }
}

function nextQuestion(){
   
   if(questionIndex == questions.length - 1){
   saveToLocalStorage();
   showResult();
   } else{
      questionIndex++;
   saveToLocalStorage();
   newQuestion();
   }
}

function showResult(){
   clearPage();
   let title, message;
   
   if(score === questions.length){
      title = 'Поздравляем!',
      message = 'Вы ответили верно на все вопросы'
   } else {
      title = 'Результат',
      message = 'Верные ответы:'
   }

   headerContainer.innerHTML = `<h2 class="title">${title}</h2>
   <h3 class="summary">${message}</h3>
   <p class="result">${score} из ${questions.length}</p>`

   submitBtn.textContent = 'Начать заново';
}


function tryAgain(){
   localStorage.clear();
}

submitBtn.addEventListener('click', tryAgain);
