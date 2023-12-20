import { useState } from "react";

export default function TaskList ({todos, onChangeTodo, onDeleteTodo}) {
    return (<>
    <ul>
        {todos.map((todo) => (
            <li key={todo.id}>
                <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
            </li>
        ))}
    </ul>
    </>);
}

export function Task ({todo, onChange, onDelete}) {
    const [editing, setEditing] = useState(false);
    let todoContent;
    if (editing) { 
        todoContent = (<>
        <input type="text" value={todo.title} 
        onChange={(e) => {onChange({
            ...todo,
            title: e.target.value,
        })}} />

        <button onClick={() => {setEditing(false)}}> Save </button>
    </>);
    } else {
        todoContent = (<> 
        {todo.title}
        <button onClick={() => {setEditing(true)}}>Edit</button>
        </>);
    }

    return (<> 
        <label>
            <input type="checkbox" value={todo.done} 
            onChange={(e) => {onChange({
                ...todo,
                done: e.target.checked
            })}} /> { "  "}
            {todoContent}
            {"  "}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </label>

    </>);
}