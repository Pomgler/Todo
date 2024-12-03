import { FC, useEffect, useState } from "react"

interface ModalProps {
    handleClick(): void;
    submitValues(title:string,text:string): void;
}

export const Modal: FC<ModalProps> = ({handleClick, submitValues}) => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    return (
        <div>
            <input onChange={(event) => setTitle(event.target.value)} type="text" />
            <input onChange={(event) => setText(event.target.value)} type="text" />

            <button onClick={()=> {submitValues(title, text)}}>
                <p>Save</p>
            </button>
            <button onClick={()=> {handleClick()}}>
                <p>Cancel</p>
            </button>
        </div>

    )
}