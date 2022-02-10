import {html} from '../lib.js';

const allTemplate = () => html`
            <section id="all">
                <div class="pageTitle">
                    <h1>All pets</h1>
                </div>
                <hr>
                <div id="petListChoice">
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
                                        src='https://parsefiles.back4app.com/k9Up56EAJCdKbIfGfka2tvE6MrhMs6GWJDjsww3H/4078e1a28d379a3b2b5da7861bec302b_vayabeach.jpg'>
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
                <hr>
            </section>`;

export function allPage(ctx){
    ctx.switchTabs('allTab');
    return ctx.render(allTemplate());
}