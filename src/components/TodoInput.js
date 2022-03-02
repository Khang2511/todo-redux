import React,{useState} from "react";

import React from 'react'

function TodoInput() {
    
    return (
        <div className='todoadd'>
            <div className="todoadd__form">
                  <form action="/" className='infor'>
                      <i className="fa fa-window-close infor__close" aria-hidden="true"></i>
                      <h1>Add todo</h1>
                      <div className="infor__name">
                          <label htmlFor='name'>Name<span>*</span></label>
                          <input id="name" type="text" name="name" required />
                            
                      </div>
                      <div className="infor__desc">
                          <label htmlFor="desciption">Description</label>
                          <textarea id="instructions" rows="3" required
                           ></textarea>
                      </div>
                      <div className="infor__status-priority">
                          <div className="status">
                              <p>Status</p>
                              <select defaultValue={'DEFAULT'} >
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
                              <select defaultValue={'DEFAULT'} >
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
                          <input className="deadline" type="datetime-local" name="deadline" />
                          <i className="fas fa-calendar-alt"></i>
                      </div>
                      
                      <div className="infor__btn">
                          <button onClick={addTodo}  >Add</button>
                          <button onClick={handleCancel} >Cancel</button>
                      </div>
                  </form>
              </div>
      </div>
    )
  }

export default TodoInput