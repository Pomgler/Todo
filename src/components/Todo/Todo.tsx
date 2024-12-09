import deleteIcon from "../../assets/deleteIcon.svg"
import styles from "./Todo.module.css"
import editIcon from "../../assets/editIcon.svg"
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { Todo as TodoItem } from "../../types/todo";
import { useDispatch } from "react-redux";
import { createTodoModal, deleteTodoModal, editTodoModal } from "../../store/modal-slice";
import { setCurrentTodo } from "../../store/todo-slice";

const Todo: FC<TodoItem> = ({title, text, id}) => {
  const dispatch = useDispatch();

  const editTodo = () => {
    dispatch(editTodoModal());
    dispatch(setCurrentTodo(id));
  };

  const deleteTodo = () => {
    dispatch(deleteTodoModal());
    dispatch(setCurrentTodo(id));
  };

  return (
    <article className={styles.todo}>
      <p className={styles.title}>{title}</p>
      <br />
      <br />
      <p className={styles.text}>{text}</p>

      <div className={styles.buttons}>
        <button onClick={editTodo}>Edit</button>
        <button onClick={deleteTodo}>Delete</button>
      </div>
    </article>
  );
};

export default Todo;