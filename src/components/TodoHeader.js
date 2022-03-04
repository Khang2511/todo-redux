import React from 'react'
import '../css/headerStyle/style.css'
// import '../css2/headerStyle/style.css'
import {showAdd, showTodo} from '../redux/action'
import {useDispatch, useSelector} from "react-redux"
import TodoAdd from './TodoAdd'
function TodoHeader() {
    const state = useSelector((state)=>({...state}));
    const showComplete = state.todos.show
    const dispatch = useDispatch();
    function handleShow(){
        dispatch(
            showTodo(
                !state.todos.show
            )
        )
    }
    function handleAdd(){
        dispatch(
            showAdd(
                !state.todos.showAdd
            )
        )
    }
    return (
        <div className='todoheader'>
            <div className='header'>
                <h1>Todo-List</h1>
                <ul className='header__function'>
                    <li className='function__show' X>
                        <input 
                            type='checkbox' 
                            onChange={handleShow}
                            checked={showComplete? true : false}
                        />
                        <label>Show incomplete task only</label>   
                    </li>
                    
                    <li className='function__add'>
                        <button onClick={handleAdd}>+ Add task</button>
                    </li>
                    {state.todos.showAdd? <TodoAdd /> : ''}
                </ul>
            </div>
        </div>
        )
}

export default TodoHeader