import { setUserData, getUserData, clearUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';

async function request(url, options){
    try {
        const response = await fetch(host+url,options);
        if(response.ok!=true){
            const error = await response.json();
            console.log(error);
            throw new Error(error.error);
        }

        return response.json();
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function createOptions(method="GET", data){
    const options = {
        method,
        headers: {
            "X-Parse-Application-Id": "K7ZlhHiFoikaEPDRsEX41o3SBhHWqx5oUMxgdGKp",
            "X-Parse-REST-API-Key": "z3MyyqfelGxbgECLyslY1x6SkFoedzI2dM25CQx1"
        }       
    }
    const userData = getUserData();
    if(userData){
        options.headers["X-Parse-Session-Token"]=userData.token;
    }
    if(data){
        options.headers["Content-Type"]="application/json";
        options.body = JSON.stringify(data);
    }

    return options;
}

export async function get(url){
    return request(url, createOptions());
}

export async function post(url, data){
    return request(url, createOptions('POST', data));
}

export async function put(url, data){
    return request(url, createOptions('PUT', data));
}

export async function del(url){
    return request (url, createOptions('DELETE'));
}

export async function login(username, password){
    const loggedUser = await post('/login', {username, password});
    const userData = {
        username: loggedUser.username,
        id: loggedUser.objectId,
        token: loggedUser.sessionToken
    }
    setUserData(userData);

    return loggedUser;
}

export async function register(username, email, password){
    const registeredUser = await post('/users', {username, email, password});
    const userData = {
        username,
        id: registeredUser.objectId,
        token: registeredUser.sessionToken
    }
    setUserData(userData);

    return registeredUser;
}

export async function logout(){
    await post('/logout');
    clearUserData();
}