import {html} from '../lib.js';

const editTemplate = () => html`
    <section id="edit">
                <div class="pageTitle">
                    <h1>Edit Pet Information</h1>
                </div>
                <hr>

                <form id="editForm">
                    <label>Name: <input type="text" name="name" placeholder="Pet name"></label>
                    <label>Image: <input type="file" name="img" placeholder="Image URL"></label>
                    <label>Age: <input type="text" id="ageField" name="age">
                        <select id="ageUnit">
                            <option value="days">Years</option>
                            <option value="months">Months</option>
                            <option value="years">Days</option>
                        </select>
                    </label>
                    <label>Weight: <input type="text" id="weightField" name="weight">
                        <select id="weightUnit">
                            <option value="gr">kg</option>
                            <option value="kg">gr</option>
                        </select>
                    </label>
                    <label>Gender: <fieldset class="formRadioBtns">
                            <input type="radio" name="gender" value="Male" checked="true"><span> Male</span>
                            <input type="radio" name="gender" value="Female"><span> Female</span>
                        </fieldset>
                    </label>
                    <label>Vaccinated: <fieldset class="formRadioBtns">
                            <input type="radio" name="vaccinated" value="true" checked="true"><span> Yes</span>
                            <input type="radio" name="vaccinated" value="false"><span> No</span>
                        </fieldset>
                    </label>
                    <label>Neutered: <fieldset class="formRadioBtns">
                            <input type="radio" name="neutered" value="true" checked="true"><span> Yes</span>
                            <input type="radio" name="neutered" value="false"><span> No</span>
                        </fieldset>
                    </label>
                    <label>City: <input type="text" name="city"
                            placeholder="Enter the current location of the pet"></label>

                    <label>Category: <fieldset class="formRadioBtns">
                            <input type="radio" name="category" value="dog" checked="true"><span> Dog</span>
                            <input type="radio" name="category" value="cat"><span> Cat</span>
                            <input type="radio" name="category" value="other"><span> Other</span>
                        </fieldset>
                    </label>
                    <label class="ml">Story: <textarea name="description"
                            placeholder="Shortly share the pet's story and add any additional information that might be important."></textarea></label>
                    <input class="button" type="submit" value="Update">
                </form>

                <hr>
            </section>`;

export function editPage(ctx){
    console.log('in edit page');
    return ctx.render(editTemplate());
}