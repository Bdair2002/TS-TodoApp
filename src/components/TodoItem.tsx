import React from "react";
import "./TodoItem.css";
import { Todo } from "../interfaces/Todo";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem = ({ todo, toggleComplete, deleteTodo }: TodoItemProps) => {
  return (
    <tr className={todo.isCompleted ? "row-done" : ""}>
      <td>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => {
            toggleComplete(todo.id);
          }}
        />
      </td>
      <td>{todo.id}</td>
      <td>{todo.description}</td>
      <td>
        {todo.isCompleted ? (
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
        <button className="btn" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
