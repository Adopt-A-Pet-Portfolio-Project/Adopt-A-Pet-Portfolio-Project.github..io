import { html} from './lib.js'

export function setUserData(userData){
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData(){
    return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData(){
    localStorage.removeItem('userData');
}

const phoneRegEx = /^\+?[0-9\s]{6,20}$/;
const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

export function validatePetData(petData){
    let errors = {};
    if(petData.name=="" || petData.name.length < 2 || petData.name.length > 15){
        errors.name = 'Name must be between 2 and 15 characters long.'
    }
    if(petData.img.size <= 0 || petData.img.size > 5242880){
        errors.img = 'Image is required and must be up to 5MB.'
    }
    const age = Number(petData.age.split(' ')[0]);
    if(isNaN(age) || age <= 0 || age > 30){
        errors.age = 'Age must be a valid number up to 30.'
    }
    const weight = Number(petData.weight.split(' ')[0]);
    if(isNaN(weight) || weight <= 0 || weight > 1000){
        errors.weight = 'Weight must be a valid number up to 1000.';
    }
    if(petData.city=='' || petData.city.length < 3 || petData.city.length > 25){
        errors.city = 'City must be between 3 and 25 characters long.';
    }    
    if(petData.phone=='' || !phoneRegEx.test(petData.phone)){
        errors.phone = 'Phone number must be between 6 and 20 digits long.';
    }
    if(petData.description=='' || petData.description.length < 50 || petData.description.length > 2000){
        errors.description = 'Description must be between 50 and 2000 characters long.'
    }
    return errors;
}

export function validateRegistrationData(userData){
    let errors = {};

    if(userData.username == '' || userData.username.length < 4 || userData.username.length > 20){
        errors.username = 'Username must be between 4 and 20 characters long.';
    }
    if(userData.email == '' || userData.email.length > 50 || !emailRegEx.test(userData.email)){
        errors.email = 'Please enter valid email up to 50 characters long.';
    }
    if(userData.password == '' || userData.password.length < 5 || userData.password > 50){
        errors.password = 'Password must be between 5 and 50 characters long.';
    }
    if(userData.rePass != userData.password){
        errors.rePass = 'Passwords do not match.';
    }

    return errors;
}

export function validateLoginData(userData){
    let errors = {};

    if(userData.username == '' || userData.username.length < 4 || userData.username.length > 20){
        errors.username = 'Username must be between 4 and 20 characters long.';
    }
    if(userData.password == '' || userData.password.length < 5 || userData.password > 50){
        errors.password = 'Password must be between 5 and 50 characters long.';
    }

    return errors;
}

export function showAlertBox(message){
    const box = document.createElement('div');
    box.classList.add('alertBox');
    const p = document.createElement('p');
    const x = document.createElement('a');
    x.textContent='X';
    x.style.border="solid";
    p.textContent=message;
    box.appendChild(p);
    box.appendChild(x);
    box.addEventListener('click', hideBox);
    const el = document.querySelector('section');
    el.appendChild(box);
    setTimeout(() => {
        hideBox()
    }, 5000);

    function hideBox(){
        box.remove();
    }
}

export const spinner = () => html`<p>Please, wait &hellip;</p>`;

export function loadPetList(pets) {

    const petPreviewTemplate = (pet) => html`
    <article title='Click to see details'>
            <a href='/details/${pet.objectId}'>
                <div class="petCard">
                    <table>
                        <img class="petImg"
                            src=${pet.img.url}>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>${pet.name}</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td>${pet.city}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>${pet.gender}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </a>
    </article>`;

    const petList = (pets) => html`
    ${pets.map(petPreviewTemplate)}`;

    return petList(pets);
}

export function buildSearchQuery(city, category, gender){
    
    const queryObject = {
        adopted : false
    };
    if(city!=''){
        queryObject.city = {"$regex": "(?i)"+city};
    }
    if(category!=null){
        queryObject.category = category.value;
    }
    if(gender!=null){
        queryObject.gender = gender.value;
    }
    console.log(queryObject);
    return JSON.stringify(queryObject);    
}

export function buildAuthorQuery(author){
    return encodeURIComponent(JSON.stringify(author));
}
