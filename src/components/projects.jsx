import {useState, useEffect} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Project = ({project})=>{

    const [clicked, setClicked] = useState(false);

    return(
        <div onClick={()=>{setClicked(!clicked)}} key={project._id} className='cursor-pointer rounded-sm h-[7vh] bg-slate-700 text-white font-bold text-xl px-3 flex items-center justify-between'>
            <div>{project.title}</div>
            {clicked? <IoIosArrowDown size={16}/>: <IoIosArrowForward size={16}/>}
        </div>
    )
}

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
        <div className="px-[5vw] w-full h-[80vh] lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-1">
            {
                projects?.map(project=>{
                    return (
                        <Project project={project}/>                        
                    )
                })
            }
        </div>
    )
}
export default Projects