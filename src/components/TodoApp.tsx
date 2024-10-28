import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoApp.css";
import { Todo } from "../interfaces/Todo";
import { getTodosFetch, addTodo, setNewTodo } from "../hooks/TodosState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
const TodoApp: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const newTodo = useSelector((state: RootState) => state.todos.newTodo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosFetch());
  }, [dispatch]);

  return (
    <div className="TodosList">
      <h1 className="title">Todo List</h1>
      <div className="addTodo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => {
            dispatch(setNewTodo(e.target.value));
          }}
          placeholder="New Task .."
        />
        <button
          disabled={newTodo === ""}
          onClick={() => {
            dispatch(addTodo(newTodo));
          }}
          className="btn add"
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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoApp;
