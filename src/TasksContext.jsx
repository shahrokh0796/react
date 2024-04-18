import { createContext, useReducer, useContext } from "react";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

// Here, you’re passing null as the default value to both 
// contexts. The actual values will be provided by the TaskApp 
// component.
// ======================================================================

// Moving all wiring into a single file 

// You don’t have to do this, but you could further declutter the 
// components by moving both reducer and context into a single file. 
// Currently, TasksContext.js contains only two context declarations:

// This file is about to get crowded! You’ll move the reducer into that 
// same file. Then you’ll declare a new TasksProvider component in the 
// same file. This component will tie all the pieces together:

// 1->It will manage the state with a reducer.
// 2->It will provide both contexts to components below.
// 3->It will take children as a prop so you can pass JSX to it.

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

// This removes all the complexity and wiring from your TaskApp component:


function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }

    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }

    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
  }
}





const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
  ];


// ==========================================================

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}