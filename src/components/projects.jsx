import {useState, useEffect} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Project = ({project})=>{

    const [clicked, setClicked] = useState(false);

    return(
        <div key={project._id} className='rounded-sm bg-slate-700 text-white px-3 break-inside-avoid'>
            <div onClick={()=>{setClicked(!clicked)}} className='capitalize cursor-pointer h-[7vh] flex items-center justify-between font-bold text-xl'>
                <div>{project.title}</div>
                {clicked? <IoIosArrowDown size={16}/>: <IoIosArrowForward size={16}/>}
            </div>
            {
                clicked &&
                <div className='flex flex-col gap-3 px-3 py-1'>
                    <p>{project.description}</p>
                    {
                        project.images?.length>0 &&
                        <div className='w-full columns-1 sm:columns-2 lg:columns-3 gap-2'>
                                {
                                project.images.map(image => {
                                    return (
                                        <img src={image.image} key={image.image_id} className='max-h-[30vh] min-h-[15vw] h-auto mb-2 w-full'/>
                                    )
                                })
                                }
                        </div>
                    }
                    {
                        project.video &&
                        <div className='w-full flex justify-center py-5'>
                                <video controls src={project.video} className='max-h-[50vh] h-auto border-2 border-yellow-50'></video>
                        </div>
                    }
                </div>
            }
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
        <div className="px-[5vw] w-full min-h-[80vh] h-auto lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-1">
            {
                projects?.map(project=>{
                    return (
                        <Project project={project} key={project._id}/>                        
                    )
                })
            }
        </div>
    )
}
export default Projects