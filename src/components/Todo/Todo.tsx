import deleteIcon from "../../assets/deleteIcon.svg"
import styles from "./Todo.module.css"
import editIcon from "../../assets/editIcon.svg"
import { Dispatch, SetStateAction, useContext } from "react";
import { ToDoContext } from "../../context/ToDoContext";

 
 export interface TodoProps {
    title: string;
    text: string;
    id: string;
    state: Dispatch<SetStateAction<TodoProps[]>>;
    confirmModal(): void;
}
export function Todo ( {title, text, id, state, confirmModal}: TodoProps) {
    const toDoContext = useContext(ToDoContext)
    const click = ()=>{
        toDoContext?.setToDoId(id)
        confirmModal()
        }
    return (
    <div className={styles.notice}>
        <p>
            {title}
        </p>
        <div>
            <p>
                {text}
            </p>
        </div>
          <img onClick={click} src={deleteIcon}/>
          <img onClick={click}src={editIcon}/>
    </div>
    )
}