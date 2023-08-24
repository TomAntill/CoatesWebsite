import * as BackendServicesHelpers from "./back-end-services-helpers.js";

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

    const headers = new Headers();
    headers.append("SystemPassword", "BigAndSwinging22!");

    fetch(finalUrl, {
      method: "POST",
      headers: headers,
      //body: JSON.stringify(yourRequestBodyObjectHere) // Add your request body object
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        saveTokenToCookie(data.token);
        window.location.href = "http://127.0.0.1:8080/Login";
        resolve(data);
      })
      .catch((error) => {
        localStorage.setItem(
          "failureMessage",
          "Signup failed. Please check your credentials."
        );
        console.error(error);
        reject(error);
      });
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
  console.log("logout");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "http://127.0.0.1:8080/Login";
}

export function isLoggedIn() {
  var cookieValue = document.cookie;
  const pageContentDiv = document.getElementById("pageContent");
  const pageLoadingDiv = document.getElementById("loadingContent");

  if (cookieValue.length === 0) {
    console.log("No token.");
    localStorage.removeItem("isLoggedIn");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "http://127.0.0.1:8080/Login";
  } else {
    const jwtParts = cookieValue.split(".");
    const encodedPayload = jwtParts[1];
    const decodedPayload = atob(encodedPayload); // Decoding base64

    const payloadObject = JSON.parse(decodedPayload);

    //const expDate = new Date(payloadObject.exp * 1000);
    //console.log("exp Date:", expDate);

    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

    if (currentTimestamp < payloadObject.exp) {
      console.log("Token is still valid.");
      pageContentDiv.style.display = "block"; // Show the content
      pageLoadingDiv.style.display = "none"; // Hide the content
    } else {
      console.log("Token has expired.");
      localStorage.removeItem("isLoggedIn");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "http://127.0.0.1:8080/Login";
    }
  }
}

export function saveTokenToCookie(token) {
  // Define the cookie name
  const cookieName = "token";

  // Set the expiry date for the cookie
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 24);
  console.log("token date", expiryDate);

  // Serialize and encode the token
  const tokenValue = JSON.stringify(encodeURIComponent(token));

  // Format the cookie string without "Bearer" prefix
  const cookieValue =
    tokenValue + "; expires=" + expiryDate.toUTCString() + "; path=/";
  console.log("token value", cookieValue);

  // Set the cookie
  document.cookie = cookieName + "=" + cookieValue;
}
