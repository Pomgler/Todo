import { createContext, FC, ReactNode, useState } from "react";

interface Provider{
    toDoId: string;
    setToDoId: React.Dispatch<React.SetStateAction<string>>
}

export const ToDoContext = createContext<Provider|undefined>(undefined)

export const ToDoProvider:FC <{children: ReactNode}> = ({children})=> {
    const [toDoId, setToDoId] = useState('')
    return (
        <ToDoContext.Provider value={{setToDoId,toDoId}}>{children}</ToDoContext.Provider>
    )
}