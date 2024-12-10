import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
const Layout = ()=>{
    return (
      <>
        <div className='h-screen w-screen'>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </>
    )
  }

export {Layout}