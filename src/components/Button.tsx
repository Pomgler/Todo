import { FC } from "react";

interface ButtonProps {
    buttonText: string;
    handleClick(): void;
}

export const Button: FC<ButtonProps> = ({buttonText, handleClick}) => {
    return (
        <button onClick={()=> {handleClick()}}>
            {buttonText}
        </button>
    )
}