//1 take the navigators
let url = `http://localhost:3030/data/catches/`;

const guestNavigator = document.querySelector('#guest');
const userNavigator = document.querySelector('#user');
const logoutBtn = document.querySelector('#logout');

const form = document.querySelector('form');
const addBtn = document.querySelector('form button');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.clear();
    location.reload();
})

let userEmail = localStorage.getItem('userEmail')

if (userEmail) {
    let divUsername = document.querySelector('.email span');
    divUsername.textContent = userEmail;
    userNavigator.style.display = 'inline';
    guestNavigator.style.display = 'none';

    addBtn.disabled = false;
} else {
    userNavigator.style.display = 'none';
    guestNavigator.style.display = 'inline';
    addBtn.disabled = true;
}

async function attachEvents() {
    const loadBtn = document.querySelector('.load');

    loadBtn.addEventListener('click', loadCatches);
    form.addEventListener('submit', addCache)
}

async function addCache(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let angler = formData.get('angler');
    let weight = formData.get('weight');
    let species = formData.get('species');
    let location = formData.get('location');
    let bait = formData.get('bait');
    let captureTime = formData.get('captureTime');

    if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
        return alert('All fields must be field');
    }
    if (Number(angler) || Number(species) || Number(location) || Number(bait)) {
        return alert('Input needs to be a string')
    }
    if (isNaN(weight) || isNaN(captureTime)) {
        return alert('Input must be a number');
    }

    try {
        const response = await fetch('http://localhost:3030/data/catches/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Autorization': localStorage.getItem('authToken') // potential error
            },//potential error in the parse
            body: JSON.stringify({
                angler,
                weight:Number(weight),
                species,
                location,
                bait,
                captureTime:Number(captureTime)
            })
        });

        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        form.reset();
        loadCatches();
        

    } catch (error) {
        alert(error.message)
    }
}

async function loadCatches(){
    const divCatches = document.querySelector('#catches')
    divCatches.replaceChildren();

    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();

}
attachEvents()