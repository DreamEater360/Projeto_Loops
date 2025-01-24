// chama os elementos do html
const user = document.querySelector('#user');
const key = document.querySelector('#key');
const registerButton = document.querySelector('#register');
const erro = document.querySelector('#erro');

// função que imprementa o sistema de cadastro
function register() {

    // faz o casting dos valores dos elementos para o tipo string
    let userValue = String(user.value);
    let keyValue = String(key.value);
    // usa a função createId para criar o id
    let ID = createId(userValue);
 
    // verifica se este id ja exite no local storage
    if (!localStorage.getItem(`${ID}`)){
        // cria um objeto js para guardar os dados do usuario
        let object = {user: userValue,
                key: keyValue,
            }

        // tranforma o objeto em um json
        let objectJson = JSON.stringify(object);

        // guarda o json no local storage com o id criado
        localStorage.setItem(`${ID}` ,objectJson)
        console.log('Usuario cadastrado.')
        erro.innerHTML = "Usuario cadastrado com sucesso!."
        erro.style.color = 'green'
    
    // se o usuario ja existe gera um erro
    } else {
        console.log('Usuario ja cadastrado.')
        erro.innerHTML = "Usuario ja cadastrado, tente novamente."
        erro.style.color = 'rgb(104, 6, 6)'
    }
    
}

// funçao que utiliza de fatiamento de string para criar um id com base no nome de usuario
function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}

// quando o botao cadastrar é pressionado a funçao register é executada
registerButton.addEventListener('click', register);
