import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import {v4 as uuid} from "uuid";
import { Store } from "./store";
import { editTodoModal } from "./modal-slice";

type CreateTodo = Omit<Todo, "id">;

interface TodoState {
  todos: Todo[],
  currentTodo: Todo,
}

const initialState: TodoState = {
  todos: [],
  currentTodo: {
    id: "",
    title: "",
    text: ""
  }
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<CreateTodo>) {
      const newTodo = {
        ...action.payload,
        id: uuid()
      };
      state.todos = [newTodo, ...state.todos]
    },
    deleteTodo(state) {
      state.todos = state.todos.filter((todo) => todo.id !== state.currentTodo.id);
      state.currentTodo = initialState.currentTodo;
    },
    editTodo(state, action: PayloadAction<CreateTodo>) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === state.currentTodo.id) {
          return {
            ...action.payload,
            id: state.currentTodo.id
          }
        }

        return todo
      })
    },
    setCurrentTodo(state, action: PayloadAction<string>) {
      state.currentTodo = state.todos.find((todo) => todo.id = action.payload) ?? initialState.currentTodo;
    }
  }
});

export const selectTodos = (state: Store) => state.todo;
export const { createTodo, setCurrentTodo, deleteTodo, editTodo } = todoSlice.actions;