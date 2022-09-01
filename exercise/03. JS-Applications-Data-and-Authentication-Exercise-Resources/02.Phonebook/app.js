const baseURL = `http://localhost:3030/jsonstore/phonebook`;
let ul = document.getElementById('phonebook');

let personField = document.getElementById('person');
let phoneField = document.getElementById('phone');

const loadButton = document.getElementById('btnLoad');
const createButton = document.getElementById('btnCreate');

function attachEvents() {
    loadButton.addEventListener('click', loadContacts);
    createButton.addEventListener('click', addContact);
}

async function addContact(){
    if (personField.value !== '' && phoneField.value !== '') {
        let newContanct = {
            person: personField.value,
            phone: phoneField.value
        }
        await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newContanct)
        })
    }
    loadButton.click();
    
    personField.value = ``
    phoneField.value = ``
}

async function loadContacts(){
    ul.replaceChildren();
    const res = await fetch(baseURL);
    const data = await res.json();

    Object.values(data).forEach(x => {
        let newLi = createElement('li', `${x.person}: ${x.phone}`, ul);
        newLi.id = x._id;
        let btnElement = createElement('button', 'Delete', newLi);

        btnElement.addEventListener('click', (e) => {
            e.target.parentElement.remove();

            fetch(`${baseURL}/${e.target.parentElement.id}`, {
                method: 'DELETE'
            })
        })
    })
}
function createElement(type, text, parent){
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