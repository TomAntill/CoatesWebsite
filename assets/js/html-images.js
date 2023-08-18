import BackendServices from './back-end-services.js';

BackendServices.user.isLoggedIn();

const tbody = document.querySelector('tbody');
        
BackendServices.get.sendGetRequest('0', undefined, undefined)
    .then(images => {
        images.forEach(image => {
            image.projectName = ProjectNameEnum(image.projectName);
            image.pictureCategory = UploadCategoryEnum(image.pictureCategory);
            const row = document.createElement('tr'); // Create a new row for each image
            row.innerHTML = `
                <td><img src="${image.url}" alt="Image" id="imageElement" style="max-width: 200px; margin-top: 30px; margin-bottom: 30px;">
                <td>${image.name}</td>
                <td>${image.pictureCategory}</td>
                <td>${image.projectName}</td>
                <td>
                    <a href="http://127.0.0.1:8080/Edit?Id=${image.id}">Edit</a> |
                    <a href="http://127.0.0.1:8080/Details?Id=${image.id}">Details</a> |
                    <a href="http://127.0.0.1:8080/Delete?Id=${image.id}">Delete</a> |
                </td>
                `;
                tbody.appendChild(row); // Append the row to the table body
            });
        })
    .catch(error => {
    // Handle errors
    console.error(error);
});

function UploadCategoryEnum(pictureCategory){
    if (pictureCategory==0)
        return "Bespoke Carpentry";
    if (pictureCategory==1)
        return "Concrete Tops";
    if (pictureCategory==2)
        return "Furniture";
    if (pictureCategory==3)
        return "None";
}

function ProjectNameEnum(projectName){
    if (projectName==0)
        return "Tregonwell Road";
    if (projectName==1)
        return "Ponsford Road";
    if (projectName==2)
        return "Summerhouse";
    if (projectName==3)
        return "None";
}