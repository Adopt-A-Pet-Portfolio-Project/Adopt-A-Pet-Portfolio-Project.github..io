import { createPet } from '../api/data.js';
import {html} from '../lib.js';
import { showAlertBox, validatePetData } from '../util.js';

const createTemplate = (onSubmit, errors) => html`
    <section id="create">
                <div class="pageTitle">
                    <h1>Add A Pet For Adoption</h1>
                </div>
                <hr>
                <form @submit=${onSubmit} id="createForm">
                ${(errors && errors.name) ? html`<div class="errorDiv">${errors.name}</div>` : ''}
                    <label>Name: <input type="text" name="name" placeholder="Pet name"></label>
                    <label>Category: <fieldset class="formRadioBtns">
                            <input type="radio" name="category" value="dog" checked="true"><span> Dog</span>
                            <input type="radio" name="category" value="cat"><span> Cat</span>
                            <input type="radio" name="category" value="other"><span> Other</span>
                        </fieldset>
                    </label>
                    ${(errors && errors.img) ? html`<div class="errorDiv">${errors.img}</div>` : ''}
                    <label>Image: <input type="file" accept=".png, .jpg, .jpeg" name="img" placeholder="Image URL"></label>
                    ${(errors && errors.age) ? html`<div class="errorDiv">${errors.age}</div>` : ''}
                    <label>Age: <input type="text" id="ageField" name="age">
                        <select id="ageUnit" name="ageUnit">
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                            <option value="days">Days</option>
                        </select>
                    </label>
                    ${(errors && errors.weight) ? html`<div class="errorDiv">${errors.weight}</div>` : ''}
                    <label>Weight: <input type="text" id="weightField" name="weight">
                        <select id="weightUnit" name="weightUnit">
                            <option value="kg">kg</option>
                            <option value="gr">gr</option>
                        </select>
                    </label>
                    <label>Gender: <fieldset class="formRadioBtns">
                            <input type="radio" id="male" name="gender" value="Male" checked="true"><span> Male</span>
                            <input type="radio" id="female" name="gender" value="Female"><span> Female</span>
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
                    ${(errors && errors.city) ? html`<div class="errorDiv">${errors.city}</div>` : ''}
                    <label>City: <input type="text" name="city"
                            placeholder="Enter the current location of the pet">
                    </label>
                    ${(errors && errors.phone) ? html`<div class="errorDiv">${errors.phone}</div>` : ''}
                    <label>Phone: <input type="tel" name="phone"
                            placeholder="Enter phone number">
                    </label>
                    ${(errors && errors.description) ? html`<div class="errorDiv">${errors.description}</div>` : ''}
                    <label class="ml">Story: <textarea name="description"
                            placeholder="Shortly share the pet's story and add any additional information that might be important."></textarea></label>
                    <input class="button" id="submitBtn" type="submit" value="Add pet">
                </form>
            </section>`

export function createPage(ctx){
    ctx.switchTabs('addTab');
    return ctx.render(createTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        const formData = new FormData(e.target);

        const name = formData.get('name').trim();
        const img = formData.get('img');
        const ageNum = formData.get('age').trim();
        const ageUnits = formData.get('ageUnit');
        const age = ageNum + ' ' + ageUnits;    
        const weightNum = formData.get('weight').trim();
        const weightUnits = formData.get('weightUnit');
        const weight = weightNum + ' ' + weightUnits;
        const gender = formData.get('gender');
        const vaccinated = formData.get('vaccinated') == 'true' ? true : false;
        const neutered = formData.get('neutered') == 'true' ? true : false;
        const city = formData.get('city').trim();
        const category = formData.get('category');
        const description = formData.get('description').trim();
        const phone = formData.get('phone');

        const newPetData = {
            name,
            img,
            age,
            weight,
            gender,
            vaccinated,
            neutered,
            city,
            description,
            category,
            phone,
        }

        const errors = validatePetData(newPetData);

        if(Object.keys(errors).length != 0){
            ctx.render(createTemplate(onSubmit, errors))
            showAlertBox('Please enter valid data');
            btn.disabled=false;
        } else {
            showAlertBox('Please, wait...');
            await createPet(newPetData);
            showAlertBox('Pet added successfully.');
            e.target.reset();
            btn.disabled=false;
            ctx.page.redirect('/myPets');
        }
    }
}