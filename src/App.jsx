
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'



function App() {

  
  return (
    <>
        <Nav/>
        <Outlet/>
        <ToastContainer/>
    </>
  )
}

export default App