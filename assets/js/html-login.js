import BackendServices from './back-end-services.js';

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    // Call your login function (e.g., jwtLogin) and handle the success/failure appropriately
    BackendServices.user.jwtLogin(email, password)
        .then((response) => {
            // Assuming the login was successful, redirect the user to a different page
            window.location.href = 'http://127.0.0.1:8080/Images';
        })
        .catch((error) => {
            // Handle login failure, show error message, etc.
            console.error('Login failed:', error);

            // Store the failure message in localStorage
            localStorage.setItem("failureMessage", "Login failed. Please check your credentials.");

            // Display the failure message
            const messagebox = document.getElementById("messagebox");
            messagebox.innerText = "Login failed. Please check your credentials.";
            messagebox.style.display = "block";

            // Call the fadeMyDiv function after 3 seconds
            setTimeout(fadeMyDiv, 3000);
        });
}

function fadeMyDiv() {
    $("#messagebox").fadeOut('slow');
    localStorage.removeItem("failureMessage");
}

// Attach the event listener after the page loads
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');
    form.addEventListener('submit', handleFormSubmit);
});
