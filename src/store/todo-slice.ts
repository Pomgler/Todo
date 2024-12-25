import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import {v4 as uuid} from "uuid";
import { Store } from "./store";
import { editTodoModal } from "./modal-slice";

export const fetchTodos = createAsyncThunk("get all todos", async () => {
  const res = await fetch("http://localhost:5000/todos");
  return await res.json() as Todo[]
});

export const fetchCreateTodo = createAsyncThunk("fetchCreateTodo", async (todo: Todo, {rejectWithValue}) => {
  try {

    const res = await fetch("http://localhost:5000/new-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    });

    return res.ok ? "okay" : "error"
  } catch(err) {
    console.error(err);

    return rejectWithValue("error")
  }
})

type CreateTodo = Omit<Todo, "id">;

export type Status = "none" | "okay" | "error" | "loading" | "updated"

interface TodoState {
  todos: Todo[],
  currentTodo: Todo,
  status: Status 
}

const initialState: TodoState = {
  todos: [],
  currentTodo: {
    id: "",
    title: "",
    text: ""
  },
  status: "none"
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
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "okay";
      state.todos = action.payload;
    });

    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
    })

    builder.addCase(fetchCreateTodo.fulfilled, (state) => {
      state.status = "updated"
    })
  }
});

export const selectTodos = (state: Store) => state.todo;
export const { createTodo, setCurrentTodo, deleteTodo, editTodo, setStatus } = todoSlice.actions;