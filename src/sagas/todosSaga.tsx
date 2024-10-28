import { call, put, takeEvery } from "redux-saga/effects";
import { Todo } from "../interfaces/Todo";
import { getTodosSuccess, getTodosFailure } from "../hooks/TodosState";

interface todosResponse {
  limit: number;
  skip: number;
  todos: Todo[];
  total: number;
}

function* workFetchTodos() {
  try {
    const response: Response = yield call(() =>
      fetch("https://dummyjson.com/todos")
    );
    const todos: todosResponse = yield response.json();
    yield put(getTodosSuccess(todos.todos));
  } catch (error) {
    yield put(getTodosFailure());
  }
}

function* todosSaga() {
  yield takeEvery("todos/getTodosFetch", workFetchTodos);
}
export default todosSaga;
