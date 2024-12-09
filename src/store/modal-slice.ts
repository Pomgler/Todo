import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../types/modal-type";
import { Store } from "./store";

interface ModalState {
  modalType: ModalType,
  message: string
}

const initialState: ModalState = {
  modalType: ModalType.None,
  message: ""
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    createTodoModal(state) {
      state.message = "New Todo",
      state.modalType = ModalType.CreateTodo
    },
    editTodoModal(state) {
      state.message = "Edit your todo",
      state.modalType = ModalType.EditTodo
    },
    deleteTodoModal(state) {
      state.message = "Are you sure you want to delete this todo?",
      state.modalType = ModalType.DeleteTodo
    },
    closeModal(state) {
      state.modalType = initialState.modalType
    }
  }
});

export const selectModal = (state: Store) => state.modal;
export const { createTodoModal, closeModal, editTodoModal, deleteTodoModal } = modalSlice.actions;