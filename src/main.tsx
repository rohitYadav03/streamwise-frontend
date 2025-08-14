import { createRoot  } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthListener from './components/AuthListener.tsx'

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
 <AuthListener />
  <App />
  
  </BrowserRouter>
   
 
)
