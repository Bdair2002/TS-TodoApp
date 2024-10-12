import { Todo } from "../interfaces/Todo";
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("https://dummyjson.com/todos");

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await response.json();

  return data.todos.map((todo: any) => ({
    id: todo.id,
    Description: todo.todo,
    isCompleted: todo.completed,
  }));
};
