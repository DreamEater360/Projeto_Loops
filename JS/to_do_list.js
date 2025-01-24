// chama os elementos do html
const listaToDos = document.querySelector('.list-task'); //ul to dos não concluídas
const listaConcluidos = document.getElementById("listaConcluidas") //ul to dos concluídas
const inputTask = document.querySelector('.input-task'); //input
const buttonAddTask = document.querySelector('.button-add-task'); //button
const botoesDeletar = document.querySelectorAll(".btDeletar")
const botoesEditar = document.querySelectorAll(".btEditar")
const botoesConcluido = document.querySelectorAll(".btConcluido")
const botoesDesfazer = document.querySelectorAll(".btDesfazer")

// funçao que imprementa o sistema de deletar tarefas
function deletarToDo(botao) {
    botao.addEventListener("click", function(event) {
        // retira o comportamento padrao do navegador
        event.preventDefault()

        // obtem o elemento pai do botão
        let liMae = botao.parentElement
        
        // faz o casting do valor da terefa deletada para verificaçao do id
        let taskValue = String(liMae.textContent);
        let ID = createId(taskValue);

        // remove o item do local storage e da tela
        localStorage.removeItem(ID);
        liMae.remove()
    })
}

// funçao que imprementa o sistema de atualizaçao da tarefa
function alterarToDo(botao) {
    botao.addEventListener("click", function(event) {
        // retira o comportamento padrao do navegador
        event.preventDefault()

        // obtem o elemento pai do botão
        let liMae = botao.parentElement

        // obtem o elemento da tarefa antes da atualizaçao e salva o valor
        let nomeTarefa = liMae.querySelector("p")
        let saveId = nomeTarefa.textContent

        // cria um novo elemento input com valor do antigo elemento
        let novoNome = document.createElement("input")
        novoNome.type = "text"
        novoNome.value = nomeTarefa.textContent

        // substitui o antigo elemento da tarefa pelo novo input
        liMae.replaceChild(novoNome, nomeTarefa)

        // criar um botao de salvar a atualizaçao
        let btSalvar = document.createElement("button")
        btSalvar.textContent = "Salvar"

        // substui o botao de editar pelo de salvar
        liMae.replaceChild(btSalvar, botao)

        // novo botao é pressionado
        btSalvar.addEventListener("click", function(event) {
            // retira o comportamento padrao do navegador
            event.preventDefault()

            // atualiza o texto da tarefa com o valor do input
            nomeTarefa.textContent = novoNome.value
             // substitui o input pelo elemento <p> original
            liMae.replaceChild(nomeTarefa, novoNome)
            // substitui o botão de salvar pelo botão de editar
            liMae.replaceChild(botao, btSalvar)

            // faz o casting do valor da terefa salvo anteriormente para verificaçao do id
            let taskValue = String(saveId);
            let ID = createId(taskValue);

            // se o item exite no local storage
            if (localStorage.getItem(ID)){
                // transforma o json em um objeto js 
                let object = JSON.parse(localStorage.getItem(`${ID}`))
                // muda o nome da tarefa para o novo
                object.task = `${novoNome.value}`
                // tranforma em json
                let objectJson = JSON.stringify(object)
                // remove o item com o id do nome antigo
                localStorage.removeItem(ID)
                // cria um novo id e adiciona no local storage com o mesmo
                ID = createId(novoNome.value)
                localStorage.setItem(ID, objectJson)
            }

            
        })
    })
}

// funçao que imprementa o sistema de tirar a tarefa da lista de concluida
function desfazerToDo(botao) {
    botao.addEventListener("click", function(event) {
        // retira o comportamento padrao do navegador
        event.preventDefault()

        // obtem o elemento pai do botão
        let liMae = botao.parentElement

        // cria o botao de concluir
        let btChecked = document.createElement("button")
        btChecked.className = "btConcluido"
        let imgChecked = document.createElement("img")
        imgChecked.src = "../img/checked.png"
        btChecked.appendChild(imgChecked)

        // subistitui o botao de desfazer pelo de concluir
        liMae.replaceChild(btChecked, botao)

        // coloca a tarefa na lista de nao concluido
        listaToDos.appendChild(liMae)
        marcarConcluida(btChecked)
    })
}

// funçao que imprementa o sistema de colocar a tarefa na lista de concluida
function marcarConcluida(botao) {
    botao.addEventListener("click", function(event) {
        // retira o comportamento padrao do navegador
        event.preventDefault()

        // obtem o elemento pai do botão
        let liMae = botao.parentElement

        // cria o botao de desfazer
        let btDesfazer = document.createElement("button")
        btDesfazer.className = "btDesfazer"
        let imgDesfazer = document.createElement("img")
        imgDesfazer.src = "../img/desfazer_tarefa.png"
        btDesfazer.appendChild(imgDesfazer)

        // subistitui o botao de concluir pelo de desfazer
        liMae.replaceChild(btDesfazer, botao)

        // coloca a tarefa na lista de concluido
        listaConcluidos.appendChild(liMae)
        desfazerToDo(btDesfazer)
    })
}

// // funçao que utiliza de fatiamento de string para criar um id com base no nome de usuario
function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}${e.slice(-1)}`;
    return ID

}

// funçao que imprementa o sistema de adicionar tarefa
buttonAddTask.addEventListener("click", function(event) {
    // retira o comportamento padrao do navegador
    event.preventDefault()

    // cria um novo <li> para guardar a tarefa
    let novoLi = document.createElement("li")
    novoLi.className = "task"

    // cria os botoes de funcionalidades (concluir, deletar...)
    let imgChecked = document.createElement("img")
    let imgDelete = document.createElement("img")
    let imgEditar = document.createElement("img")
    let btChecked = document.createElement("button")
    let btDelete = document.createElement("button")
    let btEditar = document.createElement("button")

    imgChecked.src = "../img/checked.png"
    imgChecked.alt = "Concluído"
    imgDelete.src = "../img/trash.png"
    imgDelete.alt = "Deletar"
    imgEditar.src = "../img/editar.png"
    imgEditar.alt = "Editar"
    btChecked.className = "btConcluido"
    btDelete.className = "btDeletar"
    btEditar.className = "btEditar"

    btChecked.appendChild(imgChecked)
    btDelete.appendChild(imgDelete)
    btEditar.appendChild(imgEditar)

    // criar um <p> para guardar a tarefa e adicionar o texto que esta no display 
    let nomeTarefa = document.createElement("p")
    nomeTarefa.textContent = inputTask.value

    // faz o casting do valor da terefa para criar um id
    let taskValue = String(inputTask.value)
    let ID = createId(taskValue)

    // verifica se o id criado ja existe
    if (localStorage.getItem(ID)){
        // muda o valor da tarefa para nao dar conflito com o ja criado
        nomeTarefa.textContent = `${inputTask.value}${localStorage.length}`
        ID = createId(nomeTarefa.textContent)
    }

    // verifica se o id criado nao exite
    if (!localStorage.getItem(ID)){ 
        // cria um objeto js para guardar o valor da tarefa
        let object = {task: taskValue,
            }
        // tranforma o objeto em json
        let objectJson = JSON.stringify(object)
        // adiciona o json no local storage com o id criado
        localStorage.setItem(ID ,objectJson)
    }

    // deixa o display em branco
    inputTask.value = ''

    // coloca os botoes na <li> da tarefa
    novoLi.appendChild(btChecked)
    novoLi.appendChild(nomeTarefa)
    novoLi.appendChild(btEditar)
    novoLi.appendChild(btDelete)

    // anexa a tarefa a lista de nao concluidos
    listaToDos.appendChild(novoLi)

    // inicia as funçoes de funcionalidades
    deletarToDo(btDelete)
    alterarToDo(btEditar)
    marcarConcluida(btChecked)
})

// adiciona os eventos de deleção, edição e conclusão aos botões existentes no carregamento da página
botoesDeletar.forEach(function(botao) {
    deletarToDo(botao)
})

botoesEditar.forEach(function(botao) {
    alterarToDo(botao)
})

botoesConcluido.forEach(function(botao) {
    marcarConcluida(botao)
})
