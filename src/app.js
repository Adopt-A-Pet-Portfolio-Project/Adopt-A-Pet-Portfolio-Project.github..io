import * as api from './api/data.js';
import { page, render} from './lib.js'
import { getUserData } from './util.js';
import { allPage } from './views/all.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myPetsPage } from './views/myPets.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';
import { watchlistPage } from './views/watchlist.js';


window.api = api;

const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(contextDecorator);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/all', allPage);
page('/search', searchPage);
page('/myPets', myPetsPage);
page('/watchlist', watchlistPage);
page('/add', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.start();
updateNav();

function contextDecorator(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.user = getUserData();
    ctx.updateNav = updateNav;
    ctx.switchTabs = switchTabs;
    next();
}

function updateNav(){
    const user = getUserData();
    if(user){
        document.getElementById('user').style.display='block';
        document.getElementById('guest').style.display='none';
        document.querySelector('#user span').textContent=`Welcome, ${user.username}`;
    }
    else{
        document.getElementById('user').style.display='none';
        document.getElementById('guest').style.display='block';
    }
}

async function onLogout(e){
    e.target.classList.add('clicked');
    await api.logout();
    e.target.classList.remove('clicked');
    updateNav();
    page.redirect('/');
}

function switchTabs(tabId){
    const tabs =[...document.querySelectorAll('.navbarSection a')];
    tabs.forEach(t=>{
        if(t.id==tabId){
            t.classList.add('activeTab');
        }
        else{
            t.setAttribute("class", "")
        }
    })
}