
import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from './actions/post';
import { count } from './actions/count';

// function App({value, onIncrement, onDecrement}) {
function App() {

  // {console.log(value)}

  const counter = useSelector((state) => state.counter)
  console.log(counter)
  const todos = useSelector((state) => state.todos)
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])



  const [todoValue, setTodoValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch({type:'ADD_TODO', text: todoValue})
  }

  const handleIncrement = () => {
    return dispatch({type:'INCREMENT'})
  }
  const handleDecrement = () => {
    return dispatch({type:'DECREMENT'})
  }
  const handleSecCount = () => {
    dispatch(count())
  }

  return (
    <div className="App">

       {/* 객체 안(userId, id, title)중 title만 */}
      {/* <div>
        <ul>
          {posts.map((post, index) => <li key = {index}>
              {post.title} 
          </li>)}
        </ul>
      </div> */}

      {/* <div>
        <ul>
          {todos.map((todo, index) => 
            <li key={index}>
              {todo}
            </li>
          )}
        </ul>
        
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            value={todoValue} 
            onChange={(e)=> setTodoValue(e.target.value)} 
          />
          <input type='submit'/>
        </form>

      </div> */}
      <div>
        {/* index.js에서 sub reducer을 합치고, root reducer로 store에 내보냈기때문에 지금 그 value는 객체로써 counter & todos를 가지므로 하나씩 접근해야햠. */}
        {/* Clicked: {value.counter} times  */}
        Clicked: {counter} times 
        {" "}
        <button onClick={handleIncrement}>
          +
        </button>
        {" "}
        {/* <button onClick={handleDecrement}>
          -
        </button> */}
        <button onClick={handleSecCount}>
          1초 후 증가
        </button>
      </div>
      
    </div>
  );
}

export default App;
