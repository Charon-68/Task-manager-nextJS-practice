'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';




const loadState = () => {
  try {
    
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('tasksState');
      if (serializedState === null) {
        
        return {
          tasks: [
            {
              id: 1,
              title: 'Initial Task',
              description: 'This is a default task.',
              dueDate: '2025-12-31',
              priority: 'High',
              status: 'To Do',
            },
          ],
        };
      }
      return JSON.parse(serializedState);
    }
  } catch (e) {
    console.warn('Could not load state', e);
    
    return { tasks: [] };
  }
  
  return { tasks: [] };
};



const priorityOrder = { High: 1, Medium: 2, Low: 3 };
const statusOrder = { 'To Do': 1, 'In Progress': 2, 'Done': 3 };

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case 'CYCLE_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            let newStatus = task.status;
            if (task.status === 'To Do') newStatus = 'In Progress';
            else if (task.status === 'In Progress') newStatus = 'Done';
            return { ...task, status: newStatus };
          }
          return task;
        }),
      };
         case 'REORDER_TASKS': 
      return {
        ...state,
        tasks: action.payload,
      };
       case 'IMPORT_TASKS':
      
      const importedTasks = action.payload.map(task => ({
        ...task,
        id: Date.now() + Math.random() 
      }));
      
      return {
        ...state,
        tasks: [...state.tasks, ...importedTasks], 
      };
    
    case 'SORT_TASKS':
      const sortedTasks = [...state.tasks].sort((a, b) => {
        const key = action.payload;
        if (key === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (key === 'priority') {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (key === 'status') {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return 0;
      });
      return { ...state, tasks: sortedTasks };
    default:
      return state;
  }
}


const TaskContext = createContext();


export function TaskProvider({ children }) {
  
  const [state, dispatch] = useReducer(taskReducer, loadState());

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasksState', serializedState);
      } catch (e) {
        console.warn('Could not save state', e);
      }
    }
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}


export function useTasks() {
  return useContext(TaskContext);
}
