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

  export function editImage(id, name, websiteName, uploadCategory, projectName) {
    console.log(id);
    console.log(name);
    console.log(websiteName);
    console.log(uploadCategory);
    console.log(projectName);

    return new Promise((resolve, reject) => {
      const token = BackendServicesHelpers.getCookieValue("token");
      const url = BackendServicesHelpers.setAPIUrl("update");
  
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json"); 
  
      const command = {
        Id: id,
        Name: name,
        WebsiteName: websiteName,
        PictureCategory: uploadCategory,
        ProjectName: projectName
      };

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(command)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .then(data => {
        resolve(data);
        window.location.href = 'http://127.0.0.1:8080/Images';
      })
      .catch(error => {
        localStorage.setItem("failureMessage", "Update failed.");
        console.error(error);
        reject(error);
      });
    });
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