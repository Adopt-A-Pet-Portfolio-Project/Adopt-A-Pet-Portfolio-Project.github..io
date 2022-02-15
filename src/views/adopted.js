import { getAdopted } from '../api/data.js';
import { html, until } from '../lib.js';
import { spinner } from '../util.js';

const myPetsTemplate = (pets)  => html`
    <section id="adopted">
                <div class="pageTitle">
                    <h1>Adopted Pets</h1>
                </div>
                <hr>
                <div class="petContainer">
                ${until((async () => loadPets(await pets))(), spinner())}
                </div>
    </section>`
async function loadPets(pets){
    return html`
    ${pets.results.length!=0 
        ? pets.results.map(adoptedPetTemplate)
        : html`<div class="noContent">No pets have been adopted yet.</div>`
    }`
}

const adoptedPetTemplate = (pet) => html`
    <article class="adoptedPetArticle">
        <div class="adoptedPetImg">
            <img src=${pet.img.url}/>
        </div>
        <div class="adoptedPetName">
            ${pet.name}
        </div>
        <div class="adoptedPetStory">
           ${pet.description}
        </div>
    </article>`

export function adoptedPage(ctx) {
    ctx.switchTabs('adopted');

    const pets = getAdopted();
    ctx.render(myPetsTemplate(pets));
}