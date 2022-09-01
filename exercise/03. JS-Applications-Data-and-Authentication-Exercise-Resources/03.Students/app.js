const baseURL = `http://localhost:3030/jsonstore/collections/students`;
const btnElement = document.getElementById('submit');
let firstNameField = document.querySelector('input[name="firstName"]');
let lastNameField = document.querySelector('input[name="lastName"]');
let facultyNumberField = document.querySelector('input[name="facultyNumber"]');
let gradeField = document.querySelector('input[name="grade"]');

let tableBody = document.querySelector('tbody');


async function attachEvents() {

    let response = await fetch(baseURL);
    let students = await response.json();
    Object.values(students).forEach(x => {
        let tableRow = createElement('tr', '', tableBody)
        let tdFirstName = createElement('td', `${x.firstName}`, tableRow);
        let tdLastName = createElement('td', `${x.lastName}`, tableRow);
        let tdFacultyNumber = createElement('td', `${x.facultyNumber}`, tableRow);
        let tdGrade = createElement('td', `${x.grade}`, tableRow);
    })

    btnElement.addEventListener('click', (e) => {
        e.preventDefault();

        if (!isNaN(Number(firstNameField.value)) || firstNameField.value === ``) {
            alert('First Name field must contain letters')
        } else if (!isNaN(Number(lastNameField.value)) || lastNameField.value === ``) {
            alert('Last Name field must contain letters')
        } else if (!checkIfStringOfNumbers(facultyNumberField.value) || facultyNumberField.value === ``) {
            alert('Faculty number must consist of numbers');
        } else if (isNaN(Number(gradeField.value)) || gradeField.value === ``) {
            alert('Field grade must be a number')
        } else {

            let student = {
                firstName: firstNameField.value,
                lastName: lastNameField.value,
                facultyNumber: facultyNumberField.value,
                grade: gradeField.value
            }
            let tableRow = createElement('tr', '', tableBody)
            let tdFirstName = createElement('td', `${student.firstName}`, tableRow);
            let tdLastName = createElement('td', `${student.lastName}`, tableRow);
            let tdFacultyNumber = createElement('td', `${student.facultyNumber}`, tableRow);
            let tdGrade = createElement('td', `${student.grade}`, tableRow);



            fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
        }


        firstNameField.value = ''
        lastNameField.value = ''
        facultyNumberField.value = ''
        gradeField.value = ''
    })
}

function checkIfStringOfNumbers(string) {
    for (let index = 0; index < string.length; index++) {
        let currentChar = string[index];
        if (isNaN(currentChar)) {
            return false;
        }
    }

    return true;
}

function createElement(type, text, parent) {
    const element = document.createElement(type);

    if (text) {
        element.textContent = text;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
attachEvents();
