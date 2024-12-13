import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
const Layout = ()=>{
    return (
      <>
        <div className='w-full h-screen'>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </>
    )
  }

export {Layout}