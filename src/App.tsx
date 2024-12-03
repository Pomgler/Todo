import { useState } from 'react'
import {Todo, TodoProps} from "./components/Todo"
import './App.css'
import { Button } from './components/Button'
import {Modal} from './components/Modal'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [toDos, setToDos] = useState<TodoProps[]>([])
  const handleToDos = (title:string, text:string)=>{
    setToDos((toDos)=> [...toDos,{title,text}])
    setOpenModal(false)
  }
  return (
    <div>
      {toDos.map((todo) => <Todo title={todo.title} text={todo.text} key={todo.title}/> )}
      <div>
        <Button handleClick={()=> {setOpenModal(true)}} buttonText='createToDo'/>
      </div>
      <div>
        {openModal && <Modal submitValues={handleToDos} handleClick={()=>{setOpenModal(false)}}/>}
      </div>
    </div>
  )
}

export default App
