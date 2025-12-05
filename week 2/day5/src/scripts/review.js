// review.js - Review incorrect answers page
QuizApp.prototype.renderReviewPage = function() {
  if (!this.currentUser || !this.lastResult) {
    this.navigateTo('quizzes');
    return;
  }

  const result = this.lastResult;

  document.getElementById('app').innerHTML = `
  ${this.getHeader()}
  <main class="lg:mx-40 md:mx-20 mx-8 my-5">
    <section class="p-4 font-manrope">
      <div class="w-full text-primary">
        <h1 class="text-[2rem] font-bold tracking-normal leading-10 p-4">Review Incorrect Answers</h1>
        
        ${result.incorrectAnswers.length > 0 ? result.incorrectAnswers.map((item, index) => `
          <div>
            <h2 class="font-bold text-lg leading-6 tracking-normal p-4">Question ${index + 1}</h2>
            <p class="leading-6 tracking-normal font-normal text-base p-4">${item.question}</p>
            <p class="leading-6 tracking-normal font-normal text-base p-4"><span>Your answer:</span> ${item.userAnswer}</p>
            <p class="leading-6 tracking-normal font-normal text-base p-4"><span>Correct answer:</span> ${item.correctAnswer}</p>
          </div>
        `).join('') : `
          <div class="p-4">
            <p class="leading-6 tracking-normal font-normal text-base">Great job! You answered all questions correctly.</p>
          </div>
        `}
        
        <div class="text-right m-4">
          <a href="#" onclick="app.navigateTo('quizzes')" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
            Back to Quizzes
          </a>
        </div>
      </div>
    </section>
  </main>`;
};

QuizApp.prototype.retakeQuiz = function() {
  if (this.lastResult) {
    this.startQuiz(this.lastResult.quizId);
  }
};