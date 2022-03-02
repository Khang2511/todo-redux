import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import{projectFirestore} from "../firebase/config"
import { fetchTodo, deleteTodo,showEdit, showDetail, sortTodo, filterTodo, doneTodo, dragTodo } from '../redux/action';
import '../css/liststyle/style.css'
import TodoEdit from './TodoEdit';
import TodoDetail from './TodoDetail';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function TodoList() {
  const state = useSelector((state)=>({...state}));
  let todos = state.todos.todos
  let incompleted= todos.filter((task)=>task.Status!=="Done")
  let filterBy = state.todos.filterBy
  let filter = todos.filter((task)=>
  task.Status===filterBy)
  const sortBy = state.todos.sortBy
  const show = state.todos.show

  const editShow = state.todos.showEdit
  const detailShow = state.todos.showDetail

  const dispatch = useDispatch();
  const [size,setSize] = useState(window.innerWidth)


  function reportWindowSize() {
         const w = window.innerWidth;
        setSize(w)
    }
        window.addEventListener('resize', reportWindowSize);

  //  useEffect(()=>{
  //         show?setList(incompleted): setList(todos)
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       },[show])


    useEffect(()=>{
      let value= getTodos();
      return ()=> value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  function getTodos(){
    projectFirestore.collection("todos")
                    .onSnapshot(function(querySnapshot){
            querySnapshot.docs.map((doc)=>{
              return(
                dispatch(
                  fetchTodo(
                    {
                    index:doc.data().index,
                    id: doc.id,
                    Deadline: doc.data().Deadline,
                    DefaultDeadline: doc.data().DefaultDeadline,
                    Name: doc.data().Name,
                    Desc: doc.data().Desc,
                    Priority: doc.data().Priority,
                    Status: doc.data().Status,
                    PrevStatus: doc.data().PrevStatus,
                    Level: doc.data().Level
                }
              )
            )
              )
              
        }
      )
    }
  )
}
function handleDel(id){
  if (window.confirm("Delete this task ?")) {
    dispatch(
      deleteTodo(
        id
      )
    )
  } 
  console.log(id)
}

function handleEdit(id){
  dispatch(
    showEdit(
      !editShow,
      id
    )
  )
}

function handleDetail(id){
  console.log(detailShow)
  dispatch(
    showDetail(
      !detailShow,
      id
    )
  )
}

function handleListClass(status){
    switch (status) {
      case 'Not started':
        return "status not_started";
      case 'Pending':
        return "status pending" ;
      case 'Delayed':
        return "status delayed";
      case 'In progress':
        return "status inprogress";
      case 'Done':
        return "status done" ;
      default:
        return null;
  }
}

function handleStatusClass(status){
    switch (status) {
      case 'Not started':
        return "not_started";
      case 'Pending':
        return "pending" ;
      case 'In progress':
        return "inprogress";
      case 'Delayed':
        return "delayed";  
      case 'Done':
        return "done" ;
      default:
        return null;
    }
}

function handlePriorityClass(priority){

    switch (priority) {
      case 'Low':
        return "low";
      case 'High':
        return "high" ;
      case 'Medium':
        return "medium";
      case 'Critical':
        return "critical";  
      default:
        return null;
    }
}

function handleSort(direc,sort){
  if(direc !== "index")
    dispatch(
      sortTodo(
        sort,
        direc
      )
    )
  else
  dispatch(
    sortTodo(
      "index",
      "desc"
    )
  )
}

function handleFilter(filter){
  dispatch(
    filterTodo(
      filter,
    )
  )
}

function handleDone(id,status,prev,deadline){
  dispatch(
    doneTodo(
      id,
      status,
      prev
    )
  )
}

function handleOnDragEnd(result) {
  if(sortBy === "index"){
    if (!result.destination ) return;

      let items 
      let prevItems
      show? items = Array.from(incompleted) : items = Array.from(todos)
      show? prevItems = Array.from(incompleted) : prevItems = Array.from(todos)
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

    dispatch(
      dragTodo(
        items,
        prevItems,
        todos,
        result.source.index,
        result.destination.index
      )
    )
  }
  else
      alert("Please unsort before drag an item");
  }
    return (
      <div className='todolist'>
        <div className='tags'>
          {
            size <= '739' ?
            
            <ul className='todolist__tag'>
              <li className='header__tag'>
                  <p>Filter</p>
                  <select 
                      defaultValue={'All'} 
                      
                  >
                      <option value="All" >All</option>
                      
                      <option value="Pending">Pending</option>
                      <option value="In progress">In progress</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Done">Done</option>
                  </select>
              </li>
              <li className=' header__tag'>
                  <p>Sort by</p>
                  <select 
                      defaultValue={'Name'}
                  >
                      <option value='index'>Unsort</option>
                      <option value="Name" >Name</option>
                      <option value="Level" >Priority</option>
                      <option value="Deadline">Deadline</option>
                  </select>
              </li>
              <li className='header__tag'>
                  <p>Direction</p>
                  <select 
                  defaultValue={'desc'}
                  >
                      <option value='desc'> &#xf161;</option>
                      <option value='asc'> &#xf160;</option>
                  </select>
            </li>
          </ul>
            :
            <ul className='todolist__tag'>
            <li className='tag__name header__tag'>
              <p>
                  Name 
              </p>
                  <select 
                  defaultValue={'index'}
                  onChange={(e)=>handleSort(e.target.value,"Name")}
                  >
                  <option value='index'>Unsort</option>
                  <option value='asc'> &#xf160;</option>
                  <option value='desc'> &#xf161;</option>
                  </select>
            </li>
            <li className='tag__status header__tag'>
                  <p>Status 
                  </p>
                      <select 
                      defaultValue={'All'} 
                      onChange={(e)=>handleFilter(e.target.value)}
                      >
                          <option value="DEFAULT" disabled ></option>
                          <option value="All" >All</option>
                          <option value="Not started" >Not started</option>
                          <option value="Pending">Pending</option>
                          <option value="In progress">In progress</option>
                          <option value="Delayed">Delayed</option>
                          <option value="Done">Done</option>
                      </select>
            </li>
            <li className='tag__priority header__tag'>
                <p>Priority 
                </p>
                  <select 
                      defaultValue={'index'}
                      onChange={(e)=>handleSort(e.target.value,"Level")}
                      >
                      <option value='index'>Unsort</option>
                      <option value='asc'> &#xf160;</option>
                      <option value='desc'> &#xf161;</option>
                  </select>
            </li>
            <li className='tag__deadline header__tag'>
                  <p>Deadline 
                  </p>
                      <select 
                          defaultValue={'index'}
                          onChange={(e)=>handleSort(e.target.value,"DefaultDeadline")}
                          >
                          <option value='index'>Unsort</option>
                          <option value='asc'> &#xf160;</option>
                          <option value='desc'> &#xf161;</option>
                      </select>
            </li>
          </ul>
        }
          </div>
          <div className='list'>
                {show ? 
                filterBy!=="All"?
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                      {filter.map((todo, index) => {
                        return (
                          <Draggable key={todo.id} 
                          draggableId={todo.id} 
                          index={index}
                          >
                            {(provided) => (
                              <ul 
                              className='todolist__list' 
                              ref={provided.innerRef} 
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps}>
                                 <li className= {handleListClass(todo.Status)}>
                                  <i className={
                                    todo.Status === "Done" ? 
                                    "fa fa-check-circle-o list__btn" 
                                    : "fa fa-circle list__btn" 
                                  } aria-hidden="true"
                                  onClick={()=>handleDone(todo.id,todo.Status,todo.PrevStatus)}
                                  ></i>
                                <div className='list__item'>
                        <div className='item'>
                          <div className='item__name'>
                            <p>{todo.Name}</p>
                            <i>{todo.Desc} </i> 
                        </div>
                          <div className='item__status'>
                            <p className={handleStatusClass(todo.Status)}>{todo.Status}</p>
                          </div>
                          <div className='item__priority'>
                            <p className={handlePriorityClass(todo.Priority)}>{todo.Priority}</p>
                          </div>
                          <div className='item__deadline'>
                            <p>{todo.Deadline}</p>
                          </div>
                          <div className='item__tool'>
                            <i className="fa fa-trash-o tool__del" 
                              aria-hidden="true" 
                              onClick={()=>handleDel(todo.id)}
                              ></i>
                            <i className="fa fa-edit  tool__edit" 
                                onClick={()=>handleEdit(todo.id)}
                            ></i>
                            <i className="fa fa-info-circle tool__detail" 
                            aria-hidden="true"
                            onClick={()=>handleDetail(todo.id)}></i>
                          </div>
                        </div>
                                </div>
                              </li>
                            </ul>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
                  </DragDropContext>
                  :
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="characters">
                    {(provided) => (
                      <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                        {incompleted.map((todo, index) => {
                          return (
                            <Draggable key={todo.id} 
                            draggableId={todo.id} 
                            index={index}
                            >
                              {(provided) => (
                                <ul 
                                className='todolist__list' 
                                ref={provided.innerRef} 
                                {...provided.draggableProps} 
                                {...provided.dragHandleProps}>
                                   <li className= {handleListClass(todo.Status)}>
                                    <i className={
                                      todo.Status === "Done" ? 
                                      "fa fa-check-circle-o list__btn" 
                                      : "fa fa-circle list__btn" 
                                    } aria-hidden="true"
                                    onClick={()=>handleDone(todo.id,todo.Status,todo.PrevStatus)}
                                    ></i>
                                  <div className='list__item'>
                          <div className='item'>
                            <div className='item__name'>
                              <p>{todo.Name}</p>
                              <i>{todo.Desc} </i> 
                          </div>
                            <div className='item__status'>
                              <p className={handleStatusClass(todo.Status)}>{todo.Status}</p>
                            </div>
                            <div className='item__priority'>
                              <p className={handlePriorityClass(todo.Priority)}>{todo.Priority}</p>
                            </div>
                            <div className='item__deadline'>
                              <p>{todo.Deadline}</p>
                            </div>
                            <div className='item__tool'>
                              <i className="fa fa-trash-o tool__del" 
                                aria-hidden="true" 
                                onClick={()=>handleDel(todo.id)}
                                ></i>
                              <i className="fa fa-edit  tool__edit" 
                                  onClick={()=>handleEdit(todo.id)}
                              ></i>
                              <i className="fa fa-info-circle tool__detail" 
                              aria-hidden="true"
                              onClick={()=>handleDetail(todo.id)}></i>
                            </div>
                          </div>
                                  </div>
                                </li>
                              </ul>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                  </DragDropContext>
                :
                filterBy!=="All"?
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="characters">
                    {(provided) => (
                      <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                        {filter.map((todo, index) => {
                          return (
                            <Draggable key={todo.id} 
                            draggableId={todo.id} 
                            index={index}
                            >
        
                              {(provided) => (
                                <ul 
                                className='todolist__list' 
                                ref={provided.innerRef} 
                                {...provided.draggableProps} 
                                {...provided.dragHandleProps}>
                                  <li className= {handleListClass(todo.Status)}>
                                    <i className={
                                      todo.Status === "Done" ? 
                                      "fa fa-check-circle-o list__btn" 
                                      : "fa fa-circle list__btn" 
                                    } aria-hidden="true"
                                    onClick={()=>handleDone(todo.id,todo.Status,todo.PrevStatus)}
                                    ></i>
                                  <div className='list__item'>
                          <div className='item'>
                            <div className='item__name'>
                              <p>{todo.Name}</p>
                              <i>{todo.Desc} </i> 
                          </div>
                            <div className='item__status'>
                              <p className={handleStatusClass(todo.Status)}>{todo.Status}</p>
                            </div>
                            <div className='item__priority'>
                              <p className={handlePriorityClass(todo.Priority)}>{todo.Priority}</p>
                            </div>
                            <div className='item__deadline'>
                              <p>{todo.Deadline}</p>
                            </div>
                            <div className='item__tool'>
                              <i className="fa fa-trash-o tool__del" 
                                aria-hidden="true" 
                                onClick={()=>handleDel(todo.id)}
                                ></i>
                              <i className="fa fa-edit  tool__edit" 
                                  onClick={()=>handleEdit(todo.id)}
                              ></i>
                              <i className="fa fa-info-circle tool__detail" 
                              aria-hidden="true"
                              onClick={()=>handleDetail(todo.id)}></i>
                            </div>
                          </div>
                                  </div>
                                </li>
                              </ul>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                  </DragDropContext>
                    :
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided) => (
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                          {todos.map((todo, index) => {
                            return (
                              <Draggable key={todo.id} 
                              draggableId={todo.id} 
                              index={index}
                              >
          
                                {(provided) => (
                                  <ul 
                                  className='todolist__list' 
                                  ref={provided.innerRef} 
                                  {...provided.draggableProps} 
                                  {...provided.dragHandleProps}>
                                    <li className= {handleListClass(todo.Status)}>
                                      <i className={
                                        todo.Status === "Done" ? 
                                        "fa fa-check-circle-o list__btn" 
                                        : "fa fa-circle list__btn" 
                                      } aria-hidden="true"
                                      onClick={()=>handleDone(todo.id,todo.Status,todo.PrevStatus)}
                                      ></i>
                                    <div className='list__item'>
                            <div className='item'>
                              <div className='item__name'>
                                <p>{todo.Name}</p>
                                <i>{todo.Desc} </i> 
                            </div>
                              <div className='item__status'>
                                <p className={handleStatusClass(todo.Status)}>{todo.Status}</p>
                              </div>
                              <div className='item__priority'>
                                <p className={handlePriorityClass(todo.Priority)}>{todo.Priority}</p>
                              </div>
                              <div className='item__deadline'>
                                <p>{todo.Deadline}</p>
                              </div>
                              <div className='item__tool'>
                                <i className="fa fa-trash-o tool__del" 
                                  aria-hidden="true" 
                                  onClick={()=>handleDel(todo.id)}
                                  ></i>
                                <i className="fa fa-edit  tool__edit" 
                                    onClick={()=>handleEdit(todo.id)}
                                ></i>
                                <i className="fa fa-info-circle tool__detail" 
                                aria-hidden="true"
                                onClick={()=>handleDetail(todo.id)}></i>
                              </div>
                            </div>
                                    </div>
                                  </li>
                                </ul>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
              }
          </div>
          {editShow ? <TodoEdit/>:''}
          {detailShow ? <TodoDetail/>:''}
          
      </div>
  )
}

export default TodoList