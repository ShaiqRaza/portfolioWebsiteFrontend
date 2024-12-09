import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
const Layout = ()=>{
    return (
      <>
        <Header/>
        
        <Footer/>
      </>
    )
  }

export {Layout}