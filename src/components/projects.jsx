import {useState, useEffect} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Masonry from "react-masonry-css";
import { useOutletContext } from "react-router-dom" 
import { MdOutlineDeleteOutline } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../css/scrollbar.css';
import useScrollAnimation from '../hooks/useScrollAnimation.jsx';

const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
  };

const ProjectImage = ({image, ID, setImageClicked, handleImageDeletion, isLogged})=>{
    const [hovered, setHovered] = useState(false);
    return (
        <div className='relative' onMouseEnter={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}}>
            {
                hovered && <p className='absolute left-2 top-2 text-white font-medium z-20 lg:text-base sm:text-sm text-xs'>Click to Expand</p>
            }
            {
                isLogged &&
                <MdOutlineDeleteOutline onClick={()=>{handleImageDeletion(ID, image.image_id)}} onMouseEnter={()=>{setHovered(false)}} onMouseLeave={()=>{setHovered(true)}} className='cursor-pointer absolute top-[-6px] right-[-6px] text-white bg-gray-700 hover:bg-red-800 z-20 p-1 rounded-full' size={20}/>
            }
            <img onClick={()=>{setImageClicked(image.image)}} src={image.image} key={image.image_id} className='hover:brightness-50 rounded-sm cursor-pointer hover:bg-black w-full max-h-[30vh] min-h-[5vh] h-auto mb-2'/>
        </div>
    )
}

const Project = ({project, handleVideoDeletion, handleVideoAddition, setImageClicked, isLogged, handleImageDeletion, handleProjectDeletion, handleTitleUpdation, handleDiscriptionUpdation, handleAddImage})=>{

    const [clicked, setClicked] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);

    useScrollAnimation();
    
    return(
        <>
            <div key={project._id} className='rounded-sm bg-slate-700 text-white px-3 break-inside-avoid flex flex-col gap-3 fade-in'>
                <div onClick={()=>{setClicked(!clicked)}} className='capitalize cursor-pointer h-[7vh] flex items-center justify-between font-bold md:text-xl sm:text-lg text-base'>
                    {
                        isLogged
                        ?<input type="text" onClick={e=>{e.stopPropagation()}} className='sm:w-1/3 w-1/2 rounded-sm outline-none border border-white bg-slate-700 p-1 my-2 hover:border-cyan-500' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                        :title
                    }
                    {
                        isLogged &&
                        <span className='font-normal flex gap-5'>
                            <button onClick={(e)=>{e.stopPropagation(); handleTitleUpdation(project._id, title)}} className='text-white sm:text-[14px] text-[13px] hover:text-cyan-500'>save_title</button>
                            <button onClick={(e)=>{e.stopPropagation(); handleProjectDeletion(project._id)}} className='text-white sm:text-[14px] text-[13px] hover:text-cyan-500'>Delete</button>
                        </span>
                    }
                {clicked? <IoIosArrowDown size={16}/>: <IoIosArrowForward size={16}/>}
                </div>
                {
                    clicked &&
                    <div className='flex flex-col gap-5 px-3 py-1 pb-2 text-gray-300'>
                    {
                        isLogged
                        ?<form onSubmit={(e)=>{e.preventDefault(); handleDiscriptionUpdation(project._id, description)}} className='w-full flex justify-center items-center flex-col gap-2'>
                            <textarea className='w-full bg-slate-700 text-white p-2 rounded-sm outline-none border border-white hover:border-cyan-500' rows={3} value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            <button type='submit' className='sm:text-base text-sm rounded-md bg-gray-700 border border-white text-white hover:text-cyan-500 hover:border-cyan-500 py-1 px-2'>Save</button>
                        </form>
                        :<p className='first-letter:uppercase lg:text-base sm:text-sm text-xs whitespace-pre-line'>{description}</p>
                    }
                    {
                        project.images.length>0 
                        && 
                        <div className='flex flex-col gap-5'>
                            <div className='h-[1px] w-full bg-gray-500'></div>
                            <Masonry className='w-full flex gap-2' breakpointCols={breakpointColumns}>
                            {
                                project.images.map(image => 
                                    <ProjectImage handleImageDeletion={handleImageDeletion} isLogged={isLogged} ID={project._id} image={image} setImageClicked={setImageClicked} key={image.image_id}/>
                                )
                            }
                            </Masonry>
                        </div>
                    }
                    {
                        isLogged &&
                        <div className=' w-full flex justify-center'>
                            <label htmlFor='project-image' className='sm:text-sm text-xs font-semibold text-white hover:text-cyan-500 cursor-pointer'>Add Image</label>
                            <input type='file' name='image' accept='image/*' id='project-image' onChange={(e)=>{handleAddImage(project._id, e.target.files[0])}} className='hidden'/>
                        </div>
                    }
                    <div className='flex flex-col gap-5'>
                        {
                            project.video ?
                            <div>
                                <div className='h-[1px] w-full bg-gray-500'></div>
                                <div className='w-full flex flex-col justify-center items-center pb-5 pt-2 gap-5'>
                                    <video controls src={project.video} className='max-h-[50vh] h-auto border-2 border-gray-300'></video>
                                    {
                                        isLogged &&
                                        <button onClick={()=>{handleVideoDeletion(project._id, project.video_id)}} className='sm:text-sm text-xs font-semibold text-white hover:text-red-400'>Delete video</button>
                                    }
                                </div>
                            </div>
                            : <div className='w-full flex justify-center'>
                                {
                                    isLogged &&
                                <div>
                                    <label htmlFor='add-video' className='sm:text-sm text-xs font-semibold text-white hover:text-cyan-500 cursor-pointer'>Add Video</label>
                                    <input id='add-video' type='file' name='video' accept='video/*' onChange={(e)=>{handleVideoAddition(project._id, e.target.files[0])}} className='hidden'/>
                                </div>
                            }
                            </div>

                        }
                    </div>
                    </div>
                }
            </div>
        </>
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
    const handleTitleUpdation = (ID, title)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/update-title/${ID}`, {title})
        .then(response=>{
            setProjects(projects.map(proj=>proj._id==ID?response.data.data:proj))
        })
    }
    const handleDiscriptionUpdation = (ID, description)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/update-description/${ID}`, {description})
        .then(response=>{
            setProjects(projects.map(proj=>proj._id==ID?response.data.data:proj))
        })
    }
    const handleAddImage = (ID, image)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/add-image/${ID}`, {image}, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response=>{
            setProjects(projects.map(proj=>proj._id==ID?response.data.data:proj))
        })
    }
    const handleImageDeletion = (ID, image_id)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/delete-image/${ID}`, {image_id})
        .then(response=>{
            setProjects(projects.map(proj=>proj._id==ID?response.data.data:proj))
        })
    }
    const handleVideoDeletion = (ID, video_id)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/delete-video/${ID}`, {video_id})
        .then(response=>{
            setProjects(projects.map(proj=>proj._id==ID?response.data.data:proj))
        })
    }
    const handleVideoAddition = (ID, video)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/add-video/${ID}`, {video}, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response=>{
            setProjects(projects.map(proj=>proj._id==ID?response.data.data:proj))
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
                projects?
                <div>
                    {
                    addProject &&
                    <form onSubmit={addProjectSubmission} className={`fixed w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50`}>
                    <div className='sm:w-[450px] w-[80%] bg-gray-800 p-6 rounded-md flex flex-col gap-3'>
                        <h2 className='text-2xl text-cyan-500 font-bold'>Add a new Project</h2>
                        <input type="text" placeholder='Title' required className='outline-none w-full bg-gray-700 text-white p-2 rounded-md'/>
                        <textarea placeholder='Description' required className='outline-none w-full bg-gray-700 text-white p-2 rounded-md'></textarea>
                        <div className='flex gap-2'>
                            <label htmlFor="project-images" className='w-1/2 bg-gray-700 text-white sm:text-base text-sm flex justify-center rounded-md p-1 cursor-pointer hover:text-cyan-500'>Add Images</label>
                            <input id='project-images' type="file" accept='image/*' multiple className='w-full bg-gray-700 text-white p-2 rounded-md hidden'/>
                            <label htmlFor="project-video" className='w-1/2 bg-gray-700 text-white sm:text-base text-sm flex justify-center rounded-md p-1 cursor-pointer hover:text-cyan-500'>Add Video</label>
                            <input id='project-video' type="file" accept='video/*' className='w-full bg-gray-700 text-white p-2 rounded-md hidden'/>
                        </div>
                        <button type='submit' className='w-full bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600'>Add</button>
                        <button onClick={()=>{setAddProject(false)}} className='w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600'>Cancel</button>
                    </div>
                    </form>
                    }
                    {
                        projects.length>0 ?
                        <div>
                            {
                                imageClicked &&
                                <div className={`fixed w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50`}>
                                <button className='absolute sm:top-2 right-4 top-4 text-gray-500 hover:text-white text-2xl' onClick={()=>{setImageClicked(null)}}>X</button>
                                <img src={imageClicked} alt="Image!" className='rounded-md drop-shadow-lg max-h-[70vh] sm:max-w-[60vw] max-w-[90vw]' />
                                </div>
                            }
                            <div className={`px-[4vw] w-full min-h-[80vh] lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-1 z-0`}>
                            {
                                isLogged &&
                                <div className='w-full flex justify-center mb-2'>
                                    <h1 onClick={()=>{setAddProject(true)}} className='sm:text-sm text-xs text-white cursor-pointer hover:text-cyan-500'>Add project</h1>
                                </div>
                            }
                            {
                                projects.map(project=>{
                                    return (
                                        <Project isLogged={isLogged} handleVideoAddition={handleVideoAddition} handleVideoDeletion={handleVideoDeletion} handleImageDeletion={handleImageDeletion} handleAddImage={handleAddImage} handleDiscriptionUpdation={handleDiscriptionUpdation} handleTitleUpdation={handleTitleUpdation} handleProjectDeletion={handleProjectDeletion} project={project} setImageClicked={setImageClicked} key={project._id}/>                        
                                    )
                                })
                            }
                            </div>
                        </div>
                        :
                        <div className='lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] h-[80vh] w-full flex justify-center items-center flex-col gap-3 bg-gray-900 text-white'>
                            <h1 className=''>I have <span className='text-cyan-500 mx-1'>no projects</span> yet.</h1>
                            {
                                isLogged &&
                                <h1 onClick={()=>{setAddProject(true)}} className='sm:text-sm text-xs text-white cursor-pointer hover:text-cyan-500'>Add project</h1>
                            }
                        </div>
                    }
                </div>
                :
                <div className='lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] h-[80vh] w-full flex justify-center items-center bg-gray-900'>
                    <Box>
                        <CircularProgress />
                    </Box>
                </div>
            }
        </>
    )
}
export default Projects