import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { client } from './store/client'
import { TasksContext } from './context/TasksContext'
import { useState, useMemo } from 'react'
import { ITask } from '../entities/Task'
function App() {

  const [tasks, setTasks] = useState<ITask[]>([]);

  // Мемоизация значения контекста
  const contextValue = useMemo(() => ({ tasks, setTasks }), [tasks]);

  return (
    <QueryClientProvider client={client}>
      <TasksContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </TasksContext.Provider>
    </QueryClientProvider>
  );
}

export default App
