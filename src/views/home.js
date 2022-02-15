import { getRecentPets } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const homeTemplate = (pets, user) => html`
    <section id="home">

        <div class="pageTitle">
            <h1>Welcome to Adopt A Pet!</h1>
        </div>
        <hr>
        <div id="homeScreen">
            <section class="homeSection" id="mission">
                <h2>Our mission</h2>
                    <p> Connecting animals in need of home with homes in need of animals.</P>                    
            </section>
            
            <section class="homeSection" id="recent">
                <h2>Most recent animals</h2>
                <div id="recentPetsWindow">
                    ${pets.map(petCardTemplate)}
                </div>

                <a class="button" id="seeAllBtn" href="/all">See all</a>
            </section>
            <section class="homeSection" id="adoptions">
                <h2>Our achievements</h2>
                <a href='/adopted'>
                    <div id="adoptionsDiv"  title="See our adopted animals">
                        <div id="beginnings">beginnings</div>
                        <div id="adoptionsText">Happy <span>endings</span></div>
                    </div>                   
                </a>                    
            </section>
        </div>
        
        ${!user ? html`
            <hr>
            <div class="notSigned">
                <h4>To access your watch list or add a new animal, please
                    <a href="/login">login</a> to your account or <a href="/register">register.</a>
                </h4>
            </div>` 
            : ''}

    </section>`;

const petCardTemplate = (pet) => html`
    <article class="petPreview" title='Click to see details'>
                <a href=${'/details/' + pet.objectId}>
                    <div>
                        <table>
                            <img class="petImg"
                                src=${pet.img.url}>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>${pet.name}</td>
                                </tr>
                                <tr>
                                    <td>City:</td>
                                    <td>${pet.city}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>${pet.gender}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </a>
            </article>`

export async function homePage(ctx) {
    ctx.switchTabs('');
    const user = getUserData();
    const recentPets = await getRecentPets();
    return ctx.render(homeTemplate(recentPets.results, user));

}