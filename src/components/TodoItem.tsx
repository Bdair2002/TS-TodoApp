import React from "react";
import "./TodoItem.css";
import { Todo } from "../interfaces/Todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import { toggleComplete, deleteTodo } from "../hooks/TodosState";

interface TodoItemProps {
  todo: Todo;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  return (
    <tr className={todo.completed ? "row-done" : ""}>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            dispatch(toggleComplete(todo.id));
          }}
        />
      </td>
      <td>{todo.id}</td>
      <td>{todo.todo}</td>
      <td>
        {todo.completed ? (
          <p>
            <span className="done material-symbols-outlined">task_alt</span>
            Done
          </p>
        ) : (
          <p>
            <span className="progress material-symbols-outlined">
              progress_activity
            </span>
            in Progress
          </p>
        )}
      </td>
      <td>
        <button className="btn" onClick={() => dispatch(deleteTodo(todo.id))}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
