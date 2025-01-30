// Variables
let $ = document
const inputElem = $.getElementById('itemInput')
const addButton = $.getElementById('addButton')
const clearButton = $.getElementById('clearButton')
const todoListElem = $.getElementById('todoList')
const courseLenght = $.getElementById('courseLenght')

let todosArray = []

//functions
function addNewTodo () {
    let newTodoTitle = inputElem.value
    let courseLengthValue = courseLenght.value

    let newTodoObj = {
        id: todosArray.length + 1,
        courseLength: courseLengthValue,
        title: newTodoTitle,
        complete: false
    }

    inputElem.value = ''

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)

    inputElem.focus()
}

function setLocalStorage (todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}


function todosGenerator (todosList) {
    
    let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn
    
    todoListElem.innerHTML = ''
    
    todosList.forEach(function (todo) {

        newTodoLiElem = $.createElement('li')
        newTodoLiElem.className = 'completed well'

        newTodoLabalElem = $.createElement('label')
        newTodoLabalElem.innerHTML = todo.title

        newTodoCompleteBtn = $.createElement('button')
        newTodoCompleteBtn.className =  'btn btn-success'
        newTodoCompleteBtn.innerHTML = 'Complete'
        newTodoCompleteBtn.setAttribute('onclick' , 'todoComplition(' + todo.id +')')
        
        newTodoDeleteBtn = $.createElement('button')
        newTodoDeleteBtn.className = 'btn btn-danger'
        newTodoDeleteBtn.innerHTML = 'Delete'
        newTodoDeleteBtn.setAttribute('onclick' , 'todoDelet(' + todo.id + ')')
        
        if(todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = 'Uncomplete'
        }

        newTodoLiElem.append(newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn)

        todoListElem.append(newTodoLiElem)
    })
}

function todoComplition(todosID){
    
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos

    todosArray.forEach(function(todo){
        if(todo.id === todosID){
            todo.complete = !todo.complete
        }
        setLocalStorage(todosArray)
        todosGenerator(todosArray)
    })
    if(todosArray[mainTodoIndex].complete){
        newTodoLiElem.setAttribute('class' , 'uncompleted well')
       console.log('123')
       console.log(newTodoLiElem)
        todosArray[mainTodoIndex].complete = false
        todosGenerator(todosArray)
        setLocalStorage(todosArray)     
    }else{
        console.log(newTodoLiElem)
        console.log('321')
        todosArray[mainTodoIndex].complete = true
        newTodoLiElem.className = 'completed'
        todosGenerator(todosArray)
        setLocalStorage(todosArray) 
    }

    
}

function todoDelet(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos
    
    let mainTodoIndex = todosArray.findIndex(function(todo){
        return todo.id === todoId
    })
    todosArray.splice(mainTodoIndex , 1)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}

function getLocalStorage(){
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))
    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }
    todosGenerator(todosArray)
}

function clearTodos(){
    todosArray = []
    localStorage.removeItem("todos")
    todoListElem.textContent = ''
}



//Event Listeners
clearButton.addEventListener('click' , clearTodos)

addButton.addEventListener('click', addNewTodo)

window.addEventListener('load' , getLocalStorage)

inputElem.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addNewTodo()
    }
})