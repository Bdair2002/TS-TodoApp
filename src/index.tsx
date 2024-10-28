import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./hooks/TodosState";
import todosSaga from "./sagas/todosSaga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: { todos: todoReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});
export type RootState = ReturnType<typeof store.getState>;
saga.run(todosSaga);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
