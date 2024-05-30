import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { loggerMiddleware } from './middleware';
import {thunk} from 'redux-thunk';



const root = ReactDOM.createRoot(document.getElementById('root'));

const middleware = applyMiddleware(thunk, loggerMiddleware)

const store = createStore(rootReducer, middleware) // reducer & middleware 를 store에 올리기.

console.log(store.getState()) // store에 있는 상태 가져오기 (action이 취하지 않고 있을땐 default 값 state가 가져와짐)
// rootReducer 넣은 후 다시 확인 해 보면 rootReducer에 있는 상태 todoes & counter 을 콘솔에서 확인 할 수 있다.

// 원래(root.render()는 함수가 생성 및 호출 됐는데 const로 함수로 만들어 버리면 따로 호출을 해줘야함.)
// const render = () => root.render(
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App 
          // value={store.getState()} 
          // onIncrement={()=> store.dispatch({type: 'INCREMENT'})} 
          // onDecrement={()=> store.dispatch({type:'DECREMENT'})}
        />
    </Provider> 
  </React.StrictMode>
  
);


// render() // 함수로 만들어서 이렇게 호출해줘야 실행됨. 함수 호출(실행) -> 전체적인 UI 보여짐 render()는 함수 호출
// store.subscribe(render) // -> store에서 변경된 state를 리렌더링 시켜서 UI 업데이트 시키기 !! render 는 함수를 가져옴. 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
