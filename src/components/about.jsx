import axios from 'axios';  
import { useEffect, useState } from 'react';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";

const About = ({isLogged}) => {

    const [intro, setIntro] = useState(null);
    const [description, setDescription] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/about/get`)
        .then((response)=>{
            setIntro(response.data.data.intro);
            setDescription(response.data.data.description);
            setAvatar(response.data.data.avatar);
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
        .then((response)=>{
            console.log("avatar update hp gya hai");
            setAvatar(response.data.data.avatar);      
        })
    }

    return (
        <div className="flex sm:flex-row flex-col justify-evenly items-center h-[80vh] w-full text-white xl:gap-5 md:gap-3 sm:gap-2">
            <div className="flex justify-center sm:justify-end items-center sm:w-[40%] w-full sm:order-2 order-1 relative">
                <div className="relative z-20 xl:w-[450px] lg:w-[370px] md:w-[270px] sm:w-[220px] w-[200px] xl:h-[450px] lg:h-[370px] md:h-[270px] sm:h-[220px] h-[200px]">
                    <img src={avatar} alt="Image!" className='w-full h-full rounded-full z-20'/>
                    {
                        isLogged &&
                            <>
                                <label htmlFor="imageID"><MdOutlineModeEdit className='cursor-pointer absolute sm:right-[12%] right-[10%] bottom-3 rounded-full hover:bg-sky-500 bg-gray-700 lg:w-[40px] md:w-[35px] sm:w-[30px] w-[25px] lg:h-[40px] md:h-[35px] sm:h-[30px] h-[25px] md:p-2 p-1'/></label>
                                <input id='imageID' type="file" accept='image/*' name='avatar' className='hidden' onChange={(e)=>{handleAvatarSubmission(e)}}/>
                            </>
                    }
                </div>
                <div className='absolute xl:w-[450px] lg:w-[370px] md:w-[270px] sm:w-[220px] w-[200px] xl:h-[450px] lg:h-[370px] md:h-[270px] sm:h-[220px] h-[200px] flex justify-center items-center'>
                    <div className="absolute z-10 rounded-full xl:w-[280px] lg:w-[240px] md:w-[180px] sm:w-[140px] w-[140px] xl:h-[280px] lg:h-[240px] md:h-[180px] sm:h-[140px] h-[140px] bg-white animate-pingSlow"></div>
                </div>
            </div>
            <div className="sm:w-[60%] w-full sm:order-1 order-2 flex flex-col gap-[2vw]">
                <div className='flex items-center gap-[2vw] relative'>
                    {
                        isLogged
                        ?<form onSubmit={(e)=>{handleIntroSubmission(e)}} className='w-full flex gap-2'>
                            <input type="text" value={intro} className='bg-gray-900 w-[90%] border border-white hover:border-cyan-500 rounded-md p-2 text-2xl sm:text-3xl font-bold text-white outline-none' onChange={(e)=>{setIntro(e.target.value)}}/>
                            <button type='submit' className='hover:text-cyan-500 font-semibold'>Save</button>
                        </form>
                        :<h1 className="text-2xl sm:text-3xl font-bold text-white ">{intro}</h1>
                    }
                </div>
                <div className='flex items-center gap-[2vw] relative text-gray-300'>
                    {
                        isLogged
                        ?<form onSubmit={(e)=>{handleDescriptionSubmission(e)}} className='w-full flex gap-2'>
                            <textarea value={description} className='bg-gray-900 w-[90%] p-2 text-sm sm:text-base rounded-md border border-white hover:border-cyan-500' onChange={(e)=>{setDescription(e.target.value)}}/>
                            <button type='submit' className='hover:text-cyan-500 text-white font-semibold'>Save</button>
                         </form>
                        :<p className="text-sm sm:text-base">{description}</p>
                    }
                    </div>
            </div>
        </div>
    );
};

export default About;
