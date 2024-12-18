import { lazy, Suspense, useEffect, useState } from "react";
import styles from "./App.module.css";
import { Modal } from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, fetchTodos, selectTodos, setStatus } from "../../store/todo-slice";
import { createTodoModal, selectModal } from "../../store/modal-slice";
import { ModalType } from "../../types/modal-type";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Todo from "../Todo/Todo";


function App() {
  const { todos, status } = useSelector(selectTodos);
  const { modalType, message } = useSelector(selectModal);
  const dispatch = useDispatch();

  const openedModal = modalType === ModalType.CreateTodo || modalType === ModalType.EditTodo;

  const handleCreate = () => {
    dispatch(createTodoModal());
  };


  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTodos())

    if (status === "okay") {
      dispatch(setStatus("none"));
    }
  }, [todos]);

  useEffect(() => {
    if (status === "updated") {
        // @ts-ignore
        dispatch(fetchTodos())
        dispatch(setStatus("none"))
    }
  }, [status])

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
        {status === "loading" ? (
          <h2>Loading...</h2>
        ) : (
          todos.map((todo) => <Todo key={todo.id} {...todo}/>)
        )}
      </section>
    </main>
  );
}

export default App
