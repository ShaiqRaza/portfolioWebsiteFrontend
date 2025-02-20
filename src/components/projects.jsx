import {useState, useEffect} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Masonry from "react-masonry-css";
import { useOutletContext } from "react-router-dom" 
const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
  };

const ProjectImage = ({image, setImageClicked})=>{
    const [hovered, setHovered] = useState(false);
    return (
        <div className='relative' onMouseEnter={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}}>
            {
                hovered && <p className='absolute left-2 top-2 text-white font-medium z-20 lg:text-base sm:text-sm text-xs'>Click to Expand</p>
            }
            <img onClick={()=>{setImageClicked(image.image)}} src={image.image} key={image.image_id} className='hover:brightness-50 rounded-sm cursor-pointer hover:bg-black w-full max-h-[30vh] min-h-[5vh] h-auto mb-2'/>
        </div>
    )
}

const Project = ({project, setImageClicked, isLogged, handleProjectDeletion})=>{

    const [clicked, setClicked] = useState(false);
    
    return(
        <div key={project._id} className='rounded-sm bg-slate-700 text-white px-3 break-inside-avoid'>
            <div onClick={()=>{setClicked(!clicked)}} className='capitalize cursor-pointer h-[7vh] flex items-center justify-between font-bold text-xl'>
                <div className='flex gap-2'>
                    {project.title}
                    {
                        isLogged &&
                        <span className='font-normal flex gap-2'>|
                            <button onClick={()=>{handleProjectDeletion(project._id)}} className='text-white sm:text-[14px] text-[13px] hover:text-cyan-500'>Delete</button>
                            <button onClick={()=>{handleProjectDeletion(project._id)}} className='text-white sm:text-[14px] text-[13px] hover:text-cyan-500'>edit_title</button>
                        </span>
                    }
                </div>
                {clicked? <IoIosArrowDown size={16}/>: <IoIosArrowForward size={16}/>}
            </div>
            {
                clicked &&
                <div className='flex flex-col gap-5 px-3 py-1 text-gray-300'>
                    <p className='first-letter:uppercase whitespace-pre-line'>{project.description}</p>
                    {
                        project.images?.length>0 &&
                        <div className='flex flex-col gap-5'>
                            <div className='h-[1px] w-full bg-gray-500'></div>
                            <Masonry className='w-full flex gap-2' breakpointCols={breakpointColumns}>
                                {
                                    project.images.map(image => 
                                        <ProjectImage image={image} setImageClicked={setImageClicked} key={image.image_id}/>
                                    )
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
    const { isLogged } = useOutletContext();
    const [addProject, setAddProject] = useState(false);

    const addProjectSubmission = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", e.target[0].value);
        formData.append("description", e.target[1].value);

        Array.from(e.target[2].files).forEach((file) => formData.append("images", file));

        formData.append("videos", e.target[3].files[0]);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
            setProjects([...projects, response.data.data])
        })
        setAddProject(false);
    }
    const handleProjectDeletion = (ID)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/delete/${ID}`)
        .then(response=>{
            setProjects(projects.filter(proj=>proj._id!=ID))
        })
    }

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
                addProject &&
                <form onSubmit={addProjectSubmission} className={`fixed w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50`}>
                    <div className='lg:w-[40%] md:w-1/2 sm:w-[60%] w-[80%] bg-gray-800 p-6 rounded-md flex flex-col gap-3'>
                        <h2 className='text-2xl text-sky-500 font-bold'>Add a new Project</h2>
                        <input type="text" placeholder='Title' required className='outline-none w-full bg-gray-700 text-white p-2 rounded-md'/>
                        <textarea placeholder='Description' required className='outline-none w-full bg-gray-700 text-white p-2 rounded-md'></textarea>
                        <div className='flex gap-2'>
                            <label htmlFor="project-images" className='w-1/2 bg-gray-700 text-white sm:text-base text-sm flex justify-center rounded-md p-1 cursor-pointer hover:text-cyan-500'>Add Images</label>
                            <input id='project-images' type="file" multiple className='w-full bg-gray-700 text-white p-2 rounded-md hidden'/>
                            <label htmlFor="project-video" className='w-1/2 bg-gray-700 text-white sm:text-base text-sm flex justify-center rounded-md p-1 cursor-pointer hover:text-cyan-500'>Add Video</label>
                            <input id='project-video' type="file" accept='video/*' className='w-full bg-gray-700 text-white p-2 rounded-md hidden'/>
                        </div>
                        <button type='submit' className='w-full bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600'>Add</button>
                        <button onClick={()=>{setAddProject(false)}} className='w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600'>Cancel</button>
                    </div>
                </form>
            }
            {
                imageClicked &&
                <div className={`fixed w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50`}>
                    <button className='absolute sm:top-2 right-4 top-4 text-gray-500 hover:text-white text-2xl' onClick={()=>{setImageClicked(null)}}>X</button>
                    <img src={imageClicked} alt="Image!" className='rounded-md drop-shadow-lg max-h-[70vh] sm:max-w-[60vw] max-w-[90vw]' />
                </div>
            }
            <div className={`px-[5vw] w-full min-h-[80vh] h-auto lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-1 z-0`}>
                {
                    isLogged &&
                    <div className='w-full flex justify-center mb-2'>
                        <h1 onClick={()=>{setAddProject(true)}} className='text-6xl text-white cursor-pointer hover:text-cyan-500'>+</h1>
                    </div>
                }
                {
                    projects?.map(project=>{
                        return (
                            <Project isLogged={isLogged} handleProjectDeletion={handleProjectDeletion} project={project} setImageClicked={setImageClicked} key={project._id}/>                        
                        )
                    })
                }
            </div>
        </>
    )
}
export default Projects