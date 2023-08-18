import * as BackendServicesHelpers from './back-end-services-helpers.js';


export function updateMedia(websiteName, id, updatedData) {
    const token = BackendServicesHelpers.getCookieValue("token");
  
    const baseUrl = BackendServicesHelpers.setAPIUrl("update");
    var finalUrl =
      baseUrl +
      "?websiteName=" +
      encodeURIComponent(websiteName) +
      "&id=" +
      encodeURIComponent(id);
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", finalUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
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

  export async function editImage(id, name, websiteName, uploadCategory, projectName) {
    const token = BackendServicesHelpers.getCookieValue("token");
    const url = BackendServicesHelpers.setAPIUrl("update");
  
    const xhr = new XMLHttpRequest();
  
    // Set the URL and method
    xhr.open("POST", url);
  
    // Set the callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Request was successful
        console.log("Image updated successful!");
      } else {
        // Request failed
        console.error("Image upload failed with status code " + xhr.status);
      }
    };
  
    // Set the Authorization header
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  
    // Set the Content-Type header to indicate JSON data
    xhr.setRequestHeader("Content-Type", "application/json");
  
    const jsonData = JSON.stringify({
      id: id,
      name: name,
      websiteName: websiteName,
      uploadCategory: uploadCategory,
      projectName: projectName
    });
  
    console.log("json", jsonData);
  
    xhr.send(jsonData);
  }
  
  export async function addImage(name, file, websiteName, uploadCategory, projectName) {
    const token = BackendServicesHelpers.getCookieValue("token");
    const url = BackendServicesHelpers.setAPIUrl("addImage");
  
    const xhr = new XMLHttpRequest();
  
    // Set the URL and method
    xhr.open("POST", url);
  
    // Set the callback function to handle the response
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Request was successful
        console.log("Image upload successful!");
        window.location.replace("http://127.0.0.1:8080/Add");
      } else {
        // Request failed
        console.error("Image upload failed with status code " + xhr.status);
      }
    };
  
    // Set the Authorization header
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("websiteName", websiteName);
    formData.append("uploadCategory", uploadCategory);
    formData.append("projectName", projectName);
  
    xhr.send(formData);
  }
  
  export function sendAuthorizedPostRequest(url, data, callback) {
    // Get the token from the cookie
  
    const token = BackendServicesHelpers.getCookieValue("token");
  
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
  