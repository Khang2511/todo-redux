import React from 'react';
import '../css/detailStyle/style.css'
import {useDispatch, useSelector} from "react-redux"
import {  showDetail } from '../redux/action';
function TodoDetail() {
  const state = useSelector((state)=>({...state}));
  const dispatch = useDispatch()
  const detailInfor = state.todos.detailTodo
  function handleCancel(){
    dispatch(
        showDetail(
            !state.todos.showDetail
        )
    )
   
}

  return (
    <div className='tododetail'>
        <div className="tododetail__form">
              <form action="/" className='infor'>
                  <i onClick={handleCancel} className="fa fa-window-close infor__close" aria-hidden="true"></i>
                  <h1>Detail todo</h1>
                  <div className="infor__name">
                      <label htmlFor='name'>Name</label>
                      <input id="name" type="text" name="name" required 
                        value={detailInfor.Name}
                        readOnly
                        />
                  </div>
                  <div className="infor__desc">
                      <label htmlFor="desciption">Description</label>
                      <textarea id="instructions" rows="3"
                       value={detailInfor.Desc}
                       readOnly
                       ></textarea>
                  </div>
                  <div className="infor__status-priority">
                      <div className="status">
                          <p>Status</p>
                          <input id="name" type="text" name="name" required 
                        value={detailInfor.Status}
                        readOnly
                        />
                      </div>
                      <div className="priority">
                          <p>Priority</p>
                          <input id="name" type="text" name="name" required 
                        value={detailInfor.Priority}
                        readOnly
                        />
                      </div>
                  </div>
                  <div className="infor__deadline">
                      <label htmlFor="deadline">Deadline</label>
                      <input className="deadline" 
                      defaultValue={detailInfor.Deadline}
                      readOnly
                        />
                      <i className="fas fa-calendar-alt"></i>
                  </div>
                  
                  <div className="infor__btn">
                      <button onClick={handleCancel} href="/">Cancel</button>
                  </div>
              </form>
          </div>
  </div>
)
}

export default TodoDetail;
