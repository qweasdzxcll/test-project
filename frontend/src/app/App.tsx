import { RouterProvider } from 'react-router-dom'
import { Tasks } from '../pages/ListTasks'
import { router } from './router/router'

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
