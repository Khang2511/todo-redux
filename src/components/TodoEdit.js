import React from 'react';
import '../css/editStyle/style.css'
import {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { editTodo, showEdit } from '../redux/action';

function TodoEdit() {
    const state = useSelector((state)=>({...state}));
    const dispatch = useDispatch()
    const editInfor = state.todos.editTodo

    const [editName,setEditName] = useState(editInfor.Name);
    const [editDesc,setEditDesc] = useState(editInfor.Desc);
    const [editStatus,setEditStatus] = useState(editInfor.Status);
    const [editPriority,setEditPriority] = useState(editInfor.Priority);
    const [editDeadline,setEditDeadline] = useState(editInfor.Deadline);
    const [editDefaultDeadline,setEditDefaultDeadline] = useState(editInfor.DefaultDeadline);
    const [level,setLevel] = useState(editInfor.Level)
    const [showDL,setShowDL] = useState(false);
    function handleCancel(){
        dispatch(
            showEdit(
                !state.todos.showEdit
            )
        )
       
    }
    function handleDeadline(){
        setShowDL(!showDL)
    }

    function handleEdit(e){
      console.log(level)
        e.preventDefault();
        let date = editDeadline.slice(0,10)
        date=date.split("-").reverse().join("-");  
        const time = editDeadline.slice(11)
        let deadline = time.concat(' '+ date)
        if(editDeadline !== editInfor.Deadline)
        {
          deadline = time.concat(' '+ date)
        }
        else
          deadline = editDeadline
        
        dispatch(
          editTodo({
            id:editInfor.id,
            Deadline: deadline,
            DefaultDeadline: editDefaultDeadline,
            Name: editName,
            Desc: editDesc,
            Priority: editPriority,
            Status: editStatus,
            Level: level,
            index: editInfor.index
        })
        );
        dispatch(
          showEdit(
              !state.todos.showEdit
          )
          
      )
    }
    function handlePriority(priority){
      setEditPriority(priority)
      
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
      console.log(level)
    }
  return (
    <div className='todoedit'>
        <div className="todoedit__form">
              <form action="/" className='infor'>
                  <i onClick={handleCancel} className="fa fa-window-close infor__close" aria-hidden="true"></i>
                  <h1>Edit todo</h1>
                  <div className="infor__name">
                      <label htmlFor='name'>Name <span>*</span></label>
                      <input id="name" type="text" name="name" required 
                            defaultValue={editInfor.Name} onChange={(e) => {
                          setEditName(e.target.value)
                          }}/>
                  </div>
                  <div className="infor__desc">
                      <label htmlFor="desciption">Description</label>
                      <textarea id="instructions" rows="3"
                       defaultValue={editInfor.Desc}
                       onChange={(e) => {
                        setEditDesc(e.target.value)
                        }}></textarea>
                  </div>
                  <div className="infor__status-priority">
                      <div className="status">
                          <p>Status</p>
                          <select 
                          defaultValue={editInfor.Status}
                          onChange={(e) => {
                            setEditStatus(e.target.value)
                            }}
                            >
                              <option value="DEFAULT" disabled></option>
                              <option value="Not started">Not started</option>
                              <option value="Pending">Pending</option>
                              <option value="In progress">In progress</option>
                              <option value="Delayed">Delayed</option>
                              <option value="Done">Done</option>
                          </select>
                      </div>
                      <div className="priority">
                          <p>Priority</p>
                          <select 
                          defaultValue={editInfor.Priority}
                          onChange={(e) => 
                            handlePriority(e.target.value)
                        }>
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
                      {showDL?
                      <input className="deadline" 
                      type="datetime-local" 
                      name="deadline" 
                      defaultValue={editInfor.Deadline}
                      onChange={(e) => {
                        setEditDeadline(e.target.value)
                        setEditDefaultDeadline(e.target.value)
                        }}
                        />
                        :
                        
                        <input className="deadline" 
                      defaultValue={editInfor.Deadline}
                      onClick={handleDeadline}
                      onChange={(e) => {
                        setEditDeadline(e.target.value)
                        setEditDefaultDeadline(e.target.value)
                        }}
                        />
                      
                      }
                      <i className="fas fa-calendar-alt"></i>
                    
                  </div>
                  
                  <div className="infor__btn">
                      <button onClick={handleEdit} >Edit</button>
                      <button onClick={handleCancel} href="/">Cancel</button>
                  </div>
              </form>
          </div>
  </div>
)
}

export default TodoEdit;
