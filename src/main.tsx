import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Import the generated route tree of TanStack router
import { routeTree } from './routeTree.gen'

import './index.css'
import { Toaster } from './components/ui/toaster'
import { useLoginStore } from './stores/authStore'

const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context: {
    token: null,
    setUserData: () => {},
    email: null,
    name: null,
  },
  defaultPreload: 'intent',
})
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  const useAuth = useLoginStore()
  return <RouterProvider router={router} context={{ ...useAuth }} />
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <Toaster />
    </>
  )
}
