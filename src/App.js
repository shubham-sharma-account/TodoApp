import './App.css';
import AddTodo from './AddTodo/AddTodo';
import TodoList from './ToDoList/TodoList';
import CompletedTodoList from './CompletedTodo/CompletedTodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>To-Do App</p>
      </header>
      <AddTodo />
      <TodoList />
      <CompletedTodoList />
    </div>
  );
}

export default App;
