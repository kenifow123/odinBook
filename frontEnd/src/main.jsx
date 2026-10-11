import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.module.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routes from './routes.jsx'
import { AppProvider } from './components/AppProvider.jsx'

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppProvider>
          <RouterProvider router={router}/>
      </AppProvider>
  </StrictMode>,
)
