// auth.js - Authentication pages
QuizApp.prototype.renderSigninPage = function() {
  document.getElementById('app').innerHTML = `
  ${this.getHeader()}
  <main class="lg:mx-40 md:mx-20 mx-8 my-5">
    <section class="p-4 font-manrope">
      <h3 class="text-primary font-bold text-center text-3xl px-4 py-3 leading-9 tracking-normal">
        Welcome back
      </h3>
      <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"></div>
      <form onsubmit="app.handleSignin(event)" class="w-full md:w-1/2 flex flex-col">
        <div class="px-4 py-3">
          <input
            type="email"
            id="signin-email"
            placeholder="Email"
            required
            class="w-full bg-[#F0F2F5] rounded-lg p-[15px]"
          />
        </div>
        <div class="px-4 py-3">
          <input
            type="password"
            id="signin-password"
            placeholder="Password"
            required
            class="w-full bg-[#F0F2F5] rounded-lg p-[15px]"
          />
        </div>
        <div class="px-4 py-3">
          <button
            type="submit"
            class="w-full bg-[#0D78F2] rounded-lg px-4 py-2.5 text-white text-center"
          >
            Sign In
          </button>
        </div>
      </form>
      <p class="text-center font-normal text-sm text-[#61738A] leading-5 tracking-normal">
        Don't have an account? 
        <a href="#" onclick="app.navigateTo('signup')" class="hover:text-blue-600">Sign Up</a>
      </p>
    </section>
  </main>`;
};

QuizApp.prototype.renderSignupPage = function() {
  document.getElementById('app').innerHTML = `
  ${this.getHeader()}
  <main class="lg:mx-40 md:mx-20 mx-8 my-5">
    <section class="p-4 font-manrope">
      <h3 class="text-primary font-bold text-center text-3xl px-4 py-3 leading-9 tracking-normal">
        Create your account
      </h3>
      <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"></div>
      <form onsubmit="app.handleSignup(event)" class="w-full md:w-1/2 flex flex-col">
        <div class="px-4 py-3">
          <input
            type="text"
            id="signup-name"
            placeholder="Full Name"
            required
            class="w-full border border-[#DBE0E5] rounded-lg p-[15px]"
          />
        </div>
        <div class="px-4 py-3">
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            required
            class="w-full border border-[#DBE0E5] rounded-lg p-[15px]"
          />
        </div>
        <div class="px-4 py-3">
          <input
            type="password"
            id="signup-password"
            placeholder="Password"
            required
            minlength="6"
            class="w-full border border-[#DBE0E5] rounded-lg p-[15px]"
          />
        </div>
        <div class="px-4 py-3">
          <input
            type="password"
            id="signup-confirm"
            placeholder="Confirm Password"
            required
            class="w-full border border-[#DBE0E5] rounded-lg p-[15px]"
          />
        </div>
        <div class="px-4 py-3">
          <button
            type="submit"
            class="w-full bg-[#0D78F2] rounded-lg px-4 py-2.5 text-white text-center"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p class="text-center font-normal text-sm text-[#61738A] leading-5 tracking-normal">
        Already have an account? 
        <a href="#" onclick="app.navigateTo('signin')" class="hover:text-blue-600">Sign In</a>
      </p>
    </section>
  </main>`;
};

QuizApp.prototype.handleSignin = function(event) {
  event.preventDefault();
  
  const email = document.getElementById('signin-email')?.value?.trim();
  const password = document.getElementById('signin-password')?.value;
  
  if (!email || !password) {
    this.showError('Please fill in all fields');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    this.showError('Please enter a valid email address');
    return;
  }
  
  const user = Storage.findUser(email, password);
  if (user) {
    this.saveUser(user);
    this.navigateTo('quizzes');
  } else {
    this.showError('Invalid email or password');
  }
};

QuizApp.prototype.handleSignup = function(event) {
  event.preventDefault();
  
  const name = document.getElementById('signup-name')?.value?.trim();
  const email = document.getElementById('signup-email')?.value?.trim();
  const password = document.getElementById('signup-password')?.value;
  const confirm = document.getElementById('signup-confirm')?.value;
  
  if (!name || !email || !password || !confirm) {
    this.showError('Please fill in all fields');
    return;
  }
  
  // Name validation
  if (name.length < 2) {
    this.showError('Name must be at least 2 characters');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    this.showError('Please enter a valid email address');
    return;
  }
  
  if (password !== confirm) {
    this.showError('Passwords do not match');
    return;
  }
  
  if (password.length < 6) {
    this.showError('Password must be at least 6 characters');
    return;
  }
  
  // Password strength validation
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    this.showError('Password must contain at least one uppercase and one lowercase letter');
    return;
  }
  
  const users = Storage.getUsers();
  if (users.find(u => u.email === email)) {
    this.showError('Email already exists');
    return;
  }
  
  const user = {
    id: Date.now(),
    name,
    email,
    password,
    joinDate: new Date().toISOString()
  };
  
  try {
    Storage.saveUser(user);
    this.saveUser(user);
    this.navigateTo('quizzes');
  } catch (error) {
    this.showError('Error creating account. Please try again.');
  }
};

QuizApp.prototype.showError = function(message) {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
  }
};