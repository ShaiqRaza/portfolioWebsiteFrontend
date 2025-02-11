import axios from 'axios';  
import { useEffect, useState } from 'react';
import { MdOutlineModeEdit } from "react-icons/md";

const About = ({isLogged}) => {
    
    const [about, setAbout] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/about/get`)
        .then((response)=>{
            setAbout(response.data.data);
        })
        .catch((err)=>{
            return (
                <h1 className='text-5xl'>Something Error Occured</h1>
            )
        })
    }, [])

    return (
        <div className="flex sm:flex-row flex-col justify-evenly items-center h-[80vh] w-full text-white sm:gap-2">
            <div className="flex justify-center sm:justify-end items-center sm:w-[40%] w-full sm:order-2 order-1 relative">
                <div className="relative z-20 lg:w-[350px] md:w-[270px] sm:w-[230px] w-[180px] lg:h-[350px] md:h-[270px] sm:h-[230px] h-[180px]">
                    <img src={about?.avatar} alt="Image!" className='w-full h-full rounded-full z-20' />
                    {
                        isLogged && <MdOutlineModeEdit className='cursor-pointer absolute sm:right-[12%] right-[10%] bottom-3 rounded-full hover:bg-sky-500 bg-gray-700 lg:w-[40px] md:w-[35px] sm:w-[30px] w-[25px] lg:h-[40px] md:h-[35px] sm:h-[30px] h-[25px] md:p-2 p-1'/>
                    }
                </div>
                <div className='absolute lg:w-[350px] md:w-[270px] sm:w-[230px] w-[180px] lg:h-[350px] md:h-[270px] sm:h-[230px] h-[180px] flex justify-center items-center'>
                    <div className="absolute z-10 rounded-full lg:w-[220px] md:w-[170px] sm:w-[150px] w-[120px] lg:h-[220px] md:h-[170px] sm:h-[150px] h-[120px] bg-white animate-pingSlow"></div>
                </div>
            </div>
            <div className="sm:w-[60%] w-full sm:order-1 order-2">
                <div className='flex items-center gap-[2vw] relative '>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white ">{about?.intro}</h1>
                    {
                        isLogged &&
                        isLogged && <MdOutlineModeEdit className='cursor-pointer rounded-full hover:bg-sky-500 bg-gray-700 lg:w-[35px] md:w-[30px] sm:w-[25px] w-[20px] lg:h-[35px] md:h-[30px] sm:h-[25px] h-[20px] md:p-2 p-1'/>
                    }
                </div>
                <p className="text-gray-300 mt-2 sm:text-lg text-sm flex gap-[2vw]">
                    {about?.description}
                    {
                        isLogged &&
                        isLogged && <MdOutlineModeEdit className='cursor-pointer rounded-full hover:bg-sky-500 bg-gray-700 lg:w-[30px] md:w-[25px] sm:w-[20px] w-[15px] lg:h-[30px] md:h-[25px] sm:h-[20px] h-[15px] md:p-2 p-1'/>
                    }
                </p>
            </div>
        </div>
    );
};

export default About;
