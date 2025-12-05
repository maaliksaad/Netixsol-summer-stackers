// quiz.js - Quiz taking page
QuizApp.prototype.renderQuizPage = function() {
  if (!this.currentUser || !this.currentQuiz) {
    this.navigateTo('quizzes');
    return;
  }

  if (this.currentQuestionIndex >= this.currentQuiz.questions.length) {
    this.finishQuiz();
    return;
  }

  const question = this.currentQuiz.questions[this.currentQuestionIndex];
  const progress = ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100;

  document.getElementById('app').innerHTML = `
  ${this.getHeader()}
  <main class="lg:mx-40 md:mx-20 mx-8 my-5">
    <section class="p-4 font-manrope">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-base font-medium text-primary">${this.currentQuiz.title}</h1>
         
        </div>
        <div class="w-full bg-[#F0F2F5] rounded-full h-2 mb-2">
          <div class="bg-primary h-2 rounded-full" style="width: ${progress}%"></div>
        </div>
        <div class="text-sm text-[#61738A]">
          Question ${this.currentQuestionIndex + 1} of ${this.currentQuiz.questions.length}
        </div>
      </div>

      <div class="flex flex-col md:flex-row text-center gap-4 mb-6 justify-center">
        <div>
          <div class="bg-[#F0F2F5] rounded-lg w-full md:w-40 lg:w-74.75 h-14 mb-4 flex items-center justify-center">
            <h2 class="font-bold text-lg tracking-normal leading-6" id="timer-hours">
              00
            </h2>
          </div>
          <p class="text-primary font-normal text-sm tracking-normal leading-5">Hours</p>
        </div>
        <div>
          <div class="bg-[#F0F2F5] rounded-lg w-full md:w-40 lg:w-74.75 h-14 mb-4 flex items-center justify-center">
            <h2 class="font-bold text-lg tracking-normal leading-6" id="timer-minutes">
              01
            </h2>
          </div>
          <p class="text-primary font-normal text-sm tracking-normal leading-5">Minutes</p>
        </div>
        <div>
          <div class="bg-[#F0F2F5] rounded-lg w-full md:w-40 lg:w-74.75 h-14 mb-4 flex items-center justify-center">
            <h2 class="font-bold text-lg tracking-normal leading-6" id="timer-seconds">
              00
            </h2>
          </div>
          <p class="text-primary font-normal text-sm tracking-normal leading-5">Seconds</p>
        </div>
      </div>
      
      <div class="pb-6 mb-6">
        <h2 class="text-[28px] font-bold mb-6">${question.question}</h2>
        <div class="space-y-3">
          ${question.options.map((option, index) => `
            <label class="flex items-center p-4 border border-[#DBE0E5] rounded-lg cursor-pointer hover:bg-[#F0F2F5]">
              <input type="radio" name="answer" value="${index}" class="mr-3 accent-primary" ${this.userAnswers[this.currentQuestionIndex] === index ? 'checked' : ''}>
              <span class="text-base">${option}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="flex justify-between">
        <button onclick="app.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'disabled' : ''} class="px-6 py-3 border border-[#DBE0E5] rounded-lg font-semibold ${this.currentQuestionIndex === 0 ? 'opacity-50' : 'hover:bg-[#F0F2F5]'}">
          Previous
        </button>
        <button onclick="app.nextQuestion()" class="px-6 py-3 bg-[#0D78F2] text-white rounded-lg font-semibold hover:bg-blue-600">
          ${this.currentQuestionIndex === this.currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </section>
  </main>`;

  this.startTimer();
};

QuizApp.prototype.startTimer = function() {
  if (this.timer) clearInterval(this.timer);
  this.timeLeft = 60;

  this.timer = setInterval(() => {
    this.timeLeft = Math.max(0, this.timeLeft - 1);

    const hours = Math.floor(this.timeLeft / 3600);
    const minutes = Math.floor((this.timeLeft % 3600) / 60);
    const seconds = this.timeLeft % 60;

    const hoursElement = document.getElementById('timer-hours');
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');

    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (this.timeLeft === 0) {
      clearInterval(this.timer);
      this.timer = null;
      this.nextQuestion(true); // skip validation
    }

  }, 1000);
};


QuizApp.prototype.saveCurrentAnswer = function() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    this.userAnswers[this.currentQuestionIndex] = parseInt(selectedAnswer.value);
  }
};

QuizApp.prototype.nextQuestion = function(skipValidation = false) {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Apply validation ONLY if user clicked next
  if (!skipValidation && !selectedAnswer && this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
    alert('Please select an answer before proceeding.');
    return;
  }

  this.saveCurrentAnswer();

  if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
    this.currentQuestionIndex++;
    this.renderQuizPage();
  } else {
    this.finishQuiz();
  }
};

QuizApp.prototype.previousQuestion = function() {
  if (this.currentQuestionIndex > 0) {
    this.saveCurrentAnswer();
    this.currentQuestionIndex--;
    this.renderQuizPage();
  }
};

QuizApp.prototype.finishQuiz = function() {
  this.saveCurrentAnswer();
  if (this.timer) clearInterval(this.timer);
  
  let correctAnswers = 0;
  const incorrectAnswers = [];
  
  this.currentQuiz.questions.forEach((question, index) => {
    const userAnswer = this.userAnswers[index];
    if (userAnswer !== undefined && userAnswer === question.correct) {
      correctAnswers++;
    } else {
      incorrectAnswers.push({
        question: question.question,
        userAnswer: userAnswer !== undefined ? question.options[userAnswer] : 'Not answered',
        correctAnswer: question.options[question.correct],
        options: question.options
      });
    }
  });
  
  const score = Math.round((correctAnswers / this.currentQuiz.questions.length) * 100);
  
  const result = {
    quizId: this.currentQuiz.id,
    quizTitle: this.currentQuiz.title,
    score,
    correctAnswers,
    totalQuestions: this.currentQuiz.questions.length,
    incorrectAnswers,
    date: new Date().toISOString()
  };
  
  Storage.saveResult(this.currentUser.id, result);
  this.lastResult = result;
  this.navigateTo('result');
};