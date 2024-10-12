import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoApp.css";
import { Todo } from "../interfaces/Todo";
import { fetchTodos } from "../services/todoService";
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState<string>("");
  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const addTodo = () => {
    const todoToAdd: Todo = {
      id: todos[todos.length - 1].id,
      description: newTodo,
      isCompleted: false,
    };
    setTodos([...todos, todoToAdd]);
    setNewTodo("");
  };

  const toggleComplete = (id: number): void => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(
      todos.filter((todo: Todo) => {
        return todo.id !== id;
      })
    );
  };

  return (
    <div className="TodosList">
      <h1 className="title">Todo List</h1>
      <div className="addTodo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          placeholder="New Task .."
        />
        <button
          disabled={newTodo.length === 0}
          className="btn add"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Fetching Todos ...</p>
      ) : todos.length === 0 ? (
        <p>No Todos Found</p>
      ) : (
        <table className="todos-items">
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>Description</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoApp;
