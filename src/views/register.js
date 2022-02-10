import { register } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData, showAlertBox, validateRegistrationData } from '../util.js';

const registerTemplate = (onSubmit, errors) => html`
             <section id="register">
                <div class="pageTitle">
                    <h1>Register</h1>
                </div>
                <hr>
                <article>
                    <form @submit=${onSubmit} id="registerForm">
                        ${(errors && errors.username) ? html`<div class="errorDiv">${errors.username}</div>` : ''}
                        <label>Username: <input type="text" name="username"></label>
                        ${(errors && errors.email) ? html`<div class="errorDiv">${errors.email}</div>` : ''}
                        <label>E-mail: <input type="text" name="email"></label>
                        ${(errors && errors.password) ? html`<div class="errorDiv">${errors.password}</div>` : ''}
                        <label>Password: <input type="password" name="password"></label>
                        ${(errors && errors.rePass) ? html`<div class="errorDiv">${errors.rePass}</div>` : ''}
                        <label>Repeat: <input type="password" name="rePass"></label>
                        <input class="button" id="submitBtn" type="submit" value="Register">
                    </form>
                </article>
                <div class="notSigned">
                    <h4>Already have a profile? Click <a href="/login">here</a> to login.</h4>
                </div>
            </section>`;

export function registerPage(ctx){
    if(ctx.user){
        showAlertBox('You are already logged in.');
        return;        
    }
    ctx.switchTabs('registerTab');
    return ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;

        const formData = new FormData(e.target);

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        const newUserData = {
            username,
            email,
            password,
            rePass,
        };

        const errors = validateRegistrationData(newUserData);

        if(Object.keys(errors).length!=0){

            ctx.render(registerTemplate(onSubmit, errors));
            showAlertBox('Please enter valid data');
            btn.disabled = false;

        } else{
            showAlertBox('Please, wait...');
            await register(username, email, password);
            showAlertBox('Successful registration.');
            e.target.reset();
            btn.disabled=false;
            ctx.updateNav();
            ctx.page.redirect('/all');
        }
    }
}