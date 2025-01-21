const user = document.querySelector('#user');
const key = document.querySelector('#key');
const loginButton = document.querySelector('#login');

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

function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}


loginButton.addEventListener('click', login);




