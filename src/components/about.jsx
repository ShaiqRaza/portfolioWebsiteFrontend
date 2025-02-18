import axios from 'axios';  
import { useEffect, useState } from 'react';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";

const About = ({isLogged}) => {
    
    const [about, setAbout] = useState(null);
    const [intro, setIntro] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/about/get`)
        .then((response)=>{
            setAbout(response.data.data);
            setIntro(response.data.data.intro);
            setDescription(response.data.data.description);
        })
        .catch((err)=>{
            return (
                <h1 className='text-5xl'>Something Error Occured</h1>
            )
        })
    }, [])

    const handleIntroSubmission = (e) => {
        e.preventDefault(); 
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/about/update-intro`, {intro})
    }
    const handleDescriptionSubmission = (e) => {
        e.preventDefault(); 
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/about/update-description`, {description})
    }
    const handleAvatarSubmission = (e) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/about/update-avatar`, {avatar: e.target.files[0]}, {headers: {'Content-Type': 'multipart/form-data'}})
    }

    return (
        <div className="flex sm:flex-row flex-col justify-evenly items-center h-[80vh] w-full text-white sm:gap-2">
            <div className="flex justify-center sm:justify-end items-center sm:w-[40%] w-full sm:order-2 order-1 relative">
                <div className="relative z-20 lg:w-[350px] md:w-[270px] sm:w-[230px] w-[180px] lg:h-[350px] md:h-[270px] sm:h-[230px] h-[180px]">
                    <img src={about?.avatar} alt="Image!" className='w-full h-full rounded-full z-20'/>
                    {
                        isLogged &&
                            <>
                                <label htmlFor="imageID"><MdOutlineModeEdit className='cursor-pointer absolute sm:right-[12%] right-[10%] bottom-3 rounded-full hover:bg-sky-500 bg-gray-700 lg:w-[40px] md:w-[35px] sm:w-[30px] w-[25px] lg:h-[40px] md:h-[35px] sm:h-[30px] h-[25px] md:p-2 p-1'/></label>
                                <input id='imageID' type="file" name='avatar' className='hidden' onChange={(e)=>{handleAvatarSubmission(e)}}/>
                            </>
                    }
                </div>
                <div className='absolute lg:w-[350px] md:w-[270px] sm:w-[230px] w-[180px] lg:h-[350px] md:h-[270px] sm:h-[230px] h-[180px] flex justify-center items-center'>
                    <div className="absolute z-10 rounded-full lg:w-[220px] md:w-[170px] sm:w-[150px] w-[120px] lg:h-[220px] md:h-[170px] sm:h-[150px] h-[120px] bg-white animate-pingSlow"></div>
                </div>
            </div>
            <div className="sm:w-[60%] w-full sm:order-1 order-2 flex flex-col gap-[2vw]">
                <div className='flex items-center gap-[2vw] relative'>
                    {
                        isLogged
                        ?<form onSubmit={(e)=>{handleIntroSubmission(e)}} className='w-full flex gap-2'>
                            <input type="text" value={intro} className='bg-gray-900 w-[90%] border border-white hover:border-cyan-500 rounded-md p-2 text-2xl sm:text-3xl font-bold text-white outline-none' onChange={(e)=>{setIntro(e.target.value)}}/>
                            <button type='submit' className='hover:text-cyan-500'><IoMdArrowRoundForward size={22}/></button>
                        </form>
                        :<h1 className="text-2xl sm:text-3xl font-bold text-white ">{about?.intro}</h1>
                    }
                </div>
                <div className='flex items-center gap-[2vw] relative text-gray-300'>
                    {
                        isLogged
                        ?<form onSubmit={(e)=>{handleDescriptionSubmission(e)}} className='w-full flex gap-2'>
                            <textarea value={description} className='bg-gray-900 w-[90%] p-2 text-sm sm:text-base rounded-md border border-white hover:border-cyan-500' onChange={(e)=>{setDescription(e.target.value)}}/>
                            <button type='submit' className='hover:text-cyan-500'><IoMdArrowRoundForward size={22}/></button>
                         </form>
                        :<p className="text-sm sm:text-base">{about?.description}</p>
                    }
                    </div>
            </div>
        </div>
    );
};

export default About;
