import { getPetById } from '../api/data.js';
import { html} from '../lib.js';

const detailsTemplate = (pet, user, owner) => html`
    <section id="details">
                <div class="pageTitle">
                    <h1>Details</h1>
                </div>
                <hr>
                <h2>
                    Hi, my name is ${pet.name} and I can't wait to meet you!
                </h2>
                <div id="petDetails">
                    <article>                        
                        <div id="petDetailsImg">
                            <a href=${pet.img.url}>
                                <img src=${pet.img.url}>
                            </a>
                            <a title="Add to Watch List" id="addToWatchList" href="#"><i class="fas fa-eye"></i></a>
                            <a title="Remove from Watch List" id="removeFromWatchList" href="#"><i
                                    class="fas fa-eye-slash"></i></a>
                        </div>
                    </article>
                    <article id="petDetailsInfo">

                        <h5>
                            Here is some more information to help you get to know me better.
                        </h5>
                        <div>
                            <span><i class="fas fa-venus-mars"></i> ${pet.gender}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${pet.city}</span>
                        </div>
                        <div>
                            <span>Age: ${pet.age}</span>
                            <span>Weight: ${pet.weight}</span>
                        </div>
                        <div>
                            <span>Vaccinated: ${pet.vaccinated ? 'Yes' : 'No'}</span>
                            <span>Neutered: ${pet.neutered ? 'Yes' : 'No'}</span>
                        </div>
                        <div>
                            <span title="Show pnone number"><i class="fas fa-phone-square-alt"></i> Ask about me:</span>
                            <span id="phoneNumber">${pet.phone}</span>
                        </div>
                    </article>
                </div>
                <div id="petStory">
                    <p>${pet.description}</p>
                </div>
                ${owner 
                    ? html`<div id="ownerButtons">
                    <a class="button" id="editBtn" href="#">Edit</a>
                    <a class="button" id="removeBtn" href="#">Remove</a>
                    <a class="button" id="adoptBtn" href="#">Adopted</a>
                </div>`
                    : ''}                

                <h2>
                    Comments
                </h2>
                <div id="comments">
                    <div class="comment">
                        <h5 class="commentAuthor">Username</h5>
                        <p class="date">25/01/2020</p>
                        <p class="commentText">Is there any information about the parents?</p>
                    </div>
                    <div class="comment">
                        <h5 class="commentAuthor">Other guy</h5>
                        <p class="date">25/01/2020</p>
                        <p class="commentText">Only about the mother. She is german shepherd.</p>
                    </div>
                    <div class="noContent">There are no comments about this pet.</div>

                    <div>
                        <form id="newComment">
                            <textarea name="commentText" placeholder="Type your comment here"></textarea>
                            <input type="submit" class="button" value="Add comment">
                        </form>
                    </div>
                    <div class="notSigned">
                        <h4>To add a comment about this pet, please
                            <a href="/login">login</a> to your account or <a href="/register">register.</a>
                        </h4>
                    </div>
                </div>

            </section>`

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const user = ctx.user;
    const pet = await getPetById(id);
    const owner = user && user.id==pet.author.objectId;
    console.log(owner);
    return ctx.render(detailsTemplate(pet, user, owner));
}