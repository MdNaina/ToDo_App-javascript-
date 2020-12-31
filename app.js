// selector
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

// event listeners
document.addEventListener("DOMContentLoaded", getTodo)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", checkOrDelete)
filterOption.addEventListener("click", filterTodo)


// functions
function addTodo(e){
  e.preventDefault();
  const todo = todoInput.value
  todoFunction(todo)
  storeTodo(todo)
}

// add todo function
function todoFunction(todo, todoClass){
  
  // create a div 
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  // create an li tag
  const todoItem = document.createElement("li")
  todoItem.classList.add("todo-item")
  todoItem.innerText = todo
  todoDiv.appendChild(todoItem)

  // create a check botton 
  const checkButton = document.createElement("button")
  checkButton.classList.add("check-btn")
  checkButton.innerHTML = '<i class="fas fa-check"></i>'
  todoDiv.appendChild(checkButton)

  // create a trash botton 
  const trashButton = document.createElement("button")
  trashButton.classList.add("trash-btn")
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  todoDiv.appendChild(trashButton)

  // append all new tag 
  todoList.appendChild(todoDiv)
  // reset the input value
  todoInput.value = ""
  if (todoClass === "completed"){
    todoDiv.classList.add("completed")
  }
}

// check or delete the todo
function checkOrDelete(e){
  const item = e.target
  const todo = item.parentElement;
  // delete todo
  if (item.classList[0] === "trash-btn"){
    todo.classList.add("fall")
    todo.addEventListener("transitionend", removeTodo(todo))
  }
  // checked todo
  if (item.classList[0] === "check-btn"){
    todo.classList.toggle("completed")
    let todoText;
    let todos = checkInStorage();
    let i;
    if(todo.classList[1] == "completed"){
      todoText = todo.innerText 
      i = todos.indexOf(todoText)
      todos[i] = todoText + ";completed"
    }else{
      todoText = todo.innerText;
      todoText = todo.innerText + ";completed"
      i = todos.indexOf(todoText)
      todos[i] = todo.innerText
      
    }
    console.log(todos)
    localStorage.setItem('todos',JSON.stringify(todos))
    
  }
}

// remove todo 
function removeTodo(todo){
  todo.remove()
  removeLocalStorage(todo)
}

// filter function
function filterTodo(e){
  const todos = [...todoList.children]
  console.log(todos)
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        console.log(e.target.value,"completed")
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
      case "incompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
    }
  })
}

// storing the todo in the local storage
function storeTodo(todo){
  todos = checkInStorage()
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos));
}

// check todos in local storage
function checkInStorage(){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// get todos from local storage
function getTodo(){
  todos = checkInStorage()
  todos.forEach(function(todovalue){
    todo = getTheValues(todovalue)
    text = todo["text"]
    todoClass = todo['class']
    todoFunction(text, todoClass)
  })
}

// remove todos from local storage
function removeLocalStorage(todo){
  todos = checkInStorage();
  let value;
  const name = todo.children[0].innerText;
  if(todo.classList[1] === "completed"){
    value = name + ";completed";
  }else{
    value = name
  }
  console.log('value:',value)
  indexTodo = todos.indexOf(value)
  console.log(indexTodo)
  todos.splice(indexTodo, 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}


function test(){
  saveTodo("test1")
}
function getTheValues(text){
	let value = text.split(";");
	let todoText = value[0]
	let todoClass = value[1]
  return {"text":todoText, "class":todoClass}
}