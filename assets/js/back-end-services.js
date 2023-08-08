var loginUrl = 'https://localhost:44311/api/auth/JwtLogin?userName=ruttben@yahoo.com&password=Bigboy123!';
var at = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1ZmU2YTNjMS04NjUwLTRmYmQtYjk0Ni1lNDMwMjcyODU1ODAiLCJ1bmlxdWVfbmFtZSI6IlJVVFRCRU5AWUFIT08uQ09NIiwid2Vic2l0ZSI6IkNvYXRlc0NhcnBlbnRyeSIsIm5iZiI6MTY4NTA5MTgwOCwiZXhwIjoxNjg1MTc4MjA4LCJpYXQiOjE2ODUwOTE4MDh9.h4ztusyy2Cw-k08YuAPOg_isQ1VgVwX3CWua4i7aAuY';

//jwtLogin("thomasantill92@gmail.com", "Test12345!");

function updateMedia(websiteName, id, updatedData){
  const token = getCookieValue('token');

  const baseUrl = setAPIUrl("update")
  var finalUrl = baseUrl + "?websiteName=" + encodeURIComponent(websiteName) + "&id=" + encodeURIComponent(id);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', finalUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  // Set the callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Request was successful
      console.log("Image update successful!");
    } else {
      // Request failed
      console.error("Image update failed with status code " + xhr.status);
    }
  };

  // Convert the updated data to JSON
  const updatedDataJSON = JSON.stringify(updatedData);

  // Send the updated data as the request body
  xhr.send(updatedDataJSON);
}
  
function deleteMedia(websiteName, id){
  const token = getCookieValue('token');

  const baseUrl = setAPIUrl("delete")
  var finalUrl = baseUrl + "?websiteName=" + encodeURIComponent(websiteName) + "&id=" + encodeURIComponent(id);

  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', finalUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 204) {
        console.log("Media deleted successfully.");
      } else {
        console.error("Failed to delete media. Status:", xhr.status);
      }
    }
  };

  xhr.send();
}

function getById(websiteName, id){
  const token = getCookieValue('token');

  const baseUrl = setAPIUrl("getById")
  var finalUrl = baseUrl + "?websiteName=" + encodeURIComponent(websiteName) + "&id=" + encodeURIComponent(id);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', finalUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const image = JSON.parse(xhr.responseText);

        if (image) {
          // Handle the image details
          const imageName = image.Name;
          const uploadCategory = image.PictureCategory;
          const projectName = image.ProjectName;
          const imageUrl = image.Url; // Assuming this is the URL to the image file

          console.log("Image Name:", imageName);
          console.log("Upload Category:", uploadCategory);
          console.log("Project Name:", projectName);
          console.log("Image URL:", imageUrl);
        } else {
          console.error("Image not found.");
        }
      } else {
        // Handle errors
        console.error(xhr.status);
      }
    }
  };

  xhr.send();
}

function getCookieValue(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      let cookieValue = cookie.substring(name.length, cookie.length);
      if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
        cookieValue = cookieValue.slice(1, -1); // Remove double quotes if present
      }
      // Remove "Bearer" prefix if present
      if (cookieValue.startsWith("Bearer ")) {
        cookieValue = cookieValue.replace("Bearer ", "");
      }
      return cookieValue;
    }
  }

  return null; // Return null if the cookie is not found
}

async function addImage(name, file, websiteName, uploadCategory, projectName) {
  const token = getCookieValue('token');
  const url = setAPIUrl("addImage");

  const xhr = new XMLHttpRequest();

  // Set the URL and method
  xhr.open("POST", url);

  // Set the callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Request was successful
      console.log("Image upload successful!");
    } else {
      // Request failed
      console.error("Image upload failed with status code " + xhr.status);
    }
  };

  // Set the Authorization header
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', file);
  formData.append('websiteName', websiteName);
  formData.append('uploadCategory', uploadCategory);
  formData.append('projectName', projectName);

  xhr.send(formData);
}


function jwtLogin(userName, password) {
  return new Promise((resolve, reject) => {
    websiteName = 0;
    url = setAPIUrl("JwtLogin");

    var finalUrl = url + "?username=" + encodeURIComponent(userName) + "&password=" + encodeURIComponent(password) + "&websiteName=" + encodeURIComponent(websiteName);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', finalUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          saveTokenToCookie(response.token);

          // Set the logged-in state to true in the client-side storage
          setLoggedInState(true);

          // Resolve the promise to indicate successful login
          resolve(response);
        } else {
          
          // Store the failure message in localStorage
          localStorage.setItem("failureMessage", "Login failed. Please check your credentials.");

          console.error(xhr.status);

          // Reject the promise to indicate login failure
          reject(new Error(xhr.status));
        }
      }
    };
    xhr.send();
  });
}

function setLoggedInState(isLoggedIn) {
  localStorage.setItem("isLoggedIn", isLoggedIn);
}

function logout() {
  localStorage.removeItem("isLoggedIn")
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function isLoggedIn() {
  var loggedInStatus = localStorage.getItem("isLoggedIn");
    
  if (loggedInStatus === "true") {
      toggleElementVisibility("loadingContent");
      toggleElementVisibility("pageContent");
      return true; // User is logged in
  } else {
      // User is not logged in, redirect to the login page
      window.location.href = "http://127.0.0.1:8080/Login"; 
      return false;
  }
}

function toggleElementVisibility(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
      if (element.style.display === "none") {
          element.style.display = "block"; // Show the element
      } else {
          element.style.display = "none"; // Hide the element
      }
  }
}

function saveTokenToCookie(token) {
  // Define the cookie name
  const cookieName = "token";

  // Set the expiry date for the cookie
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 24);

  // Serialize and encode the token
  const tokenValue = JSON.stringify(token);
  const encodedToken = encodeURIComponent(tokenValue);

  // Format the cookie string without "Bearer" prefix
  const cookieValue = encodedToken + "; expires=" + expiryDate.toUTCString() + "; path=/";

  // Set the cookie
  document.cookie = cookieName + "=" + cookieValue;
}


function setAPIUrl(action) {
  let baseUrl = "https://localhost:44311/api";
  let endpoint;

  // Set the endpoint based on the action
  switch (action) {
    case "addImage":
      endpoint = "/admin/AddImage";
      break;
    case "getAll":
      endpoint = "/admin/GetAll";
      break;
    case "getById":
      endpoint = "/admin/GetById";
      break;
    case "delete":
        endpoint = "/admin/Delete";
        break;
    case "update":
      endpoint = "/admin/Update";
      break;
    case "JwtLogin":
        endpoint = "/auth/JwtLogin";
        break;
    default:
      // Handle any other actions or set a default endpoint
      endpoint = "";
      break;
  }
  // Combine the base URL and endpoint to form the final URL
  let apiUrl = baseUrl + endpoint;

  // Use the apiUrl variable wherever you need it in your code
  return apiUrl;
}

function sendAuthorizedPostRequest(url, data, callback) {
    // Get the token from the cookie
    
    const token = getCookieValue("token");
      
    const xhr = new XMLHttpRequest();
      
    // Set the Authorization header
    xhr.setRequestHeader("Authorization", "Bearer " + token);
      
    // Set the URL and method
    xhr.open("POST", url);
      
    // Set the callback function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
        // Request was successful
        callback(null, xhr.responseText);
        } else {
        // Request failed
        callback(new Error("Request failed with status code " + xhr.status));
        }
    };
      
    // Set the request payload
    xhr.setRequestHeader("Content-Type", "application/json");
    const requestData = JSON.stringify(data);
    xhr.send(requestData);
    }
      
function sendAuthorizedGetRequest(url, method, callback) {
    const token = getCookieValue("token");


    const xhr = new XMLHttpRequest();

    if (isLoggedIn()) {
    console.log("User is logged in");
    if (token) {
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    }
    
    xhr.open(method, url);
    
    xhr.onload = function () {
    if (xhr.status === 200) {
        callback(null, xhr.responseText);
    } else {
        callback('Error: ' + xhr.status);
        }
    };
    
    xhr.onerror = function () {
    callback('Request failed');
    };
    
    xhr.send();

   } else {
    callback('User not logged in');
   }
}

function sendGetRequest(appName, category, projectName, containerId) {

  // Construct the URL with the additional filtering parameters
  const baseUrl = 'https://localhost:44311/api/services/GetAll';
  const apiUrl = new URL(baseUrl);
  apiUrl.searchParams.append('appName', appName);
  if (category) {
    apiUrl.searchParams.append('category', category);
  }
  if (projectName) {
    apiUrl.searchParams.append('projectName', projectName);
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl.toString());
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // Handle the response data

        var imageUrls = response; // Assuming the response is a JSON array of image URLs

        // Get the container element where you want to append the images
        var container = document.getElementById(containerId);

        // Loop through the array of image URLs
        imageUrls.forEach(function (imageUrl) {
          // Create a new img element
          var img = document.createElement('img');

          // Set the src attribute to the image URL
          img.src = imageUrl.url;

          // Append the img element to the container
          container.appendChild(img);
        });

        console.log(response);
      } else {
        // Handle errors
        console.error(xhr.status);
      }
    }
  };
  xhr.send();
}

function sendMessage() {
  // Get form input values
  var name = document.getElementById('nameInput').value;
  var email = document.getElementById('emailInput').value;
  var message = document.getElementById('messageInput').value;

  // Create the email object
  var emailData = {
      Name: name,
      EmailAddress: email,
      Message: message
  };

  // Make a POST request to your API endpoint
  var apiUrl = 'https://localhost:44311/api/services/Add';
  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
  })
  .then(function(response) {
      if (response.ok) {
          // Email sent successfully
          alert('Email sent successfully!');
      } else {
          // Failed to send email
          alert('Failed to send email. Please try again later.');
      }
  })
  .catch(function(error) {
      // Error occurred during the API call
      alert('An error occurred while sending the email. Please try again later.');
  });
}