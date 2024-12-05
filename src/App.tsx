import { useContext, useState } from 'react'
import {Todo, TodoProps} from "./components/Todo/Todo"
import './App.css'
import { Button } from './components/Button'
import {Modal} from './components/Modal'
import {ConModal} from "./components/confirmModal/ConfirmModal"
import {v4} from "uuid"
import { ToDoContext } from './context/ToDoContext'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [toDos, setToDos] = useState<TodoProps[]>([])
  const handleToDos = (title:string, text:string)=>{
    setToDos((toDos)=> [...toDos,{title,text, id:v4()} as TodoProps])
    setOpenModal(false)
  }
  const deleteToDo = (id:string)=>{
    setToDos((toDos)=> toDos.filter((todo)=>todo.id !==id) )
  }
  const toDoContext = useContext(ToDoContext) 
  return (
    <div>
      {toDos.map((todo) => <Todo state={setToDos} id={todo.id} title={todo.title} text={todo.text} key={todo.id}/> )}
      <div>
        <Button handleClick={()=> {setOpenModal(true)}} buttonText='createToDo'/>
      </div>
      <div>
        {openModal && <Modal submitValues={handleToDos} handleClick={()=>{setOpenModal(false)}}/>}
        {openConfirmModal && <ConModal msg='Are you sure?' cancel={()=>{setOpenConfirmModal(false)}} confirm={()=>{toDoContext?.toDoId && deleteToDo(toDoContext?.toDoId)}}/>} 
      </div>
    </div>
  )
}

export default App
