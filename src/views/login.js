import { login } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData, showAlertBox, validateLoginData } from '../util.js';

const loginTemplate = (onSubmit, errors) => html`
            <section id="login">
                <div class="pageTitle">
                    <h1>Login</h1>
                </div>
                <hr>
                <article>
                    <form @submit=${onSubmit} id="loginForm">
                        ${(errors && errors.username) ? html`<div class="errorDiv">${errors.username}</div>` : ''}
                        <label>Username: <input type="text" name="username"></label>
                        ${(errors && errors.password) ? html`<div class="errorDiv">${errors.password}</div>` : ''}
                        <label>Password: <input type="password" name="password"></label>
                        <input id="loginBtn" class="button" type="submit" value="Login">
                    </form>
                </article>
                <div class="notSigned">
                    <h4>Don't have a profile yet? Click <a href="/register">here</a> to register.</h4>
                </div>
            </section>`;

export function loginPage(ctx) {
    if(getUserData()){
        showAlertBox('You are already logged in.');
        return;
    }
    ctx.switchTabs('loginTab');
    return ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const btn = document.getElementById('loginBtn');
        btn.disabled = true;
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        const userData = {
            username,
            password,
        }
        
        const errors = validateLoginData(userData);

        if(Object.keys(errors).length !=0){
            ctx.render(loginTemplate(onSubmit, errors));
            showAlertBox('Please enter valid data.');
            btn.disabled = false;
        }
        try {
            await login(username, password);
            e.target.reset();            
            ctx.updateNav();
            ctx.page.redirect('/');
           
        } catch (error) {
            btn.disabled = false;
            showAlertBox(error.message);
        }        
    }
}