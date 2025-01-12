import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './ContextAPI/ContextShare.jsx'
import AuthContext from './ContextAPI/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextShare>
      <AuthContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthContext>
    </ContextShare>
  </StrictMode>,
)
