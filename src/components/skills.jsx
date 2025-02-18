import '../css/scrollbar.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Masonry from "react-masonry-css";
import { FaEllipsisH } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
};

const Skill = ({
    name,
    description,
    isLogged
}) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="bg-gray-800 lg:p-6 sm:p-4 p-2 rounded-md flex-col flex items-center shadow-md mb-2 break-inside-avoid relative" onMouseLeave={() => setShowOptions(false)}>
            {isLogged && (
                <div className="absolute top-2 right-2" >
                    <button>
                        <FaEllipsisH className="text-white" onMouseEnter={() => setShowOptions(true)}/>
                    </button>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg z-10 rounded-md">
                            <button className="block w-full text-left px-4 py-2 text-sm rounded-t-md text-gray-700 hover:bg-gray-200">Edit</button>
                            <button className="block w-full text-left px-4 py-2 text-sm rounded-b-md text-gray-700 hover:bg-gray-200">Delete</button>
                        </div>
                    )}
                </div>
            )}
            <h3 className="font-bold text-xl mb-3 uppercase text-center text-sky-400">{name}</h3>
            <p className="text-sm text-gray-300 break-words text-left">
                {description}
            </p>
        </div>
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
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/skill/create`, {title: e.target[0].value, description: e.target[1].value})
        .then(response => {
            setSkills([...skills, response.data.data])
            setAddSkill(false);
        })
    }

    return (
            <>
                {
                    addSkill &&
                    <form onSubmit={handleAddSkillSubmission} className='fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-80 z-50 flex justify-center items-center'>
                        <div className='sm:w-1/2 w-[80%] bg-gray-800 p-6 rounded-md'>
                            <h2 className='text-2xl text-sky-500 font-bold mb-4'>Add a new Skill</h2>
                            <input type='text' required placeholder='Skill Name' className='outline-none w-full hover:border hover:border-cyan-500 p-2 rounded-md bg-gray-700 text-white mb-4' />
                            <textarea required placeholder='Skill Description' className='outline-none hover:border hover:border-cyan-500 w-full p-2 rounded-md bg-gray-700 text-white mb-4' />
                            <div className='w-full flex gap-2'>
                                <button onClick={()=>{setAddSkill(false)}} className='bg-red-500 hover:bg-red-600 text-white rounded-md p-2 w-1/2'>Cancel</button>
                                <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-md p-2 w-1/2'>Add</button>
                            </div>
                        </div>
                    </form>
                }
                <div className="w-full relative text-white flex flex-col items-center lg:py-12 md:py-10 py-8 mb-6 h-full">
                <h2 className="text-center font-bold text-2xl lg:text-3xl text-sky-500 mb-6">My Skills
                {isLogged && (
                    <button onClick={()=>{setAddSkill(true)}} className="text-white absolute right-0 hover:text-cyan-400">+</button>
                )}
                </h2>
            <Masonry className="w-full flex gap-2" breakpointCols={breakpointColumns}>
                {
                    skills?.map(skill => {
                        return (
                            <Skill
                                name={skill?.title}
                                description={skill?.description}
                                key={skill?._id}
                                isLogged={isLogged}
                            />
                        )
                    })
                }
            </Masonry>
                </div>
            </>
    );
};

export default Skills;