
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import './App.css'

function App() {
  return(
    <div className="App">
      <div className="Todo__app">
      <TodoHeader/>
      <TodoList/>
      </div>
    </div>
  )
}

export default App;
