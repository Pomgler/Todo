import DeleteIcon from '@mui/icons-material/Delete';
 
 export interface TodoProps {
    title: string;
    text: string;

}
export function Todo ( {title, text}: TodoProps) {
    return (
    <div className="notice">
        <p>
            {title}
        </p>
        <div>
            <p>
                {text}
                <DeleteIcon />
            </p>
        </div>
    </div>
    )
}