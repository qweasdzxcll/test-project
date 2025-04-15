import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { client } from './store/client'
function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
