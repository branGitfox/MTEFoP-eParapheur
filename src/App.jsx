
import { useContext } from 'react';
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'
import { userContext } from './components/ContextWrapper';



function App() {


  return (
    <>
        <Nav/>
        <Outlet/>
    </>
  )
}

export default App