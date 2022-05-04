// all answer options 
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

//all our options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuastion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-off-all-questions');

let indexOfQuestion=0, //index of current question
    indexOfPage = 0; //index of page

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score=0; // final quiz result

const quizOverModal = document.querySelector('.quiz-over-modal'),
      correctAnswer = document.getElementById('correct-answer'), //total score in quiz-over modal window
      numberOfAllQuestions2 = document.getElementById('number-off-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');


const questions = [
      {
            question: 'Как в JavaScript вычислить процент от числа?', 
            options: [
                  'Так в JavaScript нельзя делать',
                  'Оператор: %',
                  'Умножить на кол-во процентов и разделить на 100',
                  'Вызвать метод findPercent()',
            ],
            rightAnswer: 2
      },

      {
            question: 'Результат выражения "13" + 7', 
            options: [
                  '20',
                  'error',
                  '137',
                  'undefined',
            ],
            rightAnswer: 2
      }, 

      {
            question: 'На JavaScript нельзя писать', 
            options: [
                  'Игры',
                  'Мобильные приложения',
                  'Плохо',
                  'Скрипты для сайтов',
            ],
            rightAnswer: 2
      }
];

numberOfAllQuestions.innerHTML = questions.length; //number of all questions

const load = () => {
      question.innerHTML = questions[indexOfQuestion].question;

      option1.innerHTML = questions[indexOfQuestion].options[0];
      option2.innerHTML = questions[indexOfQuestion].options[1];
      option3.innerHTML = questions[indexOfQuestion].options[2];
      option4.innerHTML = questions[indexOfQuestion].options[3];

      numberOfQuastion.innerHTML = indexOfPage + 1;
      indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
      let randomNumber = Math.floor(Math.random() * questions.length); 

      let hitDuplicate = false;

      if(indexOfPage ==questions.length) {
            quizOver();
      }
      else {
            if(completedAnswers.length>0){
                  completedAnswers.forEach(item => {
                        if(item==randomNumber) { // проверка на повторение вопроса 
                              hitDuplicate=true;
                        }
                  });
                  if(hitDuplicate)
                  {
                        randomQuestion(); // если вопрос повторяется, то заново запускаем рандомный выбор вопроса
                  }
                  else {
                        indexOfQuestion=randomNumber;
                        load();
                  }
            };
            if(completedAnswers.length==0)
            {
                  indexOfQuestion=randomNumber;
                  load();
            }
      };

      completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => { // проверяем ответ на корректность 
      console.log(el.target.dataset.id);
      if(el.target.dataset.id==questions[indexOfQuestion].rightAnswer) {
            el.target.classList.add('correct');
            updateAnswerTracker('correct');
            score++;
      }
      else {
            el.target.classList.add('wrong');
            updateAnswerTracker('wrong');
      }

      disabledOptions();
};


const disabledOptions = () => {  // после выбора одного option нельзя выбирать другие
      optionElements.forEach(item => {
            item.classList.add('disabled');
            if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
                  item.classList.add('correct');
            }
      })
};

const enableOptions = () => {  //обнуляем css классы для options когда переходим на следующую страницу 
      optionElements.forEach(item => {
            item.classList.remove('correct', 'wrong', 'disabled');
      })
};

const answerTracker = () => { //создаем трекер
      questions.forEach(() => {
            const div = document.createElement('div');
            answersTracker.appendChild(div);
      })
};

const updateAnswerTracker = status => { //реакция трекера на правильный/неправильный ответ
      answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate = () => {
      if(!optionElements[0].classList.contains('disabled')) {
            alert('Вам нужно выбрать вариант ответа');
      }
      else 
      {
            randomQuestion();
            enableOptions();
      }
};

btnNext.addEventListener('click', validate);

for(option of optionElements) {
      option.addEventListener('click', e => checkAnswer(e))
}

const quizOver = () => {
      console.log('quiz is over');
      quizOverModal.classList.add('active');
      correctAnswer.innerHTML = score;
      numberOfAllQuestions2.innerHTML=questions.length;
      hideQuestions();
}

const tryAgain = () => {
      window.location.reload();
}
btnTryAgain.addEventListener('click', tryAgain)

const hideQuestions = () => {
      if(quizOverModal.classList.contains('active')) {
            document.querySelector('.quiz-container').classList.add('hide');
      }
}


window.addEventListener('load', () => {
      randomQuestion();
      answerTracker();
})