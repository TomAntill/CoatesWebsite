import * as BackendServicesHelpers from './back-end-services-helpers.js';
 

export function deleteMedia(websiteName, id) {
    const token = BackendServicesHelpers.getCookieValue("token");
  
    const baseUrl = BackendServicesHelpers.setAPIUrl("delete");
    var finalUrl =
      baseUrl +
      "?websiteName=" +
      encodeURIComponent(websiteName) +
      "&id=" +
      encodeURIComponent(id);
  
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", finalUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
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
  
  export async function deleteImage(websiteName, id) {
    const token = BackendServicesHelpers.getCookieValue("token");
    const url = BackendServicesHelpers.setAPIUrl("delete");
    var finalUrl =
    url +
    "?websiteName=" +
    encodeURIComponent(websiteName) +
    "&id=" +
    encodeURIComponent(id);
  
    console.log(finalUrl);
    const xhr = new XMLHttpRequest();
  
    // Set the URL and method
    xhr.open("DELETE", finalUrl);
  
    // Set the callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Request was successfulsaveTokenToCookie
        console.log("Image delete successful!");
        window.location.replace("http://127.0.0.1:8080/Images");
      } else {
        // Request failed
        console.error("Image delete failed with status code " + xhr.status);
      }
    };
  
    // Set the Authorization header
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  
    xhr.send();
  }