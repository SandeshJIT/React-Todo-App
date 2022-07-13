import React from 'react'
import './style.css'
export default function Todo({todoElement , toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todoElement.id)
    }
  return (
    
    <div className='todolist'>
        <label>{todoElement.name}</label>
        {console.log(todoElement)}
        <input type="checkbox" checked={todoElement.completed} onChange={handleTodoClick}/>
       
    </div>
  )
}
