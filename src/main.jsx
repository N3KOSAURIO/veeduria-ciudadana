import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.jsx'
import { TOSProvider } from './context/TOSContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TOSProvider>
        <App />
      </TOSProvider>
    </UserProvider>
  </StrictMode>,
)
