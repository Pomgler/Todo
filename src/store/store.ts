import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo-slice";
import { modalSlice } from "./modal-slice";

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    modal: modalSlice.reducer
  }
});

export type Store = ReturnType<typeof store.getState>