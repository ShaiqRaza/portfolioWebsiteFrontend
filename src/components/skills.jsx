import '../css/scrollbar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Masonry from "react-masonry-css";
import { FaEllipsisH } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const breakpointColumns = {
    default: 6,
    1000: 5,
    700: 4,
    580: 3,
    400: 2
};

const Skill = ({
    title,
    description,
    isLogged,
    ID,
    handleSkillDeletion,
    handleSkillUpdation,
    logo
}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [updateSkill, setUpdateSkill] = useState(false);
    const [stateTitle, setStateTitle] = useState(title);
    const [stateDescription, setStateDescription] = useState(description);

    useScrollAnimation();

    return (
        <>
            {
                updateSkill &&
                <form onSubmit={(e)=>{handleSkillUpdation(e, ID); setUpdateSkill(false)}} className='h-screen w-screen fixed bg-black bg-opacity-80 z-50 top-0 right-0 flex justify-center items-center'>
                    <div className='sm:w-[500px] w-[85%] bg-gray-800 p-6 rounded-md flex flex-col gap-4'>
                        <h2 className='text-2xl text-cyan-500 font-bold'>Update Skill</h2>
                        <input type='text' value={stateTitle} className='outline-none w-full hover:border hover:border-cyan-500 p-2 rounded-md bg-gray-700 text-white' onChange={(e)=>{setStateTitle(e.target.value)}}/>
                        <input type="file" accept='image/*' id='logo' className='hidden'/>
                        <label htmlFor="logo" className='rounded-md block w-full py-1 px-2 bg-gray-700 border border-gray-800 text-gray-400 hover:border-cyan-500'>Add Logo</label>
                        <textarea value={stateDescription} className='outline-none hover:border hover:border-cyan-500 w-full p-2 rounded-md bg-gray-700 text-white' onChange={(e)=>{setStateDescription(e.target.value)}}/>
                        <div className='w-full flex gap-2'>
                            <button onClick={()=>{setUpdateSkill(false)}} className='bg-red-500 hover:bg-red-600 text-white rounded-md p-2 w-1/2'>Cancel</button>
                            <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-md p-2 w-1/2'>Update</button>
                        </div>
                    </div>
                </form>
            }
            <div className="bg-gray-800 lg:p-6 sm:p-4 p-2 rounded-md flex-col flex items-center gap-3 shadow-md mb-2 break-inside-avoid relative fade-in" onMouseLeave={() => setShowOptions(false)}>
                {isLogged && (
                    <div className="absolute top-2 right-2" >
                        <button className='p-1 bg-gray-800'>
                            <FaEllipsisH className="text-white" onMouseEnter={() => setShowOptions(true)}/>
                        </button>
                        {showOptions && (
                            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg z-10 rounded-md">
                                <button onClick={()=>{setUpdateSkill(true)}} className="block w-full text-left px-4 py-2 text-sm rounded-t-md text-gray-700 hover:bg-gray-200">Edit</button>
                                <button onClick={()=>handleSkillDeletion(ID)} className="block w-full text-left px-4 py-2 text-sm rounded-b-md text-gray-700 hover:bg-gray-200">Delete</button>
                            </div>
                        )}
                    </div>
                )}
                    {
                        logo &&
                        <img src={logo} alt={`${title}-image`} className='max-h-[10vh] max-w-[15vw] min-h-[3vh] min-w-[3vw] h-auto w-auto bg-none'/>
                    }
                    {
                        title &&
                        <h3 className="md:font-bold md:text-xl sm:font-extrabold sm:text-lg text-base font-black capitalize text-center text-cyan-400">{title}</h3>
                    }
                    {
                        description &&
                        <p className="text-sm text-gray-300 break-words text-justify">
                            {description}
                        </p>
                    }
            </div>
        </>
    );
}

const Skills = () => {
    const { isLogged } = useOutletContext();
    const [skills, setSkills] = useState(null);
    const [addSkill, setAddSkill] = useState(false)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/skill/get-all`)
            .then(response => {
                setSkills(response.data.data)
            })
            .catch(err => {
                return (
                    <h1 className='text-5xl'>Something error occurred</h1>
                )
            })
    }, [])

    const handleAddSkillSubmission = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/skill/create`, {title: e.target[0].value, description: e.target[2].value, logo: e.target[1].files[0]}, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            setSkills([...skills, response.data.data])
            setAddSkill(false);
        })
    }
    const handleSkillDeletion = (ID)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/skill/delete/${ID}`)
        .then(response => {
            setSkills(skills.filter(skill => skill._id != ID))
        })
    }
    const handleSkillUpdation = (e, ID)=>{
        e.preventDefault(); 
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/skill/update/${ID}`, {title: e.target[0].value, description: e.target[2].value, logo: e.target[1].files[0]}, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            setSkills(skills.map(skill => skill._id == ID ? response.data.data : skill));
        })
    }

    return (
            <>
                {
                    addSkill &&
                    <form onSubmit={handleAddSkillSubmission} className='fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-80 z-50 flex justify-center items-center'>
                        <div className='sm:w-[400px] w-[80%] bg-gray-800 p-6 rounded-md flex gap-4 flex-col'>
                            <h2 className='text-2xl text-cyan-500 font-bold'>Add a new Skill</h2>
                            <input type='text' placeholder='Skill Name' className='outline-none w-full hover:border hover:border-cyan-500 p-2 rounded-md bg-gray-700 text-white' />
                            <input type="file" accept='image/*' id='logo' className='hidden'/>
                            <label htmlFor="logo" className='rounded-md block w-full py-1 px-2 bg-gray-700 border border-gray-800 text-gray-400 hover:border-cyan-500'>Add Logo</label>
                            <textarea placeholder='Skill Description' className='outline-none hover:border hover:border-cyan-500 w-full p-2 rounded-md bg-gray-700 text-white' />
                            <div className='w-full flex gap-2'>
                                <button onClick={()=>{setAddSkill(false)}} className='bg-red-500 hover:bg-red-600 text-white rounded-md p-2 w-1/2'>Cancel</button>
                                <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-md p-2 w-1/2'>Add</button>
                            </div>
                        </div>
                    </form>
                }
                <div className="w-full relative text-white flex flex-col items-center lg:py-12 md:py-10 py-8 mb-6 h-full gap-5">
                    <h2 className="text-center font-bbbFont text-3xl sm:text-4xl lg:text-5xl text-cyan-500 mb-2">My Skills</h2>
                    <Masonry className="w-full flex justify-center gap-2" breakpointCols={breakpointColumns}>
                        {
                            skills?.map(skill => {
                                return (
                                    <Skill
                                        title={skill?.title}
                                        description={skill?.description}
                                        ID={skill?._id}
                                        key={skill?._id}
                                        isLogged={isLogged}
                                        handleSkillDeletion={handleSkillDeletion}
                                        handleSkillUpdation={handleSkillUpdation}
                                        logo={skill?.logo}
                                    />
                                )
                            })
                        }
                    </Masonry>
                    {isLogged && (
                        <div className=' w-full flex justify-center'>
                            <button onClick={()=>{setAddSkill(true)}} className="text-white sm:text-sm text-xs hover:text-cyan-400">Add Skill</button>
                        </div>
                    )}
            </div>
            </>
    );
};

export default Skills;