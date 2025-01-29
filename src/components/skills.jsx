import '../css/scrollbar.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Masonry from "react-masonry-css";
const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
  };

const Skill = ({
    name,
    description
}) => {
    return (
        <div className="bg-gray-800 p-6 rounded-md flex-col flex items-center shadow-md hover:bg-blue-700 transition-all mb-2 break-inside-avoid">
            <h3 className="font-bold text-xl mb-3 uppercase text-blue-400">{name}</h3>
            <p className="text-sm text-gray-300 break-words text-left">
                {description}
            </p>
        </div>
    );
}

const Skills = () => {

    const [skills, setSkills] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/skill/get-all`)
        .then(response=>{
            setSkills(response.data.data)
        })
        .catch(err=>{
            return (
                <h1 className='text-5xl'>Something error occured</h1>
            )
        })
    }, [])

    return (
        <div className="w-full text-white flex flex-col items-center lg:py-12 md:py-10 py-8 mb-6 h-full">
            <h2 className="text-center font-bold text-2xl lg:text-3xl mb-6 text-blue-500 animate__animated animate__fadeIn">My Skills</h2>
            <Masonry className="w-full flex gap-2" columnClassName="masonry-column" breakpointCols={breakpointColumns}>
                {
                    skills?.map(skill=>{
                        return (
                            <Skill name={skill?.title} description={skill?.description} key={skill?._id}/>
                        )
                    })
                }
            </Masonry>
        </div>
    );
};

export default Skills;