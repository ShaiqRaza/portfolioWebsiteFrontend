import {useState, useEffect} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Masonry from "react-masonry-css";
const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
  };

const Project = ({project, setImageClicked})=>{

    const [clicked, setClicked] = useState(false);

    return(
        <div key={project._id} className='rounded-sm bg-slate-700 text-white px-3 break-inside-avoid'>
            <div onClick={()=>{setClicked(!clicked)}} className='capitalize cursor-pointer h-[7vh] flex items-center justify-between font-bold text-xl'>
                <div>{project.title}</div>
                {clicked? <IoIosArrowDown size={16}/>: <IoIosArrowForward size={16}/>}
            </div>
            {
                clicked &&
                <div className='flex flex-col gap-5 px-3 py-1'>
                    <p>{project.description}</p>
                    {
                        project.images?.length>0 &&
                        <div className='flex flex-col gap-5'>
                            <div className='h-[1px] w-full bg-gray-500'></div>
                            <Masonry className='w-full flex gap-2' breakpointCols={breakpointColumns}>
                                {
                                    project.images.map(image => {
                                        return (
                                            <img onClick={()=>{setImageClicked(image.image)}} src={image.image} key={image.image_id} className='hover:brightness-50 cursor-pointer hover:bg-black w-full max-h-[30vh] min-h-[5vh] h-auto mb-2'/>
                                        )
                                    })
                                }
                            </Masonry>
                        </div>
                    }
                    {
                        project.video &&
                        <div className='flex flex-col gap-5'>
                            <div className='h-[1px] w-full bg-gray-500'></div>
                            <div className='w-full flex justify-center pb-5 pt-2'>
                                <video controls src={project.video} className='max-h-[50vh] h-auto border-2 border-yellow-50'></video>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

const Projects = ()=>{

    const [projects, setProjects] = useState(null)
    const [imageClicked, setImageClicked] = useState(null);

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

        <>
            {
                imageClicked &&
                <div className={`fixed w-full h-[90vh] z-[45] flex justify-center items-center px-[5vw] sm:pt-[10vh]`}>
                    <div className='flex flex-col sm:items-center items-end justify-center w-full'>
                        <button className='text-gray-300 hover:text-white pb-4' onClick={()=>{setImageClicked(null)}}>Close</button>
                        <img src={imageClicked} alt="Image!" className='rounded-md drop-shadow-lg max-h-[50vh] min-h-[30vh] h-auto w-auto z-40' />
                    </div>
                </div>
            }
            <div className={`filter ${imageClicked && "blur-sm"} px-[5vw] w-full min-h-[80vh] h-auto lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-1 z-0`}>
                {
                    projects?.map(project=>{
                        return (
                            <Project project={project} setImageClicked={setImageClicked} key={project._id}/>                        
                        )
                    })
                }
            </div>
        </>
    )
}
export default Projects