import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Layout} from './Layout'
import {Home} from './components'
import {Login} from './components'
import {Projects} from './components'
import {Docs} from './components'
import {ChangePassword} from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'projects',
        element:<Projects/>
      },
      {
        path:'docs',
        element:<Docs/>
      },
      {
        path:'admin/update',
        element:<ChangePassword/>
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
