import React from 'react';
import '../css/addStyle/style.css'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { showAdd,addTodo } from '../redux/action';
import {useDispatch, useSelector} from "react-redux"
import {  timeStamp} from '../firebase/config.js';
import { useState} from 'react';


function TodoAdd() {
  const [todoName,setTodoName] = useState('');
  const [todoDeadline,setTodoDeadline] = useState('');
  const [todoPriority,setTodoPriority] = useState('');
  const [todoStatus,setTodoStatus] = useState('');
  const [todoDesc,setTodoDesc] = useState('');
  const [level,setLevel] = useState('')
  const [change,setChange] = useState(true)
  const state = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  function handleAdd(e){
    // Chặn refresh
    e.preventDefault();
    // Thêm dữ liệu vào firebase
    let index = 0;
    for(let i =0; i<state.todos.todos.length;i++){
      if(index<=state.todos.todos[i].index){
       index = state.todos.todos[i].index+1
      }
    }
    let date = todoDeadline.slice(0,10)
    date=date.split("-").reverse().join("-");  
    const time = todoDeadline.slice(11)
    
    const deadline = time.concat(' '+ date)
    if (todoName!== "" && 
        todoDesc!== "" && 
        todoStatus!== "" && 
        todoPriority!== "" && 
        todoDeadline!== "") {
      dispatch(addTodo(
        {
          index:index ,
          id:Math.random(),
          Deadline: deadline,
          DefaultDeadline: todoDeadline,
          Name: todoName,
          Desc: todoDesc,
          Priority: todoPriority,
          Status: todoStatus,
          PrevStatus: todoStatus,
          CreateAt: timeStamp(),
          Level: level,
        }
      ))
      
      dispatch(
        showAdd(
            !state.todos.showAdd
        )
    )
      setChange(!change)
      setTodoName('');
      setTodoDeadline('');
      setTodoDesc('');
      setTodoPriority('');
      setTodoStatus('');
    }
    else
      alert('Missing detail , please check again!')
  }


function handleCancel(){
            dispatch(
            showAdd(
                !state.todos.showAdd
            )
        )
}
function handlePriority(priority){
  setTodoPriority(priority)
  switch(priority){
    case "Low":
      setLevel('1')
    break;

    case "Medium":
      setLevel('2')
    break;

    case "High":
      setLevel('3')
    break;

    case "Critical":
      setLevel('4')
    break;
    
    default:
      return null;
  }
}

return (
    <div className='todoadd'>
        <div className="todoadd__form">
              <form action="/" className='infor'>
                  <i onClick={handleCancel} className="fa fa-window-close infor__close" aria-hidden="true"></i>
                  <h1>Add todo</h1>
                  <div className="infor__name">
                      <label htmlFor='name'>Name</label>
                      <input id="name" type="text" name="name" required onChange={(e) => {
                        setTodoName(e.target.value)
                        }}/>
                        
                  </div>
                  <div className="infor__desc">
                      <label htmlFor="desciption">Description</label>
                      <textarea id="instructions" rows="3" required
                       onChange={(e) => {
                        setTodoDesc(e.target.value)
                        }}></textarea>
                  </div>
                  <div className="infor__status-priority">
                      <div className="status">
                          <p>Status</p>
                          <select defaultValue={'DEFAULT'} onChange={(e) => {
                        setTodoStatus(e.target.value)
                        }}>
                              <option value="DEFAULT" disabled ></option>
                              <option value="Not started" >Not started</option>
                              <option value="Pending">Pending</option>
                              <option value="In progress">In progress</option>
                              <option value="Delayed">Delayed</option>
                              <option value="Done">Done</option>
                          </select>
                      </div>
                      <div className="priority">
                          <p>Priority</p>
                          <select defaultValue={'DEFAULT'} onChange={(e) => {
                            handlePriority(e.target.value)
                        setTodoPriority(e.target.value)
                        }}>
                              <option value="DEFAULT" disabled></option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Critical">Critical</option>
                          </select>
                      </div>
                  </div>
                  <div className="infor__deadline">
                      <label htmlFor="deadline">Deadline</label>
                      <input className="deadline" type="datetime-local" name="deadline" onChange={(e) => {
                        setTodoDeadline(e.target.value)
                        }}/>
                      <i className="fas fa-calendar-alt"></i>
                  </div>
                  
                  <div className="infor__btn">
                      <button onClick={handleAdd}  >Add</button>
                      <button onClick={handleCancel} >Cancel</button>
                  </div>
              </form>
          </div>
  </div>
)
}

export default TodoAdd;
