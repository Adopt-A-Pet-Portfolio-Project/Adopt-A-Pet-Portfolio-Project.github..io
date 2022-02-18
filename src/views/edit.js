import { getPetById } from '../api/data.js';
import {html} from '../lib.js';

const editTemplate = (pet) => html`
    <section id="edit">
                <div class="pageTitle">
                    <h1>Edit Pet Information</h1>
                </div>
                <hr>

                <form id="editForm">
                    <label>Name: <input type="text" name="name" placeholder="Pet name" .value=${pet.name}></label>
                    <label>Category: <fieldset class="formRadioBtns">
                            <input type="radio" name="category" value="dog" ?checked=${pet.category=="dog"} ><span> Dog</span>
                            <input type="radio" name="category" value="cat" ?checked=${pet.category=="cat"}><span> Cat</span>
                            <input type="radio" name="category" value="other" ?checked=${pet.category=="other"} ><span> Other</span>
                        </fieldset>
                    </label>
                    <label>Image: <input type="file" name="img" placeholder="Image URL"></label>
                    <label>Age: <input type="text" id="ageField" name="age" .value=${pet.ageNum}>
                        <select id="ageUnit">
                            <option value="days" ?selected=${pet.ageUnit=="days"}>Days</option>
                            <option value="months" ?selected=${pet.ageUnit=="months"}>Months</option>
                            <option value="years" ?selected=${pet.ageUnit=="years"}>Years</option>
                        </select>
                    </label>
                    <label>Weight: <input type="text" id="weightField" name="weight" .value=${pet.weightNum}>
                        <select id="weightUnit">
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
                    <label>City: <input type="text" name="city"
                            placeholder="Enter the current location of the pet" .value=${pet.city}>
                    </label>
                    <label>Phone: <input type="tel" name="phone"
                            placeholder="Enter phone number" .value=${pet.phone}>
                    </label>
                    <label class="ml">Story: <textarea name="description"
                            placeholder="Shortly share the pet's story and add any additional information that might be important."
                            .value=${pet.description}>
                        </textarea>
                    </label>
                    <input class="button" type="submit" value="Update">
                </form>

                <hr>
            </section>`;

export async function editPage(ctx){
    console.log('in edit page');
    const id = ctx.params.id;
    const pet = await getPetById(id);
    let [ageNum, ageUnit] = [...pet.age.split(' ')];
    let [weightNum, weightUnit] = [...pet.weight.split(' ')];
    Object.assign(pet, {ageNum, ageUnit, weightNum, weightUnit});
    console.log(pet);
    console.log(pet.category=="cat");
    return ctx.render(editTemplate(pet));
}