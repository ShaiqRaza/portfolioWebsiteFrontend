import { useEffect, useState } from 'react'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Layout} from './Layout'
import {Home} from './components'
import {Login} from './components'
import {Projects} from './components'

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
