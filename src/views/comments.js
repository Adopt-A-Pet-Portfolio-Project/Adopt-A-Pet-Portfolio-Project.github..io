import { addComment, getCommentById, getCommentsByPetId } from '../api/data.js';
import { html, render, until} from '../lib.js';
import { showAlertBox, spinner } from '../util.js';

const commentsBoxTemplate = (comments, user, onSubmit) => html`
        ${comments.results.length==0 
        ? html`<div class="noContent">There are no comments about this pet.</div>` 
        : comments.results.map(x=>commentTemplate(x, user))}
        ${user 
            ? html`<div id = "commentFormDiv">
                <form @submit = ${async function(e){onSubmit(e, comments)}} id="newComment">
                    <textarea name="commentText" placeholder="Type your comment here"></textarea>
                    <input id="submitBtn" type="submit" class="button" value="Add comment">
                </form>
                </div>`
            : html`<div class="notSigned">
                    <h4>To add a comment about this pet, please
                    <a href="/login">login</a> to your account or <a href="/register">register.</a>
                    </h4>
                </div>`}`;

const commentTemplate = (comment, user) => html`
        <div class="comment">
            <h5 class="commentAuthor">${(user && user.id==comment.author.objectId) ? 'Me' : comment.author.username}</h5>
            <p class="date">${new Date(comment.createdAt).toLocaleString()}</p>
            <p class="commentText">${comment.content}</p>
        </div>`;

export async function renderComments(petId, user, container){
    let comments = getCommentsByPetId(petId);
    console.log(await comments);

    render(until((async () => commentsBoxTemplate(await comments, user, onSubmit))(), spinner()), container);

    async function onSubmit(e, currentComments){
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;

        const formData = new FormData(e.target);
        const content = formData.get('commentText').trim();
        if(content=='' || content.length>300){
            showAlertBox("Comment cannot be empty or more than 300 symbols.");
        } else{
            try {
                let newCommentResult = await addComment({content, petId});
                e.target.reset();
                let newComment = await getCommentById(newCommentResult.objectId);
                console.log(newComment);
                currentComments.results.push(newComment);
                console.log(currentComments);
                render(commentsBoxTemplate(currentComments, user, onSubmit), container);
            } catch (error) {
                console.log(error);
                showAlertBox("Unsuccessful action. Please try again.")
            }
        }
        btn.disabled = false;
    }
}