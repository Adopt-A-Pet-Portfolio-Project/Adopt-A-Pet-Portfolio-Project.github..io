import { getWatchedPets, getWatchlistIds } from '../api/data.js';
import { html, until} from '../lib.js';
import { getUserData, loadPetList, showAlertBox, spinner } from '../util.js';

const watchlistTemplate = (watchedPets) => html`
    <section id="watchList">
                <div class="pageTitle">
                    <h1>My Watch List</h1>
                </div>
                <hr>
                ${watchedPets 
                ? ''
                : html`
                <div class="noContent">You haven't added any pets to your list yet. <a href="/search">Search</a> for a
                    pet that suits your preferences.
                </div>`}                
                <div class="petListContainer">
                    ${watchedPets ? loadPetList(watchedPets.results) : ''}
                </div>
            </section>`

export async function watchlistPage(ctx){
    if(!ctx.user){
        showAlertBox('To access Watchlist, you need to be logged in.');
        return;
    }
    ctx.switchTabs('watchlistTab');
    const watchItems = await getWatchlistIds(ctx.user.id);
    const watchedIds = watchItems.results.map(x=>x.petId);
    let watchedPets = null;
    if(watchedIds.length!=0){
        watchedPets = getWatchedPets(watchedIds);
    }
    return ctx.render(until((async () => watchlistTemplate(await watchedPets))(), spinner()));
}