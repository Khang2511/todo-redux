
import { projectFirestore} from "../firebase/config";
const initialState ={
    todos:[],
    default:[],
    filterArray:[],
    editTodo:{},
    detailTodo:{},
    show:true,
    showAdd:false,
    showEdit:false,
    showDetail:false,
    sortBy:"index",
    direction:"asc",
    filterBy:"All"
};

const todosReducer =(state = initialState,action)=>{
    switch(action.type){
        case 'COMPLETE_TODO' :
            return{
                ...state,
            };


        case 'FETCH_TODO' :
            const todo = action.payload;
            const todos= state.todos;
            let check = true;
            for(let i= 0;i<todos.length;i++){
                if(todo.id === todos[i].id)
                    check = false;
            }

            if(Date.parse(todo.DefaultDeadline)<Date.now() && todo.Status!=="Done" ){
                projectFirestore.collection("todos").doc(todo.id).update({
                    Status: "Delayed",
                })
                todo.Status = "Delayed"
            }
            if(check === true){
                return{
                    ...state,
                    todos: [todo, ...state.todos].sort(
                        (a, b) => {return b.index - a.index;}),
                    default: [todo, ...state.default]
                };    
            }
            else
                return{
                    ...state
                }


        case 'SHOW_TODO' :
            if(state.show === false)
                return{
                    ...state,
                    show: action.payload,
                };   

            else
                return{
                    ...state,
                    show: action.payload,
                };   


        case 'SHOW_ADD' :

            return{
                ...state,
                showAdd:action.payload,
                
            };


        case 'ADD_TODO':
            const add = action.payload
            
            projectFirestore.collection("todos").add({
                index:add.index ,
                id:add.id,
                Deadline: add.Deadline,
                DefaultDeadline: add.DefaultDeadline,
                Name: add.Name,
                Desc: add.Desc,
                Priority: add.Priority,
                Status: add.Status,
                PrevStatus: add.PrevStatus,
                CreateAt: add.CreateAt,
                Level: add.Level,
              });
            return{
                ...state,
            }

        case 'DEL_TODO' :
            const del = state.todos;
            const delIncomplete = state.default;
            projectFirestore.collection("todos").doc(action.payload).delete();
            for( let i = 0; i < del.length; i++){ 
                if ( del[i].id === action.payload) {
                  del.splice(i, 1); 
                }
             }
             for( let i = 0; i < delIncomplete.length; i++){ 
                if ( delIncomplete[i].id === action.payload) {
                    delIncomplete.splice(i, 1); 
                }
             }
             
            return{
                ...state,
                todos: del,
                default:delIncomplete
            };
        
        case 'SHOW_EDIT' :
            
            let editID;
            for( let i = 0; i < state.todos.length; i++){ 
                if ( state.todos[i].id === action.id) {
                  editID = state.todos[i]
                }
             }
            return{
                ...state,
                showEdit:action.payload,
                editTodo:editID,
            };

        case 'EDIT_TODO':
            const edit = action.payload
            const editArray = state.todos
            projectFirestore.collection("todos").doc(state.editTodo.id).update({
                Deadline: edit.Deadline,
                DefaultDeadline: edit.DefaultDeadline,
                 Name: edit.Name,
                    Desc: edit.Desc,
                Priority: edit.Priority,
                Status: edit.Status,
            }
        );
            for( let i = 0; i < editArray.length; i++){ 
                if ( state.editTodo.id === editArray[i].id) {
                    editArray[i]=action.payload
                }
            }
            return{
                ...state,
                todos:editArray
            }

        case 'SHOW_DETAIL' :
            console.log(action.payload)
            let detailID;
            for( let i = 0; i < state.todos.length; i++){ 
                if ( state.todos[i].id === action.id) {
                    detailID = state.todos[i]
                }
             }
            return{
                ...state,
                showDetail:action.payload,
                detailTodo:detailID
            };
            
        case 'SORT_TODO':
            let sortTodo
            switch(action.payload){
                case "Name":
                    if (action.direction === 'asc') {
                            sortTodo= state.todos.sort(
                                (a, b) =>a.Name.localeCompare(b.Name))
                    }
                    else
                        sortTodo= state.todos.sort(
                            (a, b) =>b.Name.localeCompare(a.Name));
                
                break;

                case "Level":
                    if (action.direction === 'asc') {
                        sortTodo= state.todos.sort(
                            (a, b) =>{return a.Level - b.Level;});
                    }
                    else
                        sortTodo= state.todos.sort(
                            (a, b) =>{return b.Level - a.Level;});
                
                break;

                case "DefaultDeadline":
                    if (action.direction === 'asc') {
                        sortTodo= state.todos.sort(
                            (a, b) =>{return Date.parse(b.DefaultDeadline)-
                                Date.parse(a.DefaultDeadline)
                            })
                    }
                    else
                        sortTodo= state.todos.sort(
                            (a, b) =>{return Date.parse(a.DefaultDeadline)-
                                Date.parse(b.DefaultDeadline)});
                
                break;
                case "index":
                    sortTodo= state.todos.sort(
                        (a, b) => {return b.index - a.index;})
                
                break;
                
                default:
                    sortTodo= state.todos.sort(
                        (a, b) => {return b.index - a.index;})
            }
                console.log(sortTodo)
            return{
                ...state,
                sortBy: action.payload,
                direction:action.direction
            }

        case 'FILTER_TODO' :{

            const statusTodo = action.payload
            let filterTodo 
            if(statusTodo!== "All")
                // filterTodo = state.default.filter((task)=>{
                //     return task.Status===statusTodo
                // })
                {
                    filterTodo = state.todos.filter((task)=>{
                            return task.Status===statusTodo
                        })
                        console.log(filterTodo )
                        console.log(state.todos)
                }
            else
                filterTodo = state.default
            
            return{
                ...state,
                filterBy:statusTodo,
                filterArray:filterTodo
            };
        }

        case 'DONE_TODO':
            const doneID = action.payload
            const prevStatus = action.prevStatus
            const doneArray = state.todos
            if(action.status !== "Done"){
                projectFirestore.collection("todos").doc(doneID).update({
                    Status: "Done",
                }
            );
                for( let i = 0; i < doneArray.length; i++){ 
                    if ( doneID === doneArray[i].id) {
                        doneArray[i].Status="Done"
                        console.log(doneArray[i])
                    }
                }
            }
            else
            {
                projectFirestore.collection("todos").doc(doneID).update({
                    Status: prevStatus,
                }
            );
                for( let i = 0; i < doneArray.length; i++){ 
                    if ( doneID === doneArray[i].id) {
                        doneArray[i].Status=prevStatus
                        console.log(doneArray[i])
                    }
                }
            }
            return{
                ...state,
                todos:doneArray,
            }

        case 'DRAG_TODO':
            let drag = action.drag
            let origin = []
            let prevDrag = action.prevDrag
            let doneList =[]
            for(let i=0;i<action.payload.length;i++)
            {
                origin.push(action.payload[i].index)
            }
            for(let i=0;i<drag.length;i++)
            {
                drag[i].index = origin[i]
            }
            if(action.payload.length !== prevDrag.length){

                for(let i=0;i<prevDrag.length;i++)
                {
                        if(prevDrag[i].Status === "Done")
                            doneList.push(prevDrag[i])
                }
            }
           
            const dragDone =action.drag.concat(doneList).sort(
                (a, b) => {return b.index - a.index;})

            for(let i=0;i<dragDone.length;i++)
            {
                projectFirestore.collection("todos").doc(dragDone[i].id).update({
                    index: dragDone[i].index,
                })
            }
            return{
                ...state,
                todos:dragDone
            }

        default:
            return{
                ...state,
            }
    }
};

export default todosReducer;