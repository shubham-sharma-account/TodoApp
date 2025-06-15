const todosList = [];

const addTodo = (data) => {
  try {
    const todo = {
      ...data,
      isCompleted: false,
      id: todosList[todosList.length - 1]?.id + 1 || 1,
    };

    todosList.push(todo);

    return { message: "To-do added successfully.", data: todo, status: true };
  } catch (error) {
    return { message: "Error in adding To-do", data: error, status: false };
  }
};

export { todosList, addTodo };
