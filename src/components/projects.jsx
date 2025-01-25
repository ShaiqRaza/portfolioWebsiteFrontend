import {useState, useEffect} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Project = ({project})=>{

    const [clicked, setClicked] = useState(false);

    return(
        <div onClick={()=>{setClicked(!clicked)}} key={project._id} className='rounded-sm bg-slate-700 text-white px-3'>
            <div className='capitalize cursor-pointer h-[7vh] flex items-center justify-between font-bold text-xl'>
                <div>{project.title}</div>
                {clicked? <IoIosArrowDown size={16}/>: <IoIosArrowForward size={16}/>}
            </div>
            {
                clicked &&
                <div className='flex flex-col gap-3 px-3'>
                    <p>{project.description}</p>
                    <div className='w-full columns-1 sm:columns-2 lg:columns-3 gap-2'>
                        {
                            images?.length>0 &&
                            images.map(image => {
                                return (
                                    <img src={image.image} key={_id} className='h-max-[40vh] w-max-[80vw] h-auto'/>
                                )
                            })
                        }
                    </div>
                    <div className='w-full justify-center py-5'>
                        {
                            video &&
                            <video src="project.video"></video>
                        }
                    </div>
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