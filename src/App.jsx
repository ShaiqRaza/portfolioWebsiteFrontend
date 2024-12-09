import { useEffect, useState } from 'react'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Layout} from './Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>
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
