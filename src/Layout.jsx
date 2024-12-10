import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
const Layout = ()=>{
    return (
      <>
        <div className='w-full'>
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
      </>
    )
  }

export {Layout}