const user = document.querySelector('#user');
const key = document.querySelector('#key');
const registerButton = document.querySelector('#register');
const erro = document.querySelector('#erro');

function register() {

    let userValue = String(user.value);
    let keyValue = String(key.value);
    let ID = createId(userValue);
 
    if (!localStorage.getItem(`${ID}`)){
        let object = {user: userValue,
                key: keyValue,
            }

        let objectJson = JSON.stringify(object);

        localStorage.setItem(`${ID}` ,objectJson)
        console.log('Usuario cadastrado.')
        erro.innerHTML = "Usuario cadastrado com sucesso!."
        erro.style.color = 'green'
        
    } else {
        console.log('Usuario ja cadastrado.')
        erro.innerHTML = "Usuario ja cadastrado, tente novamente."
        erro.style.color = 'rgb(104, 6, 6)'
    }
    
}

function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}

registerButton.addEventListener('click', register);
