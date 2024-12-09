import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([1, 2, 3, 4, 5])

  useEffect(()=>{
    axios.get('/api').then((response)=>{
      setData(response.data);
      console.log(data)
      console.log(response)
      console.log(response.data)
    })
  }, [])

  return (
    <>
      <p className='text-2xl font-mono text-red-900'>{data.length}</p>
    </>
  )
}

export default App
