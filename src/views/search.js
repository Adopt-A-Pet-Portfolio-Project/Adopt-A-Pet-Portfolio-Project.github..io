import {html} from '../lib.js';

const searchTemplate = () => html`
            <section id="search">
                <div class="pageTitle">
                    <h1>Search</h1>
                </div>
                <hr>
                <h2>Find the perfect pet for you!</h2>

                <div id="searchField">
                    <input name="searchCity" type="text" placeholder="Type a city">
                    <a class="button" href="javascript:void(0)"><i class="fas fa-search"></i></a>
                </div>
                <div id="searchRadioBtns">
                        <input type="radio" name="category" value="dog"><span> Dog</span>
                        <input type="radio" name="category" value="cat"><span> Cat</span>
                        <input type="radio" name="category" value="other"><span> Other</span>

                            <input type="radio" id="male" name="gender" value="Male"><span> Male</span>
                            <input type="radio" name="gender" value="Female"><span> Female</span>
                </div>
                <div id="searchResults">

                    <div class="noContent">There are no results that match your preferences.
                    </div>

                    <div class="petListContainer">
                        <article title='Click to see details'>
                            <a href='#'>
                                <div class="petCard">
                                    <table>
                                        <img class="petImg"
                                            src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/chocolate-border-collie-warren-photographic.jpg'>
                                        <tbody>
                                            <tr>
                                                <td>Name:</td>
                                                <td>Sharo</td>
                                            </tr>
                                            <tr>
                                                <td>City:</td>
                                                <td>Varna</td>
                                            </tr>
                                            <tr>
                                                <td>Gender:</td>
                                                <td>Male</td>
                                            </tr>
    
                                        </tbody>
                                    </table>
                                </div>
                            </a>
                        </article>
                    </div>
                </div>

            </section>`;

export function searchPage(ctx){
    ctx.switchTabs('searchTab');
    return ctx.render(searchTemplate());
}