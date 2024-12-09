import { useEffect, useState } from 'react'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Layout} from './Layout'
import {Home} from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path:'home',
        element:<Home/>
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
