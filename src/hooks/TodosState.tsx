import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../interfaces/Todo";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
    loading: true,
    newTodo: "",
  },
  reducers: {
    getTodosFetch: (state) => {
      state.loading = true;
    },
    getTodosSuccess: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    getTodosFailure: (state) => {
      state.loading = false;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: state.todos[state.todos.length - 1].id + 1,
        todo: action.payload,
        completed: false,
      };
      state.todos = [...state.todos, newTodo];
      state.newTodo = "";
    },
    toggleComplete: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setNewTodo: (state, action) => {
      state.newTodo = action.payload;
    },
  },
});
export const {
  getTodosFetch,
  getTodosSuccess,
  getTodosFailure,
  addTodo,
  setNewTodo,
  toggleComplete,
  deleteTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
