import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRoutes } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import routes from '@/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})
function App() {
  const route = useRoutes(routes)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {route}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
