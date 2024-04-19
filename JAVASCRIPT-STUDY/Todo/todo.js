// 요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
let todoArr = [];


// saveTodos 함수
function saveTodos(){
  const todoSting = JSON.stringify(todoArr)
  localStorage.setItem('myTodos', todoSting)
}

// loadTodos 함수
function loadTodos(){
  const myTodos = localStorage.getItem('myTodos') 
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr
  displayTodos()
}

// 4. 할일 삭제하기
function handleTodoDelBtnClick(clickedId){
    todoArr = todoArr.filter(function(aTodo){
      return aTodo.todoId !== clickedId
    })
    displayTodos()
    saveTodos()
  }

// 3. 할일 수정하기
function handleTodoItemClick(clickedId){
    todoArr = todoArr.map(function(aTodo){
      return aTodo.todoId !== clickedId ? 
      aTodo : { ...aTodo, todoDone: !aTodo.todoDone } 
    })
    displayTodos()
    saveTodos()
}

// 2. 할일 보여주기
function displayTodos() {
        todoList.innerHTML = ""
        todoArr.forEach(function(aTodo) { 
        const todoItem = document.createElement('li')
        const todoDeleteBtn = document.createElement('span')
        todoDeleteBtn.textContent = 'x'
        todoItem.textContent = aTodo.todoText
        todoList.appendChild(todoItem)
        todoItem.title = "Complete"
        if(aTodo.todoDone) { // true
            todoItem.classList.add("done") // 스타일 시트로 todoDone 상태를 표현하기 위해 클래스 두개 지정 ( done, yet)
        } else {
            todoItem.classList.add("yet") // false
        }
        todoDeleteBtn.title = "Delete"

        todoItem.addEventListener("click", function() {
            handleTodoItemClick(aTodo.todoId)
        })
        todoDeleteBtn.addEventListener("click", function() {
            handleTodoDelBtnClick(aTodo.todoId)
        })
        todoList.appendChild(todoItem)
        todoItem.appendChild(todoDeleteBtn)
    })
}


// 할일 입력 후 제출하면 발생하는 이벤트 핸들링
// 1. 할일 추가하기
todoForm.addEventListener("submit", function(e) {
    e.preventDefault() 
    const toBeAdded  = {
        todoText: todoForm.todo.value ,
        todoId : new Date().getTime(), 
        todoDone: false 
    }
    todoArr.push(toBeAdded)  // push()와 pop()의 순서 확인해야함! 중요
    if(todoForm.todo.value === "") {
        alert("메세지를 입력해주세요.")
        todoArr.pop(toBeAdded)
        console.log(todoArr)
    }
    todoForm.todo.value = "" 
    console.log(todoArr)
    displayTodos() 
    saveTodos() 
})

loadTodos()