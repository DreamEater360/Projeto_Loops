import { createId } from "./create_Id";

const user = document.querySelector('#user');
const key = document.querySelector('#key');
const loginButton = document.querySelector('#login');
const registerButton = document.querySelector('#');

function register() {

    let userValue = String(user.value);
    let keyValue = String(key.value);
    let ID = createId(userValue);
 
    if (!localStorage.getItem(`${ID}`)){
        let object = {user: userValue,
                key: keyValue,
            }

        const objectJson = JSON.stringify(object);

        localStorage.setItem(`${ID}` ,objectJson)
    } else {
        console.log('Usuario ja cadastrado.')
    }
    
    console.log(localStorage.length)
}

function login() {
    if (localStorage.length > 0){
        const userValue = String(user.value);
        const keyValue = String(key.value);
        let ID = createId(userValue);

        let object = JSON.parse(localStorage.getItem(`${ID}`));
        if (object){
            if (object.user === userValue){
                if (object.key === keyValue){
                    window.location.href = "to_do_list.html";
                } else {
                    console.log("usuario ou senha invalidos");
                }
            } else {
                console.log("usuario ou senha invalidos");
            }
        } else {
            console.log("usuario ou senha invalidos");
        }
    } else {
        console.log('Não existe cadastro no sistema!!!')
    }
        
    
}


loginButton.addEventListener('click', login);
