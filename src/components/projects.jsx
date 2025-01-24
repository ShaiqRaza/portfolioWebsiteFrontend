import {useState, useEffect} from 'react'
import axios from 'axios'

const Projects = ()=>{

    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        axios.get('/api/project/get-all')
        .then(response=>{
            setProjects(response.data.data)
        })
        .catch(err=>{
            return(
                <h1 className='text-5xl'>Some error Occured</h1>
            )
        })
    }, [])
    
    return (
        <div className="w-full h-[80vh] lg:pt-[90px] md:pt-[85px] sm:pt-[80px] xs:pt-[70px] xss:pt-[65px] pt-[60px] bg-gray-900 lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8">
            
        </div>
    )
}
export default Projects