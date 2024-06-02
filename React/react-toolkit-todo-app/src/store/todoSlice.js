import {createSlice} from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name: 'todos', 
    initialState: [], 
    reducers: { // action 생성하는 !!함수 정의!!하기
        addTodo: (state, action) => { // state는 이전 state를 나타냄 (지금은 초깃값인 []를 갖움)& action안에는 type, payload가 있음
            state.push({
                id: Date.now(), // id는 unique한 값만 가지면 됨.
                text: action.payload, // action이 일어난 값(payload) 넣기 -> 사용자가 입력한 값 넣기
                completed: false,
            }) // 배열안에 새로운 배열 넣기  -> push메서드 이용
        },
        deleteTodo: (state, action) =>  { // delete에선 return 하는 이유: 새로운 배열을 반환하여 특정 요소를 제거한 새로운 배열을 만들어야 하므로!. addTodo는  원본 배열에 새로운 요소를 추가하면 되는 것이므로
            return state.filter((todo) =>
                todo.id !== action.payload
            )
        },
        toggleTodo: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload)
            if(todo) { // todo가 있으면
                todo.completed = !todo.completed // true -> false / false -> true
            }
        },
        editTodo: (state, action) => {
            const {id, newText} = action.payload // id와 newText를 구조분해 할당으로 가져오기 -> 객체 만들기
            const todo = state.find(todo => todo.id === id)
            if(todo) {
                todo.text = newText
            }
        },  

        
    }
})

// todoSlice는 actions와 reducer를 갖음 -> todoSlice.actions, todoSlice.reducer

// reducer 함수 내보내기.
export const todoReducer = todoSlice.reducer
// action 함수 중 addTodo 리듀셔 내보내기
export const {addTodo, deleteTodo, toggleTodo, editTodo} = todoSlice.actions