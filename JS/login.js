const user = document.querySelector('#user');
const key = document.querySelector('#key');
const loginButton = document.querySelector('#login');
const erro = document.querySelector('#erro');

function login() {
    if (localStorage.length > 0){
        const userValue = String(user.value);
        const keyValue = String(key.value);
        let ID = createId(userValue);

        let object = JSON.parse(localStorage.getItem(`${ID}`));
        if (object){
            if (object.user === userValue){
                if (object.key === keyValue){
                    window.location.href = "HTML/to_do_list.html";
                } else {
                    erro.innerHTML = "Usuário ou senha invalidos"
                    console.log("usuario ou senha invalidos");
                }
            } else {
                erro.innerHTML = "Usuário ou senha invalidos"
                console.log("usuario ou senha invalidos");
            }
        } else {
            erro.innerHTML = "Usuário ou senha invalidos"
            console.log("usuario ou senha invalidos");
        }
    } else {
        erro.innerHTML = "Não existe nenhum cadastro no sistema!!!"
        console.log('Não existe nenhum cadastro no sistema!!!')
    }
        
    
}

function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}


loginButton.addEventListener('click', login);




