// result.js - Quiz result page
QuizApp.prototype.renderResultPage = function() {
  if (!this.currentUser || !this.lastResult) {
    this.navigateTo('quizzes');
    return;
  }

  const result = this.lastResult;
  const progress = 100;

  document.getElementById('app').innerHTML = `
  ${this.getHeader()}
  <main class="lg:mx-40 md:mx-20 mx-8 my-5">
    <section class="p-4 font-manrope">
      <h3 class="text-primary font-bold text-center text-3xl px-4 py-3 leading-9 tracking-normal">
        Quiz Results
      </h3>

      <div class="mb-6">
        <div class="flex justify-between items-center">
          <h1 class="text-base font-bold text-primary">Quiz Completed</h1>
          <p class="text-base font-normal leading-6 tracking-normal m-5">100%</p>
        </div>
        <div class="w-full bg-[#F0F2F5] rounded-full h-2 mb-2">
          <div class="bg-primary h-2 rounded-full" style="width: ${progress}%"></div>
        </div>
      </div>

      <div class="w-full h-27.5 bg-[#F0F2F5] rounded-lg p-6">
        <div class="w-full mb-4">
          <h2 class="text-base font-medium tracking-normal leading-6">Score</h2>
          <h2 class="font-bold text-2xl tracking-normal leading-7">
            ${result.correctAnswers}/${result.totalQuestions}
          </h2>
        </div>
      </div>

      <p class="text-center text-base font-normal leading-6 tracking-normal m-5">
        Congratulations, ${this.currentUser.name}! You've completed the quiz with a score of ${result.correctAnswers} out of ${result.totalQuestions}. ${result.score >= 70 ? 'Your performance indicates a strong understanding of the subject matter. Keep up the excellent work!' : 'Keep practicing to improve your score!'}
      </p>

      <div class="flex flex-col gap-6 justify-center items-center">
        <button onclick="app.navigateTo('review')" class="px-6 py-3 w-45 max-w-120 min-w-21 bg-[#0D78F2] text-sm leading-5 tracking-normal text-white rounded-lg font-bold hover:bg-blue-600">
          Review Answers
        </button>
        <button onclick="app.navigateTo('quizzes')" class="px-6 py-3 w-45 max-w-120 min-w-21 bg-[#F0F2F5] rounded-lg text-sm leading-5 tracking-normal font-bold">
          Take Another Quiz
        </button>
      </div>
    </section>
  </main>`;
};