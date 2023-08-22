import BackendServices from './back-end-services.js';

BackendServices.user.isLoggedIn();

const imageElement = document.getElementById("imageElement");
const imageNameElement = document.getElementById("imageName");
const uploadCategoryElement = document.getElementById("uploadCategory");
const projectNameElement = document.getElementById("projectName");

populateDetails();

async function populateDetails()
{
    const res = await BackendServices.get.getById(WEBSITE_NAME, BackendServices.helpers.getIdFromUrl());

    imageElement.src = res.url;
    //imageNameElement.textContent = res.name;
    //uploadCategoryElement.textContent = res.pictureCategory;
    //projectNameElement.textContent = res.projectName;

    uploadCategoryElement.value = res.pictureCategory;
    projectNameElement.value = res.projectName;
    
    imageNameElement.value = res.name;
}

function GoToDetails(){
    var baseUrl = "http://127.0.0.1:8080/Details?Id="
    var finalUrl = baseUrl + BackendServices.helpers.getIdFromUrl();
    window.location.replace(finalUrl);
    
}

function UpdateDetails(){
    var pictureCategory = document.getElementById("uploadCategory");
    var projectName = document.getElementById("projectName");

    var outProjectName = ProjectNameEnum(projectName.value);
    var outUploadCategory = UploadCategoryEnum(pictureCategory.value);
    var id = BackendServices.helpers.getIdFromUrl();
    var websiteName = WEBSITE_NAME;

    var name = document.getElementById("imageName").value;
    console.log(id, name, websiteName, outUploadCategory, outProjectName)
    
    BackendServices.post.editImage(id, name, websiteName, outUploadCategory, outProjectName);
    //GoToDetails();
}

function ProjectNameEnum(projectName){
    if (projectName== "TregonwellRoad")
        return 0;
    if (projectName=="PonsfordRoad")
        return 1;
    if (projectName=="Summerhouse")
        return 2;
    if (projectName== "None")
        return 3;
}

function UploadCategoryEnum(pictureCategory){
    if (pictureCategory== "BespokeCarpentry")
        return 0;
    if (pictureCategory== "ConcreteTops")
        return 1;
    if (pictureCategory== "Furniture")
        return 2;
    if (pictureCategory== "None")
        return 3;
}

var updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", UpdateDetails);

var returnToDetailsButton = document.getElementById("returnToDetailsButton");
returnToDetailsButton.addEventListener("click", GoToDetails);

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", BackendServices.user.logout);