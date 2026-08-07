import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.jsx'
import { TOSProvider } from './context/TOSContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TOSProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </TOSProvider>
    </UserProvider>
  </StrictMode>,
)
