//Grabbing and Defining Global Variables
const userForm = document.getElementById('userForm');
const userProjName = document.getElementById('userProjName');
const userProjDesc = document.getElementById('desc-box');
const userProjMin = document.getElementById('minutes');
const userProjSec = document.getElementById('seconds');
let taskContainer = document.getElementById('taskcontainer');

const completeBox = document.getElementById('doneTaskContainer');

const timerButton = document.getElementById('timerStart');
const completeButton = document.getElementById('complete');
const exitButton = document.getElementById('exit');


function clearForm(...inputs) {
    //Clears all the input fields on the form:
    inputs.forEach(input => input.value = '');
}

function checkAllEmpty(array) {
    //Checks if all the fields are empty;
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
    //Checks if any fields are left empty;
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
    //Shows error message
    let msgError = document.getElementById('errorLabel');
    msgError.style.visibility = 'visible';
}

function docCE (tag) {
    //Shortening doc.create.element
    return document.createElement(tag);
}

function generateTaskBox() {
    let newHeaderBorder = docCE("div");
    newHeaderBorder.className = 'sample-card samp-procedure-container';
    let newHeaderLine = docCE('hr');
    let newHeaderText = docCE('h2');
    let headerTextNode = document.createTextNode(userProjName.value);
    newHeaderText.appendChild(headerTextNode);
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
    let newMin = userProjMin.value;
    let newSec = userProjSec.value;
    timeDivText2.appendChild(document.createTextNode(newMin + "m " + newSec + "s"));
    timeDivText2.className = 'samp-time';
    timeDivText2.id = 'timer';
    timeDiv.appendChild(timeDivText2);

    newHeaderBorder.appendChild(timeDiv); //Add Timer Elements

    let buttonContainer = docCE('div');
    buttonContainer.className = 'samp-btn-containers';
    let startBtn = docCE('button');
    let compBtn = docCE('button');
    let xBtn = docCE('button');
    startBtn.className = 'samp-start';
    compBtn.className = 'samp-completed';
    xBtn.className = 'samp-delete';
    startBtn.innerHTML = 'Start';
    compBtn.innerHTML = 'CheckMark';
    xBtn.innerHTML = 'Exit';
    startBtn.id = 'newTimerStart';
    compBtn.id = 'newComplete';
    xBtn.id = 'newExit';
    buttonContainer.appendChild(startBtn);
    buttonContainer.appendChild(compBtn);
    buttonContainer.appendChild(xBtn);

    newHeaderBorder.appendChild(buttonContainer);

    //Adding event listeners to new buttons...

    xBtn.addEventListener('click',() => {
        taskContainer.removeChild(newHeaderBorder);
    });

    startBtn.addEventListener('click',() => {
        console.log("This should Start The Timer");
        let min2 = newMin;
        let sec2 = newSec;

        let intervalTimer = this.setInterval(function() {
            timeDivText2.innerHTML =  min2 + "m " + sec2 + "s";
            sec2--;
            if (sec2 == 0) {
                min2--;
                sec2 = 60;

                if (min2 <= -1) {
                    clearInterval(intervalTimer);
                    timeDivText2.innerHTML = "Task Should Be Finished!";
                }
            }
        }, 1000);
    });

    //Bug found here, it turns out that every taskbox that is generated has the same button with the same button ID. Therefore, when two task boxes are generated with different time values, clicking either start button will only countdown from a single task box (the first one). If you click start from the second task box, the minute and seconds value from the first task box is converted to the second's values and countdown starts from there. There needs to be a way to create separate event listeners...I think the solution lies in event delegation.....Solved! ---I just needed to connect to the individual timeDivText2 for each of the dynamically loaded task boxes! Grabbing it using the ID made me grab all of the timers and incremented it at once.

    
    compBtn.addEventListener('click',() => {
        let completeTaskDiv = docCE('div');
        completeTaskDiv.className = 'indiv-task-container';
        let completeTaskText = docCE('h2');
        completeTaskText.innerHTML = headerTextNode.textContent + " ";
        let checkMarkSym = docCE('i');
        checkMarkSym.className = 'fas fa-check-double';
        completeTaskText.appendChild(checkMarkSym);
        completeTaskDiv.appendChild(completeTaskText);
        completeBox.appendChild(completeTaskDiv);
        taskContainer.removeChild(newHeaderBorder);
    });

    taskContainer.appendChild(newHeaderBorder);//Appending Everything to parent container 
}

//New Task Box Event Listeners:




//Global Scope Event Listeners

userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //check if the submission forms are blank
    let isAllEmpty = checkAllEmpty([userProjName, userProjDesc, userProjMin, userProjSec]);
    let isAnyEmpty = checkAnyEmpty();

    console.log(isAllEmpty, isAnyEmpty);

    if (isAllEmpty === false && isAnyEmpty === false) {
        generateTaskBox();
        clearForm(userProjName, userProjDesc, userProjMin, userProjSec);
    } else {
        showError();
    }

});

timerButton.addEventListener('click',() => {
    console.log("This should start the timer");
});

completeButton.addEventListener('click', () => {
    console.log("This should delete the current task box");
    //Should I input a function that records all finished tasks in the upper right??
});

exitButton.addEventListener('click', () => {
    console.log("This is exit the current task box");
});






// Notes 8/5/2020
// Implemented Completed Task features, adding new task card features, and exiting task card features. Probably should start to implement the timer feature...and what happens when the timer hits 0?
