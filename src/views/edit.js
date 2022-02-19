import { getPetById, updatePet, updatePetWithNewImg } from '../api/data.js';
import {html} from '../lib.js';
import { getPetFromForm, showAlertBox, validatePetData } from '../util.js';

const editTemplate = (pet, onSubmit, errors) => html`
    <section id="edit">
                <div class="pageTitle">
                    <h1>Edit Pet Information</h1>
                </div>
                <hr>

                <form @submit=${onSubmit} id="editForm">
                    ${(errors && errors.name) ? html`<div class="errorDiv">${errors.name}</div>` : ''}
                    <label>Name: <input type="text" name="name" placeholder="Pet name" .value=${pet.name}></label>
                    <label>Category: <fieldset class="formRadioBtns">
                            <input type="radio" name="category" value="dog" ?checked=${pet.category=="dog"} ><span> Dog</span>
                            <input type="radio" name="category" value="cat" ?checked=${pet.category=="cat"}><span> Cat</span>
                            <input type="radio" name="category" value="other" ?checked=${pet.category=="other"} ><span> Other</span>
                        </fieldset>
                    </label>
                    ${(errors && errors.img) ? html`<div class="errorDiv">${errors.img}</div>` : ''}
                    <div class="messageDiv">If you are happy with the current image you do not need to upload a file.</div>
                    <label>Image: <input type="file" name="img" placeholder="Image URL"></label>
                    ${(errors && errors.age) ? html`<div class="errorDiv">${errors.age}</div>` : ''}
                    <label>Age: <input type="text" id="ageField" name="age" .value=${pet.ageNum}>
                        <select id="ageUnit" name="ageUnit">
                            <option value="days" ?selected=${pet.ageUnit=="days"}>Days</option>
                            <option value="months" ?selected=${pet.ageUnit=="months"}>Months</option>
                            <option value="years" ?selected=${pet.ageUnit=="years"}>Years</option>
                        </select>
                    </label>
                    ${(errors && errors.weight) ? html`<div class="errorDiv">${errors.weight}</div>` : ''}
                    <label>Weight: <input type="text" id="weightField" name="weight" .value=${pet.weightNum}>
                        <select id="weightUnit" name="weightUnit">
                            <option value="gr" ?selected=${pet.weightUnit=="gr"}>kg</option>
                            <option value="kg" ?selected=${pet.weightUnit=="gr"}>gr</option>
                        </select>
                    </label>
                    <label>Gender: <fieldset class="formRadioBtns">
                            <input type="radio" name="gender" value="Male" ?checked=${pet.gender=='Male'}><span> Male</span>
                            <input type="radio" name="gender" value="Female" ?checked=${pet.gender=='Female'}><span> Female</span>
                        </fieldset>
                    </label>
                    <label>Vaccinated: <fieldset class="formRadioBtns">
                            <input type="radio" name="vaccinated" value="true" ?checked=${pet.vaccinated}><span> Yes</span>
                            <input type="radio" name="vaccinated" value="false" ?checked=${!pet.vaccinated}><span> No</span>
                        </fieldset>
                    </label>
                    <label>Neutered: <fieldset class="formRadioBtns">
                            <input type="radio" name="neutered" value="true" ?checked=${pet.neutered}><span> Yes</span>
                            <input type="radio" name="neutered" value="false" ?checked=${!pet.neutered}><span> No</span>
                        </fieldset>
                    </label>
                    ${(errors && errors.city) ? html`<div class="errorDiv">${errors.city}</div>` : ''}
                    <label>City: <input type="text" name="city"
                            placeholder="Enter the current location of the pet" .value=${pet.city}>
                    </label>
                    ${(errors && errors.phone) ? html`<div class="errorDiv">${errors.phone}</div>` : ''}
                    <label>Phone: <input type="tel" name="phone"
                            placeholder="Enter phone number" .value=${pet.phone}>
                    </label>
                    ${(errors && errors.description) ? html`<div class="errorDiv">${errors.description}</div>` : ''}
                    <label class="ml">Story: <textarea name="description"
                            placeholder="Shortly share the pet's story and add any additional information that might be important."
                            .value=${pet.description}>
                        </textarea>
                    </label>
                    <input id="submitBtn" class="button" type="submit" value="Update">
                </form>

                <hr>
            </section>`;

export async function editPage(ctx){

    const id = ctx.params.id;
    let pet = await getPetById(id);
    pet = addAgeAndWeightProperties(pet);

    return ctx.render(editTemplate(pet, onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;

        let newPetData = getPetFromForm(e.target);

        const errors = validatePetData(newPetData, e.target.id);

        if(Object.keys(errors).length != 0){
            newPetData = addAgeAndWeightProperties(newPetData);
            ctx.render(editTemplate(newPetData, onSubmit, errors))
            showAlertBox('Please enter valid data');
            btn.disabled=false;
        } else {
            showAlertBox('Please, wait...');
            newPetData.adopted=pet.adopted;
            newPetData.author=pet.author;
            try {
                if(newPetData.img.size==0){
                    delete newPetData.img;
                    await updatePet(newPetData, id);
                }
                else{
                    await updatePetWithNewImg(newPetData, id);
                }
                showAlertBox('Pet updated successfully.');
                btn.disabled=false;
                e.target.reset();
                ctx.page.redirect(`/details/${id}`);
            } catch (error) {
                showAlertBox('Unsuccessful action. Please try again.');
                btn.disabled=false;
            }            
        }
    }

    function addAgeAndWeightProperties(petObject){
        let [ageNum, ageUnit] = [...petObject.age.split(' ')];
        let [weightNum, weightUnit] = [...petObject.weight.split(' ')];
        Object.assign(petObject, {ageNum, ageUnit, weightNum, weightUnit});
        return petObject;
    }
}