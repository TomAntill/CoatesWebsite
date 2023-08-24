import BackendServices from "./back-end-services.js";

BackendServices.user.isLoggedIn();

const imageElement = document.getElementById("imageElement");
const imageNameElement = document.getElementById("imageName");
const uploadCategoryElement = document.getElementById("uploadCategory");
const projectNameElement = document.getElementById("projectName");

populateDetails();

function returnToList() {
  window.location.replace("http://127.0.0.1:8080/Images");
}

function GoToDelete() {
  var baseUrl = "http://127.0.0.1:8080/Delete?Id=";
  var finalUrl = baseUrl + BackendServices.helpers.getIdFromUrl();
  window.location.replace(finalUrl);
}

function GoToEdit() {
  var baseUrl = "http://127.0.0.1:8080/Edit?Id=";
  var finalUrl = baseUrl + BackendServices.helpers.getIdFromUrl();
  window.location.replace(finalUrl);
}

async function populateDetails() {
  const res = await BackendServices.get.getById(
    WEBSITE_SETTINGS.WEBSITE_ID,
    BackendServices.helpers.getIdFromUrl()
  );
  imageElement.src = res.url;
  imageNameElement.textContent = res.name;
  uploadCategoryElement.textContent = await UploadCategoryEnum(
    res.pictureCategory
  );
  projectNameElement.textContent = await ProjectNameEnum(res.projectName);
}

function UploadCategoryEnum(pictureCategory) {
  if (pictureCategory == 0) return "Bespoke Carpentry";
  if (pictureCategory == 1) return "Concrete Tops";
  if (pictureCategory == 2) return "Furniture";
  if (pictureCategory == 3) return "None";
}

function ProjectNameEnum(projectName) {
  if (projectName == 0) return "Tregonwell Road";
  if (projectName == 1) return "Ponsford Road";
  if (projectName == 2) return "Summerhouse";
  if (projectName == 3) return "None";
}

var updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", GoToEdit);

var returnToListButton = document.getElementById("returnToListButton");
returnToListButton.addEventListener("click", returnToList);

var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", GoToDelete);

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", BackendServices.user.logout);
