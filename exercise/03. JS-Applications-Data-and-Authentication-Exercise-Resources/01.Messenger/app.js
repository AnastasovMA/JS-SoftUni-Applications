const baseURL = `http://localhost:3030/jsonstore/messenger`;
let messageArea = document.getElementById('messages');

const sendButton = document.getElementById('submit');
const refreshButton = document.getElementById('refresh');


function attachEvents() {
    sendButton.addEventListener('click', postMessages);
    refreshButton.addEventListener('click', revealMessages);
}

async function postMessages(){
    let [author, content] = [document.querySelector('input[name="author"]'), document.querySelector('input[name="content"]')];

    if (author.value !== '' && content.value !== '') {
        await request(baseURL, { author: author.value, content: content.value });
        author.value = '';
        content.value = '';
    }
}

async function revealMessages(){
    let response = await fetch(baseURL);
    let data = await response.json();

    messageArea.value = Object.values(data).map(({author, content}) => `${author}: ${content}`).join('\n');
}

async function request(url, options){
    if (options) {
        options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(options)
        }
    }
    const response = await fetch(url, options);
    return response.json();

}

attachEvents();