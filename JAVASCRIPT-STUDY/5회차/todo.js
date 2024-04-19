// 요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
let todoArr = [];

// 1. 할일 추가하기, 2. 할일 보여주기, 3. 할일 수정하기, 4. 할일 삭제하기



// 로컬 저장소에 저장하기
function saveTodos() {
    const todoString = JSON.stringify(todoArr)
    localStorage.setItem("myTodos", todoString)
}

// 로컬 저장소에서 가져오기 === 페이지를 새로고침하거나 열었을때 남아있게 만듬 ( 딱 한번 나오면 됨)
function loadTodos() {
    const myTodos = localStorage.getItem("myTodos")
    if(myTodos !== null){ // 할일 목록에 아무 것도 없을수도 있으니! null이 아니라면 파싱 & 화면 보여주기 & 유지
        todoArr = JSON.parse(myTodos)
        displayTodos()
    }
    
}


// 4. 할일 삭제하기
function handleTodoDelBtnClick(clickedId){
    todoArr = todoArr.filter(function(aTodo) { // 
        return aTodo.todoId !== clickedId // 클릭되지 않은 것을 리턴 => 화면에 남김   그리고 todoArr에 갱신
    })
    displayTodos() // 화면에 다시 삭제된 배열외에 다시 보여주기 (다시 처음부터 만들기 => 화면상으로는 삭제된거 하나만 없어지는것처럼 보이지만 다 지우고 남은것만 return해서 다시 작성한거 )
    saveTodos() // 삭제할때도 LocalStroage에 있는 value값 삭제됨
}

// 3. 할일 수정하기
function handleTodoItemClick(clikcedId) { // 어떠한 할일을 클릭했을때 그 할일의 id 를 받아서 그 아이디에 대한 할일만 클래스를 수정하는 함수
    todoArr = todoArr.map(function(aTodo){
        if(aTodo.todoId === clikcedId) { // 해당 투두(aTodo)의 아이디 값이 클릭된 아아디값(clickedId)과 같으면
            return {
                ...aTodo, todoDone: !aTodo.todoDone // 기존 내용을 복사한 후에(...aTodo), aTodo.todoDone 내용을 덮어씀 ['!'은 true -> false, false -> true로 변화시킴 ]
            }
        } else {
            return aTodo
        }
    })
    console.log(todoArr) // 확인해보기
    displayTodos() ////////이거 없고 있고 차이 확인해보기 => if(aTodo.todoDone)을 위해서 사용. 그 전 코드를 다시 생성한다해도 이전 목록과 같은 내용이라 화면상에 변화는 없기때문에 if문을 쓰기위해 함수 재사용. (색깔만 수정하는 거지 내용은 똑같으므로 재사용해서 다시 목록을 배치해도 색깔외에 내용물 눈에 보이는 변화 없음)
    saveTodos() // 수정할때도 LocalStroage에 있는 value값 수정됨
}

// 2. 할일 보여주기
function displayTodos() {
    todoList.innerHTML = "" // 아래 주석으로 적은 문제를 해결하기 위해서는 버튼을 클릭(객체를 추가할때마다)할때마다 todoList에 적혀있는 innerHTML을 다 비워주고(''), forEach문을 거처 배열에 있는 각각의 객체마다 다시 새로 쌓인 todoItem을 채우기. (버튼 실행시 다 지우고 다시 쌓고, 다 지우고 다시 쌓음 !== (보이기엔 그렇게 보일지라도!) 하나씩 추가하는 함수가 아님 )
    todoArr.forEach(function(aTodo) { // 배열에 대한 forEach문을 추가버튼을 누를때마다 실행 및 생성되기 때문에 버튼 클릭 시 쌓여있던 배열들이 다시 forEach함수를 거쳐서 화면에 보여짐
        const todoItem = document.createElement('li')
        const todoDeleteBtn = document.createElement('span')
        todoDeleteBtn.textContent = 'x'
        todoItem.textContent = aTodo.todoText
        todoList.appendChild(todoItem)
        todoItem.title = "Completion"
        if(aTodo.todoDone) { // true
            todoItem.classList.add("done") // stylesheet로 todoDone 상태를 표현하기 위해 클래스 두개 지정 ( done, yet)
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

// 1. 할일 추가하기
todoForm.addEventListener("submit", function(e) {
    e.preventDefault() // 기존 기능차단 = 새로고침 차단
    const toBeAdded  = {
        todoText: todoForm.todo.value ,// todoForm 안에 있는 input요소 중 name이 todo인 값(value) 가져옴 => 사용자가 작성한 값 가져오기 (사용자가 작성한 것이므로 value로 가져와야함. textContent X)
        todoId : new Date().getTime(), // 실시간의 값으로 아이디를 지정하면 아이디가 중복 되지 않고 고유한 아이디를 갖게 됨
        todoDone: false // 할일이 추가 될때마다 하지 않는 상태를 나타내기 위해 false
    }
    todoForm.todo.value = "" // 버튼 클릭 후 toBeAdded 객체가 생성 되고 나서 todoForm.todo에 남아 있는 값(value)를 없애기.
    todoArr.push(toBeAdded) //toBeAdded 객체 리터럴을 배열에 넣기(push) && push()와 pop()의 순서 확인해야함! 중요
    if(todoForm.todo.value === "") {
        alert("메세지를 입력해주세요.")
        todoArr.pop(toBeAdded) //push()와 pop()의 순서 확인해야함! 중요
        console.log(todoArr)
    }
    console.log(todoArr) // console창에서 추가가 잘 되었는지 확인
    displayTodos() // 할일 보여주기
    saveTodos() // 추가할때마다 localStorage에 저장됨
})

loadTodos() // 화면에 창 계속 유지