import { lazy, Suspense, useEffect, useState } from "react";
import styles from "./App.module.css";
import { Modal } from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, selectTodos } from "../../store/todo-slice";
import { createTodoModal, selectModal } from "../../store/modal-slice";
import { ModalType } from "../../types/modal-type";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Todo from "../Todo/Todo";


function App() {
  const { todos } = useSelector(selectTodos);
  const { modalType, message } = useSelector(selectModal);
  const dispatch = useDispatch();

  const openedModal = modalType === ModalType.CreateTodo || modalType === ModalType.EditTodo;

  const handleCreate = () => {
    dispatch(createTodoModal());
  };

  // useEffect(() => {
  //   dispatch(createTodo({
  //     text: "Hello",
  //     title: "My todo"
  //   }))
  // }, []);

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h2>TODO MANAGER</h2>

          <nav>
            <button className={styles.bt} onClick={handleCreate}>Create Todo</button>
          </nav>
        </div>
      </header>

      {openedModal && <Modal/>}
      {modalType === ModalType.DeleteTodo && <ConfirmModal/>}

      <section>
        {todos.map((todo) => <Todo key={todo.id} {...todo}/>)}
      </section>
    </main>
  );
}

export default App
