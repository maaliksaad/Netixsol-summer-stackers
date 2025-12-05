// quizzes.js - Quiz selection page
QuizApp.prototype.renderQuizzesPage = function() {
  if (!this.currentUser) {
    this.navigateTo('signin');
    return;
  }

  const categories = [...new Set(QUIZ_DATA.map(q => q.category))];
  const selectedCategory = this.selectedCategory || 'All';

  document.getElementById('app').innerHTML = `
  ${this.getHeader()}
  <main class="lg:mx-40 md:mx-20 mx-8 my-5 ">
    <section class="p-4 font-manrope text-primary ">
      <div class="text-left mb-8">
        <h1 class="text-4xl font-bold mb-2">Select a Quiz</h1>
       
      </div>

      <!-- Category Filter -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 justify-start">
          <button onclick="app.filterQuizzes('All')" 
                  class="px-4 py-2 rounded-lg font-medium ${selectedCategory === 'All' ? 'bg-[#0D78F2] text-white' : 'bg-[#F0F2F5] '}">
            All
          </button>
          ${categories.map(cat => `
            <button onclick="app.filterQuizzes('${cat}')" 
                    class="px-4 py-2 rounded-lg font-medium ${selectedCategory === cat ? 'bg-[#0D78F2] text-white' : 'bg-[#F0F2F5] '}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      ${this.selectedCategory === 'All' ? `
      <!-- Featured Quizzes -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Featured Quizzes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${QUIZ_DATA.slice(0, 3).map((quiz, index) => `
            <div class=" overflow-hidden shadow-none hover:shadow-lg transition-shadow cursor-pointer" onclick="app.startQuiz(${quiz.id})">
              <img src="${quiz.img}" alt="${quiz.title}" class="w-full h-40 object-cover rounded-xl bg-gray-200">
              <div class="p-4">
                <h3 class="font-semibold">${quiz.title}</h3>
                <p class="text-sm text-gray-600">${quiz.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- All Quizzes -->
      <h2 class="text-xl font-semibold mb-4">${this.selectedCategory === 'All' ? 'All Quizzes' : this.selectedCategory + ' Quizzes'}</h2>
      <div class="space-y-6">
        ${this.getFilteredQuizzes().map((quiz, index) => `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" onclick="app.startQuiz(${quiz.id})">
            <div>
              
              <h3 class="font-semibold text-lg mb-2">${quiz.title}</h3>
              <p class="text-sm text-[#61738A] mb-4">${quiz.description}</p>
             
            </div>
            <img src="${quiz.img}" alt="${quiz.title}" class="w-full h-40 object-cover bg-gray-200 rounded-xl">
          </div>
        `).join('')}
      </div>
    </section>
  </main>`;
};

QuizApp.prototype.getFilteredQuizzes = function() {
  if (!this.selectedCategory || this.selectedCategory === 'All') {
    return QUIZ_DATA;
  }
  return QUIZ_DATA.filter(quiz => quiz.category === this.selectedCategory);
};

QuizApp.prototype.filterQuizzes = function(category) {
  this.selectedCategory = category;
  this.renderQuizzesPage();
};

QuizApp.prototype.startQuiz = function(quizId) {
  const quiz = QUIZ_DATA.find(q => q.id === quizId);
  if (!quiz) {
    alert('Quiz not found.');
    return;
  }
  
  this.currentQuiz = quiz;
  this.currentQuestionIndex = 0;
  this.userAnswers = [];
  this.navigateTo('quiz');
};