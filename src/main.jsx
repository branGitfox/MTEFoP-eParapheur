import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Scc from './pages/Scc.jsx'
import Tracker from './pages/Tracker.jsx'
import Register from './pages/Register.jsx'
import Stats from './pages/Stats.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },

      {
        path:'/login',
        element:<Login/>
      }
    ]
  },

  {
    path:'/',
    element:<Scc/>,
    children:[
    {
      path:'/scc',
      element:<Tracker/>,

    },

    {
      path:'/scc/register',
      element:<Register/>,
      
    },

    {
      path:'/scc/stats',
      element:<Stats/>,
      
    }
  ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
