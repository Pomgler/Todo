import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/modal-slice";
import { deleteTodo } from "../../store/todo-slice";

const ConfirmModal: FC = () => {
  const dispatch = useDispatch();
  const {message} = useSelector(selectModal);

  const handleDeleteTodo = () => {
    dispatch(deleteTodo());
    dispatch(closeModal());
  };

  return (
    <div>
      <p>{message}</p>

      <nav>
        <button onClick={handleDeleteTodo}>Confirm</button>
        <button onClick={() => dispatch(closeModal())}>Cancel</button>
      </nav>
    </div>
  )
};

export default ConfirmModal;