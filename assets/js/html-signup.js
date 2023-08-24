import BackendServices from "./back-end-services.js";

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please confirm your password.");
      return;
    }
    // If passwords match, continue with signup process
    const email = document.getElementById("email").value;
    console.log("email", email);
    console.log("pass", password);

    try {
      const response = BackendServices.user.jwtSignup(
        email,
        password,
        WEBSITE_SETTINGS.UNSET_WEBSITE_ID
      );
      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup error:", error);
    }
    console.log("Signup successful for:", email);
  });
