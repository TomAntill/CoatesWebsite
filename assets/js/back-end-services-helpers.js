export function toggleElementVisibility(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
      if (element.style.display === "none") {
        element.style.display = "block"; // Show the element
      } else {
        element.style.display = "none"; // Hide the element
      }
    }
  }

  export function setAPIUrl(action) {
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
      case "JwtSignup":
        endpoint = "/auth/AddSystemUser";
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

  export function getCookieValue(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
  
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
  
  export function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('Id');
  return id;
  }