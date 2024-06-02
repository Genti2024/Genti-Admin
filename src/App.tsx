import { useRoutes } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import routes from '@/router'

function App() {
  const route = useRoutes(routes)
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {route}
    </ThemeProvider>
  )
}

export default App
