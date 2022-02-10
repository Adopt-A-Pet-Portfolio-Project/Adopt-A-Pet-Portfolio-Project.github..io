import { html} from '../lib.js';
import { getUserData, showAlertBox } from '../util.js';

const watchlistTemplate = () => html`
    <section id="watchList">
                <div class="pageTitle">
                    <h1>My Watch List</h1>
                </div>
                <hr>

                <div class="noContent">You haven't added any pets to your list yet. <a href="/search">Search</a> for a
                    pet that suits your preferences.
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
            </section>`

export function watchlistPage(ctx){
    if(!getUserData()){
        showAlertBox('To access Watchlist, you need to be logged in.');
        return;
    }
    ctx.switchTabs('watchlistTab');
    return ctx.render(watchlistTemplate());
}