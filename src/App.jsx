import { useReducer }from "react";
import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";
import "./App.css";
import { TasksDispatchContext, TasksProvider } from "./TasksContext.jsx";

// Scaling Up with Reducer and Context

// Reducers let you consolidate a component’s state update logic. 
// Context lets you pass information deep down to other 
// components. You can combine reducers and context together 
// to manage state of a complex screen.

// -> You will learn
// -> How to combine a reducer with context
// -> How to avoid passing state and dispatch through props
// -> How to keep context and state logic in a separate file

// Combining a reducer with context 

// In this example from the introduction to reducers, the 
// state is managed by a reducer. The reducer function 
// contains all of the state update logic and is declared 
// at the bottom of this file:
// function tasksReducer(tasks, action) {
//     switch(action.type) {
//         case 'added': {
//             return [...tasks, {
//                 id: action.id,
//                 text: action.text,
//                 done: false,
//             }];
//         }

//         case 'changed': {
//             return tasks.map(t => {
//                 if(t.id === action.task.id) {
//                     return action.task;
//                 } else {
//                     return t;
//                 }
//             });
//         }

//         case 'deleted': {
//             return tasks.filter(t => t.id !== action.id);
//         }

//         default: {
//             throw Error("unknown action" + action.type);
//         }
//     }
// }

// export default function TaskApp() {
//     const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

//     function handleAddTask(text) {
//         dispatch({
//             type: 'added',
//             id: nextId++,
//             text: text,
//         });
//     }

//     function handleChangeTask(task) {
//         dispatch({
//             type: 'changed',
//             task: task,
//         })
//     }

//     function handleDeleteTask(taskId) {
//         dispatch({
//             type: 'deleted',
//             id: taskId,
//         });
//     }
//     return(
//         <>
//         <h1>Day off in Kyoto</h1>
//         <AddTask onAddTask={handleAddTask} />

//         <TaskList tasks={tasks} 
//         onChange={handleChangeTask} 
//         onDeleteTask={handleDeleteTask} />
//         </>
//     );
// }


// A reducer helps keep the event handlers short and concise. 
// However, as your app grows, you might run into another difficulty. 
// Currently, the tasks state and the dispatch function are only 
// available in the top-level TaskApp component. To let other 
// components read the list of tasks or change it, you have to explicitly 
// pass down the current state and the event handlers that change 
// it as props.

// For example, TaskApp passes a list of tasks and the event handlers 
// to TaskList:

{/* <TaskList
  tasks={tasks}
  onChangeTask={handleChangeTask}
  onDeleteTask={handleDeleteTask}
/> */}


// And TaskList passes the event handlers to Task:

{/* <Task
  task={task}
  onChange={onChangeTask}
  onDelete={onDeleteTask}
/> */}

// In a small example like this, this works well, but if you have tens 
// or hundreds of components in the middle, passing down all state 
// and functions can be quite frustrating!

// This is why, as an alternative to passing them through props, 
// you might want to put both the tasks state and the dispatch 
// function into context. This way, any component below TaskApp 
// in the tree can read the tasks and dispatch actions without the 
// repetitive “prop drilling”.
// ==============================================================
// Here is how you can combine a reducer with context:
// 1-> Create the context.
// 2-> Put state and dispatch into context.
// 3-> Use context anywhere in the tree.

// Step 1: Step 1: Create the context 

// The useReducer Hook returns the current tasks and the dispatch 
// function that lets you update them:
// const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

// To pass them down the tree, you will create two separate 
// contexts:

// .TasksContext provides the current list of tasks.
// .TasksDispatchContext provides the function that lets 
// components dispatch actions.

// Export them from a separate file so that you can later import 
// them from other files: -> go to TaskContext.jsx


// Step 2: Put state and dispatch into context
// Now you can import both contexts in your TaskApp component. Take
//  the tasks and dispatch returned by useReducer() and provide 
// them to the entire tree below:

// import { TasksContext, TasksDispatchContext }from './TasksContext.jsx';

// export function TaskApp() {
//     const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
//     // ...
//     return (
//         <TasksContext.Provider value={tasks}>
//             <TasksDispatchContext.Provider value={dispatch}>
//                 {/* ... */}
//             </TasksDispatchContext.Provider>
//         </TasksContext.Provider>
//     );
// }

// For now, you pass the information both via props and in context:
// export function TaskApp() {
//   const [tasks, dispatch] = useReducer(
//     tasksReducer,
//     initialTasks
//   );

//   function handleAddTask(text) {
//     dispatch({
//       type: 'added',
//       id: nextId++,
//       text: text,
//     });
//   }

//   function handleChangeTask(task) {
//     dispatch({
//       type: 'changed',
//       task: task
//     });
//   }

//   function handleDeleteTask(taskId) {
//     dispatch({
//       type: 'deleted',
//       id: taskId
//     });
//   }

//   return (
//     <TasksContext.Provider value={tasks}>
//       <TasksDispatchContext.Provider value={dispatch}>
//         <h1>Day off in Kyoto</h1>
//         <AddTask
//           onAddTask={handleAddTask}
//         />
//         <TaskList
//           tasks={tasks}
//           onChangeTask={handleChangeTask}
//           onDeleteTask={handleDeleteTask}
//         />
//       </TasksDispatchContext.Provider>
//     </TasksContext.Provider>
//   );
// }

// function tasksReducer(tasks, action) {
//   switch (action.type) {
//     case 'added': {
//       return [...tasks, {
//         id: action.id,
//         text: action.text,
//         done: false
//       }];
//     }
//     case 'changed': {
//       return tasks.map(t => {
//         if (t.id === action.task.id) {
//           return action.task;
//         } else {
//           return t;
//         }
//       });
//     }
//     case 'deleted': {
//       return tasks.filter(t => t.id !== action.id);
//     }
//     default: {
//       throw Error('Unknown action: ' + action.type);
//     }
//   }
// }
// In the next step, you will remove prop passing.


// Step 3: Use context anywhere in the tree

// Now you don’t need to pass the list of tasks or 
// the event handlers down the tree:

{/* <TasksContext.Provider value={tasks}>
  <TasksDispatchContext.Provider value={dispatch}>
    <h1>Day off in Kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksDispatchContext.Provider>
</TasksContext.Provider> */}


// Instead, any component that needs the task list can read it 
// from the TaskContext:

// export default function TaskList() {
//   const tasks = useContext(TasksContext);
// ...

// To update the task list, any component can read the dispatch 
// function from context and call it:


// export default function AddTask() {
//   const [text, setText] = useState('');
//   const dispatch = useContext(TasksDispatchContext);
//   // ...
//   return (
//     // ...
//     <button onClick={() => {
//       setText('');
//       dispatch({
//         type: 'added',
//         id: nextId++,
//         text: text,
//       });
//     }}>Add</button>
// ...
// =================================================================

// The TaskApp component does not pass any event handlers 
// down, and the TaskList does not pass any event handlers 
// to the Task component either. Each component reads the 
// context that it needs:

// import {TasksContext, TasksDispatchContext } from "./TasksContext.jsx";

// export default function App() {
//   return <TaskApp />
// }


// export function TaskApp() {
//   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

//   return (
//   <TasksContext.Provider value={tasks}>
//   <TasksDispatchContext.Provider value={dispatch}>
//     <h1>Day off in Kyoto</h1>
//     <AddTask />
//     <TaskList />
//   </TasksDispatchContext.Provider>
// </TasksContext.Provider>
//   );
// }


// function tasksReducer(tasks, action) {
//   switch (action.type) {
//     case 'added': {
//       return [...tasks, {
//         id: action.id,
//         text: action.text,
//         done: false
//       }];
//     }

//     case 'changed': {
//       return tasks.map(t => {
//         if (t.id === action.task.id) {
//           return action.task;
//         } else {
//           return t;
//         }
//       });
//     }

//     case 'deleted': {
//       return tasks.filter(t => t.id !== action.id);
//     }
//   }
// }

// ==================================================================

// import AddTask from './AddTask.jsx';
// import TaskList from './TaskList.jsx';
// import { TasksProvider } from './TasksContext.jsx';

// export default function App() {
//   return <TaskApp/>
// }


// export function TaskApp() {
//   return (
//     <TasksProvider>
//       <h1> Day off in kyoto </h1>
//       <AddTask />
//       <TaskList />
//     </TasksProvider>
//   );
// }
// ====================================================================

// You can also export functions that use the context from 
// TasksContext.js:

// export function useTasks() {
//   return useContext(TasksContext);
// }

// export function useTasksDispatch() {
//   return useContext(TasksDispatchContext);
// }

// When a component needs to read context, it can do it through these functions:

// const tasks = useTasks();
// const dispatch = useTasksDispatch();

// This doesn’t change the behavior in any way, but it lets you 
// later split these contexts further or add some logic to these 
// functions. Now all of the context and reducer wiring is in 
// TasksContext.js. This keeps the components clean and 
// uncluttered, focused on what they display rather than where 
// they get the data:

export default function App(){
  return <TaskApp />;
}

export function TaskApp() {
  return (<TasksProvider>
    <h1>Day off in kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksProvider>
  );
}


