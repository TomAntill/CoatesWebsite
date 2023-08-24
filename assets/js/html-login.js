import BackendServices from './back-end-services.js';

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    BackendServices.user.jwtLogin(email, password)
        .then((response) => {
            window.location.href = 'http://127.0.0.1:8080/Images';
        })
        .catch((error) => {
            console.error('Login failed:', error);

            localStorage.setItem("failureMessage", "Login failed. Please check your credentials.");

            const messagebox = document.getElementById("messagebox");
            messagebox.innerText = "Login failed. Please check your credentials.";
            messagebox.style.display = "block";

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
