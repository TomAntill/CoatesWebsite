import * as BackendServicesHelpers from './back-end-services-helpers.js';
const WEBSITE_NAME = "CoatesCarpentry";

export function jwtSignup(userName, password, websiteName) {
  return new Promise((resolve, reject) => {
    var url = BackendServicesHelpers.setAPIUrl("JwtSignup");
    
    var finalUrl =
      url +
      "?username=" +
      encodeURIComponent(userName) +
      "&password=" +
      encodeURIComponent(password) +
      "&websiteName=" +
      encodeURIComponent(websiteName);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", finalUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          saveTokenToCookie(response.token);

          // Resolve the promise to indicate successful signup/login
          resolve(response);
        } else {
          // Store the failure message in localStorage
          localStorage.setItem(
            "failureMessage",
            "Signup failed. Please check your credentials."
          );

          console.error(xhr.status);

          // Reject the promise to indicate login failure
          reject(new Error(xhr.status));
        }
      }
    };
    xhr.send();
  });
}

export function jwtLogin(userName, password) {
  return new Promise((resolve, reject) => {
    var websiteName = 0;
    var url = BackendServicesHelpers.setAPIUrl("JwtLogin");
    var finalUrl =
      url +
      "?username=" +
      encodeURIComponent(userName) +
      "&password=" +
      encodeURIComponent(password) +
      "&websiteName=" +
      encodeURIComponent(websiteName);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", finalUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
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
          localStorage.setItem(
            "failureMessage",
            "Login failed. Please check your credentials."
          );

          console.error(xhr.status);

          // Reject the promise to indicate login failure
          reject(new Error(xhr.status));
        }
      }
    };
    xhr.send();
    console.log(document.cookie);
  });
}

export function setLoggedInState(isLoggedIn) {
  localStorage.setItem("isLoggedIn", isLoggedIn);
}

export function logout() {
  localStorage.removeItem("isLoggedIn");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "http://127.0.0.1:8080/Login";
}

export function isLoggedIn() {
  
    var expirationDateString = document.cookie;
    console.log(expirationDateString);
    var expirationDate = new Date(expirationDateString);
    console.log(expirationDate);



  } 



  export function saveTokenToCookie(token) {
  // Define the cookie name
  const cookieName = "token";

  // Set the expiry date for the cookie
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 24);

  // Serialize and encode the token
  const tokenValue = JSON.stringify(encodeURIComponent(token));

  // Format the cookie string without "Bearer" prefix
  const cookieValue =
    tokenValue + "; expires=" + expiryDate.toUTCString() + "; path=/";

  // Set the cookie
  document.cookie = cookieName + "=" + cookieValue;
}
