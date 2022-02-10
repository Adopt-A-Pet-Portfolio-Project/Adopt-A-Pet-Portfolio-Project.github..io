import { html} from '../lib.js';
import { getUserData, showAlertBox } from '../util.js';

const myPetsTemplate = ()  => html`
    <section id="myPets">
                <div class="pageTitle">
                    <h1>My Pets</h1>
                </div>
                <hr>

                <div class="noContent">You haven't got any pets listed for adoption.</div>

                <div id="addBtnDiv"><a class="button" href="/create">Add new</a></div>
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
                    <article title='Click to see details'>
                        <a href='#'>
                            <div class="petCard">
                                <table>
                                    <img class="petImg"
                                        src='https://parsefiles.back4app.com/K7ZlhHiFoikaEPDRsEX41o3SBhHWqx5oUMxgdGKp/01579f0ce1a38b992be34387009b5788_20220130_130821.jpg'>
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
            </section>`;


export function myPetsPage(ctx){
    if(!getUserData()){
        showAlertBox('To access My Pets, you need to be logged in.');
        return;
    }
    ctx.switchTabs('myPetsTab');
    return ctx.render(myPetsTemplate());
}