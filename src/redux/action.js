
const completeTodo = (todo) =>({
    type: 'COMPLETE_TODO',
    payload: todo,
});

const fetchTodo = (todo) =>({
    type: 'FETCH_TODO',
    payload: todo,
});

const showTodo = (todo) =>({
    type: 'SHOW_TODO',
    payload: todo,
});

const showAdd = (add) =>({
    type: 'SHOW_ADD',
    payload: add,
});

const showEdit = (edit,id) =>({
    type: 'SHOW_EDIT',
    payload: edit,
    id:id
});

const showDetail = (detail,id) =>({
    type: 'SHOW_DETAIL',
    payload: detail,
    id:id
});


const addTodo = (todo) =>({
    type: 'ADD_TODO',
    payload: todo,
});

const deleteTodo = (todo) =>({
    type: 'DEL_TODO',
    payload: todo,
});

const editTodo = (todo) =>({
    type: 'EDIT_TODO',
    payload: todo,
});

const sortTodo = (sort,direction) =>({
    type: 'SORT_TODO',
    payload: sort,
    direction: direction
});

const filterTodo = (filter) =>({
    type: 'FILTER_TODO',
    payload: filter,
});

const doneTodo = (id,status,prev) =>({
    type: 'DONE_TODO',
    payload: id,
    status: status,
    prevStatus: prev
});
const dragTodo = (drag,todos,prevDrag,start,end) =>({
    type: 'DRAG_TODO',
    drag: drag,
    payload: todos,
    prevDrag: prevDrag,
    start:start,
    end:end
});


export {completeTodo,
    fetchTodo,showTodo,
    showAdd,
    addTodo,
    deleteTodo,
    showEdit,
    editTodo,
    showDetail,
    sortTodo,
    filterTodo,
    doneTodo,
    dragTodo};