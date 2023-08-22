import BackendServices from './back-end-services.js';

BackendServices.user.isLoggedIn();

// Your JavaScript function 'addImage()' goes here.
async function addImage(name, file, websiteName, uploadCategory, projectName) {
  }
  // Handle form submission
  document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const file = document.getElementById('file').files[0];
    const websiteName = "CoatesCarpentry";
    const uploadCategory = document.getElementById('uploadCategory').value;
    const projectName = document.getElementById('projectName').value;
    try {
      await BackendServices.post.addImage(name, file, websiteName, uploadCategory, projectName);
      // Optionally, you can show a success message or perform any other action upon successful API call.
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can show an error message or perform any other action if there's an error.
      // Store the failure message in localStorage
      localStorage.setItem("failureMessage", "Upload failed. Please check your credentials.");

      // Display the failure message
      const messagebox = document.getElementById("messagebox");
      messagebox.innerText = "Upload failed.";
      messagebox.style.display = "block";

      // Call the fadeMyDiv function after 3 seconds
      setTimeout(fadeMyDiv, 3000);
    }

  });
  function fadeMyDiv() {
    $("#messagebox").fadeOut('slow');
    localStorage.removeItem("failureMessage");
}

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", BackendServices.user.logout);