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
    onEdit,
    onDelete,
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
                            <button onClick={onEdit} className="block w-full text-left px-4 py-2 text-sm rounded-t-md text-gray-700 hover:bg-gray-200">Edit</button>
                            <button onClick={onDelete} className="block w-full text-left px-4 py-2 text-sm rounded-b-md text-gray-700 hover:bg-gray-200">Delete</button>
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

    const handleAddSkill = () => {
        // Logic to add a new skill
    }

    const handleEditSkill = (id) => {
        // Logic to edit a skill
    }

    const handleDeleteSkill = (id) => {
        // Logic to delete a skill
    }

    return (
        <div className="w-full relative text-white flex flex-col items-center lg:py-12 md:py-10 py-8 mb-6 h-full">
                <h2 className="text-center font-bold text-2xl lg:text-3xl text-sky-500 mb-6">My Skills
                {isLogged && (
                    <button onClick={handleAddSkill} className="text-white absolute right-0 hover:text-cyan-400">+</button>
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
                                onEdit={() => handleEditSkill(skill?._id)}
                                onDelete={() => handleDeleteSkill(skill?._id)}
                                isLogged={isLogged}
                            />
                        )
                    })
                }
            </Masonry>
        </div>
    );
};

export default Skills;