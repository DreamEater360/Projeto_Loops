// chama os elementos do html
const user = document.querySelector('#user');
const key = document.querySelector('#key');
const loginButton = document.querySelector('#login');
const erro = document.querySelector('#erro');

// função que imprementa o sistema de login
function login() {
    // verifica se existe algum usuario cadastrado no sistema
    if (localStorage.length > 0){
        // faz o casting dos valores dos elementos para o tipo string
        let userValue = String(user.value);
        let keyValue = String(key.value);
        // usa a função createId para verificar o id
        let ID = createId(userValue);

        // transforma o objeto json em um objeto js normal
        let object = JSON.parse(localStorage.getItem(`${ID}`));
        if (object){
            // verifica se o usuario digitado e o que esta no local storage é o mesmo, logo apos faz o mesmo com senha
            if (object.user === userValue){
                if (object.key === keyValue){
                    // se forem iguais o usuario é incaminhado a to do list
                    window.location.href = "HTML/to_do_list.html";
                // se nao forem iguais mostra um erro
                } else {
                    erro.innerHTML = "Usuário ou senha invalidos, tente novamente"
                    console.log("usuario ou senha invalidos");
                }
            // se nao forem iguais mostra um erro
            } else {
                erro.innerHTML = "Usuário ou senha invalidos"
                console.log("usuario ou senha invalidos");
            }
        // se nao forem iguais mostra um erro
        } else {
            erro.innerHTML = "Usuário ou senha invalidos"
            console.log("usuario ou senha invalidos");
        }
    // se nao houver usuario retorna isso
    } else {
        erro.innerHTML = "Não existe nenhum cadastro no sistema!!!"
        console.log('Não existe nenhum cadastro no sistema!!!')
    }
        
}

// funçao que utiliza de fatiamento de string para criar um id com base no nome de usuario
function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}

// quando o botao login é pressionado a funçao login é executada
loginButton.addEventListener('click', login);




