import { FC, PropsWithChildren, useContext, useState } from "react"
// import { ToDoContext } from "../../context/ToDoContext";
import styles from "./Modal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { closeModal, selectModal } from "../../store/modal-slice"
import { createTodo, editTodo, fetchCreateTodo, selectTodos } from "../../store/todo-slice"
import { ModalType } from "../../types/modal-type"

export const Modal: FC = () => {
  const { message, modalType } = useSelector(selectModal);
  const { currentTodo } = useSelector(selectTodos);
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const handleSave = () => {
    if (modalType === ModalType.CreateTodo) {
      // @ts-ignore
      dispatch(fetchCreateTodo({
        text, title,
        id: ""
      }));
    }

    if (modalType === ModalType.EditTodo) {
      dispatch(editTodo({title, text}))
    }

    dispatch(closeModal());
  }

  return (
    <div className={styles.modal}>
      <p>{message}</p>
      <div>
        <label>Title</label>
        <br />
        <input onChange={(event) => setTitle(event.target.value)} type="text" />
      </div>

      <div>
        <label>Text</label>
        <br />
        <input onChange={(event) => setText(event.target.value)} type="text" />
      </div>

      <button onClick={handleSave}>
        <p>Save</p>
      </button>

      <button onClick={() => dispatch(closeModal())}>
        <p>Cancel</p>
      </button>
    </div>

  )
}