// import { useState } from 'react';

// export default function AddTask({ onAddTask }) {
//     const [text, setText] = useState('');
//     return (
//         <>
//         <input onChange={(e)=> {setText(e.target.value)}} 
//         value={text} 
//         placeholder='Add task' />
//         <button onClick={() => {
//             setText('');
//             onAddTask(text);
//         }}>Add</button>
//         </>
//     );
//}

// ====================================================================
// import {useState, useContext } from 'react';
// import { TasksDispatchContext } from './TasksContext';

// export default function AddTask() {
//     const [text, setText] = useState('');
//     const dispatch = useContext(TasksDispatchContext);

//     return (
//        <>
//         <input value={text} 
//         onChange={e => setText(e.target.value)} 
//         />

//         <button onClick={() => {
//             setText('');
//             dispatch({
//                 type: 'added',
//                 id: nextId++,
//                 text: text,
//             });
//         }}>Add</button>
//        </>
//     );
// }

// let nextId = 3;

// =================================================
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext';
export default function AddTask() {
    const [text, setText] = useState('');
    const dispatch = useTasksDispatch();

    return (
       <>
        <input value={text} 
        onChange={e => setText(e.target.value)} 
        />

        <button onClick={() => {
            setText('');
            dispatch({
                type: 'added',
                id: nextId++,
                text: text,
            });
        }}>Add</button>
       </>
    );
}

let nextId = 3;








