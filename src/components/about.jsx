import axios from 'axios';  
import { useEffect, useState } from 'react';

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
                <img src={about?.avatar} alt="Image!" className="rounded-full z-20 lg:w-[350px] md:w-[270px] sm:w-[230px] w-[180px] lg:h-[350px] md:h-[270px] sm:h-[230px] h-[180px]" />
                <div className='absolute lg:w-[350px] md:w-[270px] sm:w-[230px] w-[180px] lg:h-[350px] md:h-[270px] sm:h-[230px] h-[180px] flex justify-center items-center'>
                    <div className="absolute z-10 rounded-full lg:w-[220px] md:w-[170px] sm:w-[150px] w-[120px] lg:h-[220px] md:h-[170px] sm:h-[150px] h-[120px] bg-white animate-pingSlow"></div>
                </div>
            </div>
            <div className="sm:w-[60%] w-full sm:order-1 order-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{about?.intro}</h1>
                <p className="text-gray-300 mt-2 sm:text-lg text-sm">
                    {about?.description}
                </p>
            </div>
        </div>
    );
};

export default About;
