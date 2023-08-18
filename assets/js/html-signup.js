import BackendServices from './back-end-services.js';

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please confirm your password.");
      return;
    }
    // If passwords match, continue with signup process
    const email = document.getElementById('email').value;
    console.log("email", email);
    console.log("pass", password);

    // Call your signup function here
    BackendServices.user.jwtSignup(email, password, WEBSITE_NAME);

    try {
      const response = BackendServices.user.jwtSignup(email, password, WEBSITE_NAME);
      console.log('Signup successful:', response);
      // Redirect or perform other actions upon successful signup
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error, display a message, etc.
    }
    console.log("Signup successful for:", email);
    // Redirect or perform other actions upon successful signup
  });