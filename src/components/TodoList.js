import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import{projectFirestore} from "../firebase/config"
import { fetchTodo,  sortTodo, filterTodo} from '../redux/action';
import '../css/liststyle/style.css'
import TodoTask from './TodoTask';
import TodoEdit from './TodoEdit';
import TodoDetail from './TodoDetail';

function TodoList() {
  const state = useSelector((state)=>({...state}));
  let todos = state.todos.todos
  let incompleted= todos.filter((task)=>task.Status!=="Done")
  let filterBy = state.todos.filterBy
  let filter = todos.filter((task)=>
  task.Status===filterBy)
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

function handleSort(direc,sort){
  console.log(sort,direc)
  if(size<=1023){
    if(direc !== "index" || sort !== "index")
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

  else{

    if(direc !== "index" )
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
}

function handleFilter(filter){
  dispatch(
    filterTodo(
      filter,
    )
  )
}


    return (
      <div className='todolist'>
        <div className='tags'>
          {
            size <= '1023' ?
            <ul className='todolist__tag'>
              <li className='header__tag'>
                  <p>Filter</p>
                  <select 
                      defaultValue={'All'} 
                      onChange={(e)=>handleFilter(e.target.value)
                      }
                      >
                          <option value="All" >All</option>
                          <option value="Not started" >Not started</option>
                          <option value="Pending">Pending</option>
                          <option value="In progress">In progress</option>
                          <option value="Delayed">Delayed</option>
                          <option value="Done">Done</option>
                      </select>
              </li>
              <li className=' header__tag'>
                  <p>Sort by</p>
                  <select 
                      defaultValue={'index'}
                      onChange={(e)=>handleSort("desc",e.target.value)}
                  >
                      <option value='index'>Unsort</option>
                      <option value="Name" >Name</option>
                      <option value="Level" >Priority</option>
                      <option value="Deadline">Deadline</option>
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
                  <TodoTask list={filter}/>
                  :
                  <TodoTask list={incompleted}/>
                :
                filterBy!=="All"?
                  <TodoTask list={filter}/>
                  :
                  <TodoTask list={todos}/>
              }
          </div>
          {editShow ? <TodoEdit/>:''}
          {detailShow ? <TodoDetail/>:''}
          
      </div>
  )
}

export default TodoList