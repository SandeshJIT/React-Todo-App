import React , {useState , useRef, useEffect} from "react";
import TodoList from "./TodoList";
import Title from "./Title";
import './style.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos , setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if(storedTodos)
      setTodos(storedTodos)
  }, [])


  useEffect(() =>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  }, [todos])

 
  function addToList(){
    const todo = todoNameRef.current.value;
    if(todo === '') return null;
    todoNameRef.current.value = null;
    setTodos(prevTodos =>{
        return [...prevTodos , {id:uuidv4() , name : todo , completed : false}]
    })
  }
  function toggleTodo(id){
    const states = [...todos];
    const todo = states.find((element)=>id===element.id);
    todo.completed = !todo.completed;
    setTodos(states);

  }
  function clearCompletedTodo(){
    console.log("Called clear todo")
      var state = todos;
      const res = state.filter(element=>
          element.completed === false
      )
      setTodos(res)
  }


  return (
    <>
    <Title />
    <div className="body">
      <div className="inputarea">
        <input ref={todoNameRef} type="text" />
        <div className="buttons">
          <button className="firstbutton" onClick={addToList}>Add Todo</button>
          <button onClick={clearCompletedTodo}>Clear Completed</button>
        </div>
      </div>
      <TodoList key={todos.id} todos={todos} toggleTodo = {toggleTodo}/>
      <h3 className="numberoftasksleft">{todos.filter(element=>element.completed === false).length} Items left to do.</h3>
    </div>
    </>
  );
}

export default App;
