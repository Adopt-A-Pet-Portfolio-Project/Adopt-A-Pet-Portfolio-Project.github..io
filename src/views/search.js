import { getPetsFromSearch } from '../api/data.js';
import {html, render, until} from '../lib.js';
import { showAlertBox, spinner, loadPetList } from '../util.js';

const searchTemplate = (onSearch, toggleBtn) => html`
            <section id="search">
                <div class="pageTitle">
                    <h1>Search</h1>
                </div>
                <hr>
                <h2>Find the perfect pet for you!</h2>

                <div id="searchField">
                    <input id="searchCity" type="text" placeholder="Type a city">
                    <a @click=${onSearch} class="button" href="javascript:void(0)"><i class="fas fa-search"></i></a>
                </div>
                <div id="searchRadioBtns" @mousedown=${toggleBtn}>
                        <input type="radio" name="category" value="dog" toggle="passive"><span> Dog</span>
                        <input type="radio" name="category" value="cat" toggle="passive"><span> Cat</span>
                        <input type="radio" name="category" value="other" toggle="passive"><span> Other</span>

                            <input type="radio" id="male" name="gender" value="Male"><span> Male</span>
                            <input type="radio" name="gender" value="Female"><span> Female</span>
                </div>
                <div id="searchResults">

                    
                </div>

            </section>`;

const searchResultsTemplate = (searchResults) => html`
        ${searchResults.results.length==0 
        ? html`
            <div class="noContent">
                There are no results that match your preferences.
            </div>` 
        : html`
            <div class="noContent">
                ${searchResults.results.length} pets found.
            </div>
            <div class="petListContainer">
            ${loadPetList(searchResults.results)}
            </div>`}`;

export function searchPage(ctx){
    ctx.switchTabs('searchTab');
    return ctx.render(searchTemplate(onSearch, toggleBtn));

    async function onSearch(){
        const resultsContainer = document.getElementById('searchResults');
        const city = document.getElementById('searchCity').value;
        const category = document.querySelector('#searchRadioBtns input[name="category"]:checked');
        const gender = document.querySelector('#searchRadioBtns input[name="gender"]:checked');
        if(city=="" && category == null && gender == null){
            showAlertBox('Please select at least one search criteria.');
            return;
        }
        const searchResults = getPetsFromSearch(city, category, gender);
        render(until((async () => searchResultsTemplate(await searchResults))(), spinner()), resultsContainer);
        //ctx.render(searchTemplate(onSearch));
    };

    function toggleBtn(e){
        console.log(e.target.checked);
        
        if(e.target.checked){
            e.target.addEventListener('click', onClickToggle);            
        }
        function onClickToggle(e){
            e.target.checked=false;
            e.target.removeEventListener('click', onClickToggle)
        }   
    }
}