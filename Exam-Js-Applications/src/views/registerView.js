import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from "../services/userService.js"

const registerTemplate = (submitHandler) => html`
<section id="register-page" class="auth">
    <form id="register" @submit=${submitHandler}>
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`

export const registerView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();

        const { email, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

        if (email == '' || password == '') {
            return alert('All fields are required');
        }
        if (repeatPassword != password) {
            return alert('Passwords must match')
        }

        userService.register(email, password)
            .then(user => {
                ctx.page.redirect('/')
            })
            .catch(err => {
                return alert(err);
            })
    }

    ctx.render(registerTemplate(submitHandler));
}