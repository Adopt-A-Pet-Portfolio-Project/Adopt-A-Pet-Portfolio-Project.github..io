import { getPetsByAuthor } from '../api/data.js';
import { html, until} from '../lib.js';
import { loadPetList, showAlertBox, spinner } from '../util.js';

const myPetsTemplate = (myPets)  => html`
    <section id="myPets">
                <div class="pageTitle">
                    <h1>My Pets</h1>
                </div>
                <hr>
                ${myPets.results.length==0 
                ? html`<div class="noContent">You haven't got any pets listed for adoption.</div>`
                : ''}                
                <div id="addBtnDiv"><a class="button" href="/add">Add new</a></div>
                <div class="petListContainer">
                    ${myPets.results.lenght!=0
                    ? loadPetList(myPets.results)
                    : '' }
                </div>
            </section>`;

export function myPetsPage(ctx){
    if(!ctx.user){
        showAlertBox('To access My Pets, you need to be logged in.');
        return;
    }
    ctx.switchTabs('myPetsTab');

    const myPets = getPetsByAuthor(ctx.user.id);
    return ctx.render(until((async () => myPetsTemplate(await myPets))(), spinner()));
}