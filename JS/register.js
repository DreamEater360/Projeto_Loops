const user = document.querySelector('#user');
const key = document.querySelector('#key');
const registerButton = document.querySelector('#register');

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

function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}

registerButton.addEventListener('click', register);
