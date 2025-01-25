import {useState, useEffect} from 'react'
import axios from 'axios'

const Projects = ()=>{

    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/project/get-all`)
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
        <div className="w-full h-[80vh] lg:pt-[15vh] sm:pt-[14vh] pt-[11vh] bg-gray-900">
            {
                projects?.map(project=>{
                    return (
                        <div key={project._id}>{project.title}</div>
                    )
                })
            }
        </div>
    )
}
export default Projects