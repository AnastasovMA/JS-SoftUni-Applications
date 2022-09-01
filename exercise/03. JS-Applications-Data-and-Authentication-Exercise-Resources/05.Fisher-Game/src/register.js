const formElement = document.querySelector('form');
let userView = document.getElementById('user');
let guestView = document.getElementById('guest');

userView.style.display = 'none';
guestView.style.display = 'inline-block';

formElement.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();

    let formData = new FormData(event.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    if (email == '' || password == '' || rePass == '') {
        alert('All fields must be filled');
        return;
    } else if (password != rePass){
        alert('Passwords don\'t match');
        return;
    }

    try {
        const response = await fetch(' http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json();

        if (!response.ok || response.status !== 200) {
            formElement.reset();
            throw new Error(data.message)
        }

        localStorage.setItem('userID', data._id);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('accessToken', data.accessToken);
        alert('Successful registration');
        window.location.href = './index.html';

    } catch (error) {
        alert(error.message);
    }
}