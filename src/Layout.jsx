import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react' 

const Layout = ()=>{
  const [isLogged, setIsLogged] = useState(false);

  axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth`, { withCredentials: true })
    .then(response => {
        setIsLogged(response.data.success);
    })
    .catch(err => {
        setIsLogged(false);
    })

    return (
      <>
        <div className='w-full h-screen'>
          <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
          <Outlet context={{isLogged, setIsLogged}}/>
          <Footer isLogged={isLogged}/>
        </div>
      </>
    )
  }

export {Layout}