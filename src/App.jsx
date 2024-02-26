import React from "react";
import { useState, useReducer } from "react";
import  taskReducer  from "./tasksReducer.jsx";

// Extracting State Logic into a Reducer
// Components with many state updates spread across many event
// handlers can get overwhelming. For these cases, you can consolidate
// all the state update logic outside your component in a single
// function, called a reducer

// Consolidate state logic with a reducer

// As your components grow in complexity, it can get harder
// to see at a glance all the different ways in which a component’s
// state gets updated. For example, the TaskApp component below
// holds an array of tasks in state and uses three different
// event handlers to add, remove, and edit tasks:

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

// export default function App() {
//   return <TaskApp />;
// }

// export function TaskApp() {
//   const [tasks, setTasks] = useState(initialTasks);

//   function handleAddTask(text) {
//     setTasks([
//       ...tasks,
//       {
//         id: nextId++,
//         text: text,
//         done: false,
//       },
//     ]);
//   }

//   function handleChangeTask(task) {
//     setTasks(
//       tasks.map((t) => {
//         if (t.id === task.id) {
//           return task;
//         } else {
//           return t;
//         }
//       })
//     );
//   }

//   function handleDeleteTask(taskId) {
//     setTasks(
//       tasks.filter((t) => {
//         return t.id !== taskId;
//       })
//     );
//   }

//   return (
//     <>
//       <h1> Prague itinerary </h1>
//       <AddTask onAddToTask={handleAddTask} />
//       <TaskList
//         tasks={tasks}
//         onChangeTask={handleChangeTask}
//         onDeleteTask={handleDeleteTask}
//       />
//     </>
//   );
// }

// export function AddTask({ onAddToTask }) {
//   const [text, setText] = useState("");
//   return (
//     <>
//       <label>
//         <input
//           placeholder="Add task"
//           onChange={(e) => {
//             setText(e.target.value);
//           }}
//         />
//         <button
//           onClick={() => {
//             onAddToTask(text);
//           }}
//         >
//           Add
//         </button>
//       </label>
//     </>
//   );
// }

// export function TaskList({ tasks, onChangeTask, onDeleteTask }) {
//   const [editTaskId, setEditTaskId] = useState(null);


//   return (
//     <>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
            
//             <input
//               type="checkbox"
//               checked={task.done}
//               onChange={() => onChangeTask({ ...task, done: !task.done })}
//             />{" "}
//             {editTaskId === task.id ? (
//               <>
//                 <input
//                   value={task.text}
//                   onChange={(e) => onChangeTask({ ...task, text: e.target.value })}
//                 />
//                 <button onClick={() => setEditTaskId(null)}>Save</button>
//               </>
//             ) : (
//               <>
//                 {task.text}
//                 <button onClick={() => setEditTaskId(task.id)}>Edit</button>
//               </>
//             )}
//             {"  "}
//             <button onClick={() => onDeleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

/*
Each of its event handlers calls setTasks in order to update the 
state. As this component grows, so does the amount of state logic 
sprinkled throughout it. To reduce this complexity and keep all 
your logic in one easy-to-access place, you can move that state 
logic into a single function outside your component, called a “reducer”.
*/

// Reducers are a different way to handle state. You can migrate 
// from useState to useReducer in three steps:

// 1-> Move from setting state to dispatching actions.
// 2-> Write a reducer function.
// 3-> Use the reducer from your component.

// Step 1: Move from setting state to dispatching actions 

// Your event handlers currently specify what to do by setting state:

// function handleAddTask(text) {
//   setTasks([
//     ...tasks,
//     {
//       id: nextId++,
//       text: text,
//       done: false,
//     },
//   ]);
// }

// function handleChangeTask(task) {
//   setTasks(
//     tasks.map((t) => {
//       if (t.id === task.id) {
//         return task;
//       } else {
//         return t;
//       }
//     })
//   );
// }

// function handleDeleteTask(taskId) {
//   setTasks(tasks.filter((t) => t.id !== taskId));
// }

// Remove all the state setting logic. What you are left with 
// are three event handlers:

// .handleAddTask(text) is called when the user presses “Add”.
// .handleChangeTask(task) is called when the user toggles a task or presses “Save”.
// .handleDeleteTask(taskId) is called when the user presses “Delete”.

// Managing state with reducers is slightly different from directly 
// setting state. Instead of telling React “what to do” by setting 
// state, you specify “what the user just did” by dispatching 
// “actions” from your event handlers. (The state update logic will 
// live elsewhere!) So instead of “setting tasks” via an event 
// handler, you’re dispatching an “added/changed/deleted a task” 
// action. This is more descriptive of the user’s intent.

// function handleAddTask(text) {
//   dispatchEvent({
//     type: 'added',
//     id: nextId++,
//     text: text,
//   });
// }

// function handleChangeTask(task) {
//   dispatchEvent({
//     type: 'changed',
//     task: task,
//   });
// }


// function handleDeleteTask(taskId) {
//   dispatchEvent({
//     type: "deleted",
//     id: taskId, 
//   });
// }
// The object you pass to dispatch is called an “action”:

// It is a regular JavaScript object. You decide what to put 
// in it, but generally it should contain the minimal information 
// about what happened. (You will add the dispatch function 
// itself in a later step.)


// Note
// An action object can have any shape.
// By convention, it is common to give it a string type that describes 
// what happened, and pass any additional information in other 
// fields. The type is specific to a component, so in this example 
// either 'added' or 'added_task' would be fine. Choose a 
// name that says what happened!

// Step 2: Write a reducer function

// A reducer function is where you will put your state logic. 
// It takes two arguments, the current state and the action 
// object, and it returns the next state:

// function yourReducer(state, action) {
  // return next state for React to set
// }


// React will set the state to what you return from the reducer.

// To move your state setting logic from your event handlers to 
// a reducer function in this example, you will:

// 1-> Declare the current state (tasks) as the first argument.
// 2->Declare the action object as the second argument.
// ->Return the next state from the reducer (which React will set the state to).

// Here is all the state setting logic migrated to a reducer function:

// function taskReducer(tasks, action) {
//   if (action.type === 'added') {
//     return [
//       ...tasks,
//       {
//         id: nextId++,
//         text: action.text,
//         done: false,
//       },
//     ];
//   } else if (action.type === 'changed') {
//     return tasks.map((task) => {
//       if (task.id === action.task.id) {
//         return action.task;
//       } else {
//         return task;
//       }
//     });
//   } else if (action.type === 'deleted') {
//     return tasks.filter((t) => t.id !== action.id);
//   } else {
//     throw Error("Unknown action: " + action.type);
//   }
// }

// Because the reducer function takes state (tasks) as an argument, 
// you can declare it outside of your component. This decreases 
// the indentation level and can make your code easier to read.

// The code above uses if/else statements, but it’s a convention 
// to use switch statements inside reducers. The result is the 
// same, but it can be easier to read switch statements at a 
// glance.

// We’ll be using them throughout the rest of this documentation like so:

// function taskReducer(tasks, action) {
//   switch(action.type) {
//     case "added": {
//       return [
//         ...tasks,
//         {
//           id: nextId++,
//           text: action.text,
//           done: false,
//         },
//       ];
//     }

//     case "changed": {
//     return tasks.map((t) => {
//       if (t.id === action.task.id) {
//         return action.task;
//       } else {
//         return t;
//       }
//     });
//   }

//     case "deleted": { 
//     return tasks.filter(t => t.id !== action.id);
//     }

//     default: {
//       throw Error("Unknown action: " + action.type);
//     }
//   }
// }

// We recommend wrapping each case block into the { and } curly 
// braces so that variables declared inside of different cases
//  don’t clash with each other. Also, a case should usually 
// end with a return. If you forget to return, the code will 
// “fall through” to the next case, which can lead to mistakes!

// If you’re not yet comfortable with switch statements, using if/else is completely fine.


// Step 3: Use the reducer from your component

// Finally, you need to hook up the tasksReducer to your component. 
// Import the useReducer Hook from React:

// import { useRecuder } from 'react'; 

// Then you can replace useState
// const [tasks, setTasks] = useState(initialTasks);

// with useReducer like so:

// const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

// The useReducer Hook is similar to useState—you must pass 
// it an initial state and it returns a stateful value and 
// a way to set state (in this case, the dispatch function). 
// But it’s a little different.

// The useReducer Hook takes two arguments:
// 1. A reducer function
// 2. An initial state
// And it returns:
// 1. A stateful value
// 2. A dispatch function (to “dispatch” user actions to the reducer)

// Now it’s fully wired up! Here, the reducer is declared at 
// the bottom of the component file:


// export default function App () {
//   return <TaskApp />
// }

// export function TaskApp() {
//   const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

//   function handleAddTask(text) {
//     dispatch({
//       type: 'added',
//       text: text,
//       id: nextId++,
//     });
//   }

//   function handleChangeTask(task) {
//     dispatch({
//       type: 'changed',
//       task: task,
//     });
//   }

//   function handleDeleteTask(taskId) {
//     dispatch({
//       type: 'deleted',
//       id: taskId,
//     });
//   }

//   return (
//     <>
//     <h1> Prague itinerary</h1>
//     <AddTask onAddTask={handleAddTask} />
//     <TaskList tasks={tasks} 
//     onChangeTask={handleChangeTask}
//     onDeleteTask={handleDeleteTask} />
//     </>
//   )
// }

// function taskReducer(taskState, actions) {
//   switch (actions.type) {
//     case 'added': {
//       return [
//         ...taskState,
//         {
//           text: actions.text,
//           id: actions.id,
//           done: false,
//         }
//       ]
//     }

//     case 'changed': {
//       return taskState.map((task) => {
//         if (task.id === actions.task.id) {
//           return actions.task;
//         } else {
//           return task;
//         }
//       })
//     }

//     case 'deleted': {
//       return taskState.filter((t) => t.id !== actions.id);
//     }

//     default: {
//       throw Error("Unknown action please check you code");
//     }
//   }
// }

// export function AddTask({ onAddToTask }) {
//   const [text, setText] = useState("");
//   return (
//     <>
//       <label>
//         <input
//           placeholder="Add task"
//           onChange={(e) => {
//             setText(e.target.value);
//           }}
//         />
//         <button
//           onClick={() => {
//             onAddToTask(text);
//           }}
//         >
//           Add
//         </button>
//       </label>
//     </>
//   );
// }


// export function TaskList({ tasks, onChangeTask, onDeleteTask }) {
//   const [editTaskId, setEditTaskId] = useState(null);
//   return (
//     <>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
            
//             <input
//               type="checkbox"
//               checked={task.done}
//               onChange={() => onChangeTask({ ...task, done: !task.done })}
//             />{" "}
//             {editTaskId === task.id ? (
//               <>
//                 <input
//                   value={task.text}
//                   onChange={(e) => onChangeTask({ ...task, text: e.target.value })}
//                 />
//                 <button onClick={() => setEditTaskId(null)}>Save</button>
//               </>
//             ) : (
//               <>
//                 {task.text}
//                 <button onClick={() => setEditTaskId(task.id)}>Edit</button>
//               </>
//             )}
//             {"  "}
//             <button onClick={() => onDeleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////

// If you want, you can even move the reducer to a different file:

// export default function App () {
//   return <TaskApp />
// }

// export function TaskApp() {
//   const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

//   function handleAddToTask(text) {
//     dispatch({
//       type: 'added',
//       id: nextId++,
//       text: text,
//     });
//   }
//   function handleChangeTask(task) {
//     dispatch({
//       type: 'changed',
//       task: task,
//     });
//   }
//   function handleDeleteTask(taaskId) {
//     dispatch({
//       type: 'deleted',
//       id: taaskId,
//     });
//   }

//   return (<>
//     <h1>Prague itinerary</h1>
//     <AddTask addToTask={handleAddToTask} />

//     <TaskList tasks={tasks} 
//     onDeleteTask={handleDeleteTask}
//     onChangeTask={handleChangeTask} />
//   </>)
// }

// export function AddTask( { addToTask }) {
//   const [text, setText] = useState("");

//   return (<>
//   <label>
//     <input value={text} onChange={(e) => { setText(e.target.value)}} />
//     {" "}
//     <button onClick={() => {addToTask(text)}}> Add </button>
//   </label>
//   </>);
// }


// export function TaskList({ tasks, onDeleteTask, onChangeTask }) {
//   const [edit, setEdit] = useState(null);

//   return (
//   <ul>
//     {tasks.map((task) => (
//       <li key={task.id}>

//         <input type="checkbox" checked={task.done}
//         onChange={() => onChangeTask({
//           ...task, done: !task.done
//         })} />

//         { edit === task.id ? (<>
//         <input value={task.text} onChange={(e) => onChangeTask({...task, text: e.target.value})} />
//         <button onClick={() => setEdit(null)}>Save</button>
//         </>) : (<>
//         {task.text}
//         <button onClick={()=> setEdit(task.id)}>Edit</button>
//          </>)
//          }

//       <button onClick={() => onDeleteTask(task.id)}>Delete</button>

//       </li>
//     ))}
//   </ul>
//   );
// }
