import { getAllPets } from '../api/data.js';
import { html, until } from '../lib.js';
import { loadPetList, spinner } from '../util.js';

const allTemplate = (pets, onChange) => html`
            <section id="all">
                <div class="pageTitle">
                    <h1>All pets</h1>
                </div>
                <hr>
                <div @change=${onChange} id="petListChoice" >
                    <input type="radio" id="all" name="choice" value="all" checked="true">
                    <label for="all">All</label>

                    <input type="radio" id="dogs" name="choice" value="dog">
                    <label for="dogs">Dogs</label>

                    <input type="radio" id="cats" name="choice" value="cat">
                    <label for="cats">Cats</label>

                    <input type="radio" id="others" name="choice" value="other">
                    <label for="others">Others</label>
                </div>
                <div class="petListContainer">
                ${pets.length==0 
                    ? html`<div class="noContent">There are no pets to show.
                    </div>` 
                    : ''}
                ${until((async () => loadPetList(pets))(), spinner())}    
                </div>

                <hr>
            </section>`;


export async function allPage(ctx) {
    ctx.switchTabs('allTab');
    const response = await getAllPets();
    const allPets = response.results;
    return ctx.render(allTemplate(allPets, onChange));

    function onChange(e) {
        let category = (e.target.value);

        if (category != "all") {

            let filteredPets = allPets.filter(x => x.category == category);
            console.log(filteredPets);
            console.log(allPets.results);
            ctx.render(allTemplate(filteredPets, onChange));

        } else {
            ctx.render(allTemplate(allPets, onChange));
        }

    }
}