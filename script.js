//Grabbing and Defining Global Variables
const userForm = document.getElementById('userForm');
const userProjName = document.getElementById('userProjName');
const userProjDesc = document.getElementById('desc-box');
const userProjMin = document.getElementById('minutes');
const userProjSec = document.getElementById('seconds');
let taskContainer = document.getElementById('taskcontainer');

function checkEmpty(array) {
    array.forEach(function(element) {

        console.log(element.value.trim());
        if (element.value.trim() === '') {
            showError();
        } else {
            generateTaskBox();
        }
    });
}

function showError() {
    let msgError = document.getElementById('errorLabel');
    msgError.style.visibility = 'visible';
}

function generateTaskBox(head, body, min, sec) {
    taskContainer.appendChild(head);
}

function generateHeader() {
    let newHeaderBorder = document.createElement("div");
    newHeaderBorder.className = 'sample-card samp-procedure-container';
    let newHeaderLine = document.createElement('hr');
    let newHeaderText = document.createElement('h2');newHeaderText.appendChild(document.createTextNode(userProjName.value));
    newHeaderText.className = 'samp-procedure-container h2';
    newHeaderBorder.appendChild(newHeaderText);
    newHeaderBorder.appendChild(newHeaderLine);

    return newHeaderBorder; //Returns border with header element.

}

function generateDesc() {
    let newDesc = document.createElement("div");
    newDesc.className = 'samp-description-container';
    newDesc.appendChild(document.createTextNode(userProjDesc));

    return newDesc;
}



//Event Listeners

userForm.addEventListener('submit', () => {
    event.preventDefault();
    checkEmpty([userProjName, userProjDesc, userProjMin, userProjSec]);

    //check if the submission forms are blank

});

/*Notes 

I want a single function that will appendChild with callback functions designed to return pieces of the sample box, but what the user inputs...If all else fails, we can just write a large functions that creates the whole damn thing and name it generate().

*/
