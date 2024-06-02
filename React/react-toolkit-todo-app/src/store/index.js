import {configureStore} from "@reduxjs/toolkit"
import { todoReducer } from "./todoSlice"


export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
    
})



// action dispatch => redux => store의 state가 변경 => react 리렌더링


// store    redux tookit

// slice => sub reducer => reducer => configureStore => store object

// store object

// 모든 컴포넌트 redux store state   use, update

// Provider store wrap