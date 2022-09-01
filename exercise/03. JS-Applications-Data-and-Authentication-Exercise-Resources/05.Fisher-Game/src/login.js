const formElement = document.querySelector('form');
let userView = document.getElementById('user');
let guestView = document.getElementById('guest');

userView.style.display = 'none';
guestView.style.display = 'inline-block';

formElement.addEventListener('submit', loginUser);

async function loginUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let email = formData.get('email');
    let password = formData.get('password');

    if (email == '') {
        alert('fill the email field');
        return;
    } else if (password == '') {
        alert('fill the password field');
        return;
    }

    try {

        const response = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json();

        if (!response.ok || response.status !== 200) {
            formElement.reset();
            throw new Error(data.message)
        }

        localStorage.setItem('userID', data._id);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('accessToken', data.accessToken)
        window.location.href = './index.html'
        alert('Successful login');

    } catch (error) {
        alert(error.message);
    }



}