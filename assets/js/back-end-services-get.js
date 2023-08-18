import * as BackendServicesHelpers from './back-end-services-helpers.js';

export function getById(websiteName, id) {
  return new Promise((resolve, reject) => {
    const token = BackendServicesHelpers.getCookieValue("token");

    const baseUrl = BackendServicesHelpers.setAPIUrl("getById");
    var finalUrl =
      baseUrl +
      "?websiteName=" +
      encodeURIComponent(websiteName) +
      "&id=" +
      encodeURIComponent(id);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", finalUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const image = JSON.parse(xhr.responseText);
          resolve(image); // Resolve the promise with the image object
        } else {
          // Handle errors
          reject(xhr.status); // Reject the promise with the error status
        }
      }
    };
    xhr.send();
  });
}

export function sendAuthorizedGetRequest(url, method, callback) {
    const token = BackendServicesHelpers.getCookieValue("token");
  
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
          callback("Error: " + xhr.status);
        }
      };
  
      xhr.onerror = function () {
        callback("Request failed");
      };
  
      xhr.send();
    } else {
      callback("User not logged in");
    }
  }
  
  export function sendGetRequest(appName, category, projectName) {
    return new Promise((resolve, reject) => {
      // Construct the URL with the additional filtering parameters
      const baseUrl = "https://localhost:44311/api/services/GetAll";
      const apiUrl = new URL(baseUrl);
      apiUrl.searchParams.append("appName", appName);
      if (category) {
        apiUrl.searchParams.append("category", category);
      }
      if (projectName) {
        apiUrl.searchParams.append("projectName", projectName);
      }
  
      const xhr = new XMLHttpRequest();
      xhr.open("GET", apiUrl.toString());
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response); // Resolve the promise with the array of image URLs
          } else {
            reject(new Error(`Request failed with status: ${xhr.status}`));
          }
        }
      };
      xhr.send();
    });
  }