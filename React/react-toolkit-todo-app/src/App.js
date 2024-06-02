
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect} from 'react';
import {   addTodo,   deleteTodo, editTodo,toggleTodo } from './store/todoSlice';

function App() {
  // redux store에 있는 state를 가져올때는 useSelector을 이용하여 가져오기
  const todos = useSelector(state => state.todos);
  console.log(todos)
  // 위의 state를 update하고 싶으면 action에 dispatch 한다. -> useDispatch사용하기

  const dispatch = useDispatch();

  const [text, setText] = useState("")
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [selectedOption, setSelectedOption] = useState("")
  const [filteredTodos, setFilteredTodos] = useState([]);


 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
      };
  
      const updatedTodos = [...todos, newTodo]; // 새로운 todo를 기존 todos 배열에 추가
      localStorage.setItem('todos', JSON.stringify(updatedTodos)); // 모든 todos를 localStorage에 저장
      dispatch(addTodo(text)); // Redux store에도 새로운 todo 추가
      setText('');
    }
  }
  
  
  

  const handleDelete = (id) => {
    // redux store에 있는 값을 지워주야하므로 dispatch 이용
    dispatch(
      deleteTodo(id)
    )
  }

  const handleEditStart = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const handleEditCancel = () => { // todo.id === editId 가 거짓이 되므로 수정중이 끝남.
    setEditId(null)
    setEditText('')
  }

  const handleEditSave = () => {
    if(editText.trim() !== '') {
      dispatch(
        editTodo({ // 새로운 state 넣어주기.
          id: editId, // 수정전 원래 id랑 editId, 수정후 지금 id 모두 같음 (그냥 아이디값을 돌려 사용.)
          newText: editText
        })
      )

      setEditId(null)
      setEditText('')
    }
  }

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

   useEffect(() => {
    if (selectedOption === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed === true));
    } else if (selectedOption === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, selectedOption]);

  useEffect(()=> {
    const data = localStorage.getItem('todos')

    if(data) {
      setFilteredTodos((prev) => [...prev, ...JSON.parse(data)])
    }
  }, [])
  


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <div>
        Fillter:
        <select id='select' name='select' value={selectedOption} onChange={handleSelect}>
          <option value='all' selected>All</option>
          <option value='completed'>Completed</option>
          <option value='active'>Active</option>
        </select>
      </div>
      
        <input 
          value={text} // onChange를 설정안해주면 입력이 안됨 -> text 상태가 계속 초기값인 ""이기때문에 변경이 안됨
          onChange={(e) => setText(e.target.value)} // -> 타이핑 한것이 setText에 update가 되어 화면에 변경된것을 볼수있음
        />
        <button type='submit'>Add Todo</button>
      </form> 
      
      <ul>
        {
          filteredTodos.map((todo) => (
            <li key={todo.id}>
              {todo.id === editId ?
              // 수정중
                <>
                  <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}/>
                  <button onClick={handleEditSave}>Save</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </>
              
              :
              // 수정 중 X
              <>
                <input 
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span >
                  {todo.text}
                </span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>Edit</button> 
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
              }
              
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
