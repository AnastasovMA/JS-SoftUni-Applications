const baseURL = `http://localhost:3030/jsonstore/collections/books`;
const loadBtn = document.getElementById('loadBooks');
const formElement = document.querySelector('form');
let targetID;


function attachEvents(){
    loadBtn.addEventListener('click', loadBooks);
    formElement.addEventListener('submit', createOrSave)

    loadBtn.click();
}

async function createOrSave(event){
    event.preventDefault();

    let formData = new FormData(event.target);
    let title = formData.get('title');
    let author = formData.get('author');

    let formBtn = document.querySelector('form button');
    let formHeader = document.querySelector('form h3');

    if (formBtn.textContent == 'Save') {
        await fetch(`${baseURL}/${targetID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })

        formBtn.textContent = 'Submit';
        formHeader.textContent = 'FORM';
    } else{

        if (title == '' || author == '') {
            return alert('All fields must be filled');
        }
    
        try {
            const res = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({title, author})
            })
        
            const data = await res.json();
    
            if (res.status !== 200) {
                throw new Error(data.message);
            }
    
        } catch (error) {
            alert(error.message);
        }
    }
    formElement.reset();
    loadBtn.click();
}

async function loadBooks(event){
    event.preventDefault();

    const response = await fetch(baseURL);
    const data = await response.json();

    let tBody = document.querySelector('tbody');
    tBody.replaceChildren();

        Object.entries(data).forEach(([k,v]) => {
        let tRow = createElement('tr', '', tBody);
        tRow.id = k;
        let tTitle = createElement('td', `${v.title}`, tRow);
        let tAuthor = createElement('td', `${v.author}`, tRow);
        let tdButtons = createElement('td', '', tRow);
        let editBtn = createElement('button', 'Edit', tdButtons);
        let deleteBtn = createElement('button', 'Delete', tdButtons);

        editBtn.addEventListener('click', editBook);
        deleteBtn.addEventListener('click', deleteBook)
        
    })
}

async function editBook(event){
    let elementTr = event.target.parentElement.parentElement;
    targetID =elementTr.id;

    const res = await fetch(`${baseURL}/${elementTr.id}`);
    const data = await res.json();

    let title = document.getElementsByName('title')[0];
    let author = document.getElementsByName('author')[0];

    title.value = data.title;
    author.value = data.author;

    document.querySelector('form button').textContent = 'Save';
    document.querySelector('form h3').textContent = 'Edit FORM';
}

async function deleteBook(event){
    let wantedBook = event.target.parentElement.parentElement;

    const res = await fetch(`${baseURL}/${wantedBook.id}`, {
        method:'DELETE'
    });
    const data = await res.json();
    
    wantedBook.remove();
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

attachEvents()