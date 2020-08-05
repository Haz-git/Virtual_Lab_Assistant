//Grabbing and Defining Global Variables
const userForm = document.getElementById('userForm');
const userProjName = document.getElementById('userProjName');
const userProjDesc = document.getElementById('desc-box');
const userProjMin = document.getElementById('minutes');
const userProjSec = document.getElementById('seconds');
let taskContainer = document.getElementById('taskcontainer');

function checkAllEmpty(array) {

    let results = array.every(function(element) {
        if ((element.value.trim()).length === 0) {
            return true;
        } else {
            return false;
        }
    });

    return results;
}

function checkAnyEmpty() {
    let results;
    let pName = (userProjName.value.trim()).length;
    let pDesc = (userProjDesc.value.trim()).length;
    let pMin = (userProjMin.value.trim()).length;
    let pSec = (userProjSec.value.trim()).length;

    if (pName === 0 || pDesc === 0 || pMin === 0 || pSec === 0) {
        results = true;
    } else {
        results = false;
    }
    return results;
}


function showError() {
    let msgError = document.getElementById('errorLabel');
    msgError.style.visibility = 'visible';
}

//Shortening doc.create.element
function docCE (tag) {
    return document.createElement(tag);
}

function generateTaskBox() {
    let newHeaderBorder = docCE("div");
    newHeaderBorder.className = 'sample-card samp-procedure-container';
    let newHeaderLine = docCE('hr');
    let newHeaderText = docCE('h2');
    
    newHeaderText.appendChild(document.createTextNode(userProjName.value));
    newHeaderText.className = 'samp-procedure-container h2';

    //Should I assemble this at the bottom?
    newHeaderBorder.appendChild(newHeaderText);
    newHeaderBorder.appendChild(newHeaderLine);

    //newHeaderBorder == Complete Task Box So Far:

    let bodyDiv = docCE('div');
    bodyDiv.className = 'samp-description-container';
    bodyDivText = docCE('p');
    bodyDivText.appendChild(document.createTextNode(userProjDesc.value));
    bodyDiv.appendChild(bodyDivText);

    newHeaderBorder.appendChild(bodyDiv); //add body elements

    let timeDiv = docCE('div');
    timeDiv.className = 'samp-allocated-time';
    let timeDivText1 = docCE('p');
    timeDivText1.appendChild(document.createTextNode('Time Remaining'));
    timeDiv.appendChild(timeDivText1);
    let timeDivText2 = docCE('p');
    timeDivText2.appendChild(document.createTextNode(userProjMin + " : " + userProjSec));
    timeDiv.appendChild(timeDivText2);

    newHeaderBorder.appendChild(timeDiv);

    taskContainer.appendChild(newHeaderBorder);

}


//Event Listeners

userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //check if the submission forms are blank
    let isAllEmpty = checkAllEmpty([userProjName, userProjDesc, userProjMin, userProjSec]);
    let isAnyEmpty = checkAnyEmpty();

    console.log(isAllEmpty, isAnyEmpty);

    if (isAllEmpty === false && isAnyEmpty === false) {
        generateTaskBox();
    } else {
        showError();
    }



});

// Notes 

// I want a single function that will appendChild with callback functions designed to return pieces of the sample box, but what the user inputs...If all else fails, we can just write a large functions that creates the whole damn thing and name it generate().
