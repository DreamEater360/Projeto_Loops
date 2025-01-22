const list = document.querySelector('.list-task'); //ul
const inputTask = document.querySelector('.input-task'); //input
const buttonAddTask = document.querySelector('.button-add-task'); //button
const botoesDeletar = document.querySelectorAll(".btDeletar")
const botoesEditar = document.querySelectorAll(".btEditar")
const botoesConcluido = document.querySelectorAll(".btConcluido")

function deletarToDo (botao){
    botao.addEventListener("click", function(event) {
        event.preventDefault()

        let liMae = botao.parentElement
        liMae.remove()
    })
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
})

botoesDeletar.forEach(function(botao) {
    deletarToDo(botao)
})

function lerElem(){

}

function atuaElem(){

}

function addLocalStorage(task){
    let taskValue = String(task.value);
    let ID = createId(taskValue);
 
    let object = {task: taskValue,
        }

    let objectJson = JSON.stringify(object);
    localStorage.setItem(`${ID}` ,objectJson);
     
}

function attLocalStorage(taskId, novoValor){
    let taskIdValue = String(taskId.value);
    let ID = createId(taskIdValue);

    if (localStorage.getItem(`${ID}`)){
        let object = JSON.parse(localStorage.getItem(`${ID}`));
        object.task = `${novoValor}`;
        let objectJson = JSON.stringify(object);
        localStorage.setItem(`${ID}`, objectJson);
    }
}

function createId(e){

    let ID = `${e.slice(0, 2)}${e.slice(5, 2)}${e.slice(1, 0)}`;
    return ID

}