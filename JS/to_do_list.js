const list = document.querySelector('.list-task'); //ul
const inputTask = document.querySelector('.input-task'); //input
const buttonAddTask = document.querySelector('.button-add-task'); //button
const botoesDeletar = document.querySelectorAll(".btDeletar")
const botoesEditar = document.querySelectorAll(".btEditar")
const botoesConcluido = document.querySelectorAll(".btConcluido")

function deletarToDo(botao) {
    botao.addEventListener("click", function(event) {
        event.preventDefault()

        let liMae = botao.parentElement
        delLocalStorage(liMae)
        liMae.remove()
    })
}

function alterarToDo(botao) {
    botao.addEventListener("click", function(event) {
        event.preventDefault()

        let liMae = botao.parentElement
        let nomeTarefa = liMae.querySelector("p")

        let novoNome = document.createElement("input")
        novoNome.type = "text"
        novoNome.value = nomeTarefa.textContent

        liMae.replaceChild(novoNome, nomeTarefa)

        let btSalvar = document.createElement("button")
        btSalvar.textContent = "Salvar"

        liMae.replaceChild(btSalvar, botao)

        btSalvar.addEventListener("click", function() {
            nomeTarefa.textContent = novoNome.value
            liMae.replaceChild(nomeTarefa, novoNome)
            liMae.replaceChild(botao, btSalvar)
        })
    })
}

function addLocalStorage(task) {
    let taskValue = String(task.value);
    let ID = createId(taskValue);
 
    let object = {task: taskValue,
        }

    let objectJson = JSON.stringify(object);
    localStorage.setItem(`${ID}` ,objectJson);
     
}

function attLocalStorage(taskId, novoValor) {
    if (localStorage.getItem(`${taskId}`)){
        let object = JSON.parse(localStorage.getItem(`${ID}`));
        object.task = `${novoValor}`;
        let objectJson = JSON.stringify(object);
        localStorage.setItem(`${taskId}`, objectJson);
    }

}

function delLocalStorage(task){
    let taskValue = String(task.value);
    let ID = createId(taskValue);

    localStorage.removeItem(`${ID}`);

}

function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}

buttonAddTask.addEventListener("click", function(event) {
    event.preventDefault()
    let novoLi = document.createElement("li")
    novoLi.className = "task"

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
    imgEditar.src = ""  // colocar o caminho da imagem do botão editar aqui
    imgEditar.alt = "Editar"
    btChecked.className = "btConcluido"
    btDelete.className = "btDeletar"
    btEditar.className = "btEditar"

    btChecked.appendChild(imgChecked)
    btDelete.appendChild(imgDelete)
    btEditar.appendChild(imgEditar)

    let nomeTarefa = document.createElement("p")
    nomeTarefa.textContent = inputTask.value
    addLocalStorage(inputTask.value)
    inputTask.value = ''

    novoLi.appendChild(btChecked)
    novoLi.appendChild(nomeTarefa)
    novoLi.appendChild(btEditar)
    novoLi.appendChild(btDelete)

    list.appendChild(novoLi)

    deletarToDo(btDelete)
    alterarToDo(btEditar)
})

botoesDeletar.forEach(function(botao) {
    deletarToDo(botao)
})

botoesEditar.forEach(function(botao) {
    alterarToDo(botao)
})