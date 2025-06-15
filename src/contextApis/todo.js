import { createContext, useState } from "react";

export const ToDoContext = createContext({});

export const ToDoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (data) => {
    const todo = {
      ...data,
      isCompleted: false,
      id: todoList[0]?.id + 1 || 1,
    };

    setTodoList((prev) => [todo, ...prev]);
  };

  const editTodo = (updatedTodo) => {
    setTodoList(prevList => {
      // Map over the previous list to find and update the specific todo
      return prevList.map(todo => {
        if (todo.id === updatedTodo.id) {
          // If it's the item we're updating, return a NEW object with updated properties
          return { ...todo, ...updatedTodo }; // Merge updated properties
        }
        // Otherwise, return the existing todo object (its reference remains the same)
        return todo;
      });
    });
  };

  const removeTodo = (id) => {
    const filteredTodo = todoList.filter(todo => todo.id !== id);
    setTodoList(filteredTodo)
  }

  return (
    <ToDoContext.Provider value={{ addTodo, editTodo, todoList, removeTodo }}>
      {children}
    </ToDoContext.Provider>
  );
};
