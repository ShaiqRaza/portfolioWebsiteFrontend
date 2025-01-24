import {useState, useEffect} from 'react'
import axios from 'axios'

const Login = ()=>{
    const [ishovered, sethovered] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleSubmission = (e)=>{
        e.preventDefault();
        setFormData({
            email: e.target[0].value,
            password: e.target[1].value
        })
    }

    useEffect(()=>{
        if(formData)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, formData)
    }, [formData])

    return (
        <div className="w-full h-[80vh] lg:pt-[100px] md:pt-[95px] sm:pt-[90px] xs:pt-[85px] xss:pt-[80px] pt-[75px] bg-gray-900 lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8 flex justify-center items-center">       
            <form
            onMouseEnter={
                ()=>{
                    sethovered(true);
                }
            }
            onMouseLeave={
                ()=>{
                    sethovered(false);
                }
            } 
            className="flex lg:gap-3 gap-4 flex-col justify-center items-center text-white"

            onSubmit = {handleSubmission}

            >
                <input type="email" placeholder="Enter Email" className="pl-1 border-b-2 bg-gray-900 outline-none sm:h-[35px] sm:text-[16px] h-[30px] border-white hover:border-cyan-500 w-[200px]"/>
                <input type="text" placeholder="Enter Password" className="pl-1 border-b-2 bg-gray-900 outline-none sm:h-[35px] sm:text-[16px] h-[30px] border-white hover:border-cyan-500 w-[200px]"/>
                <button type="submit" 
                className={
                    `${ishovered? "block":"hidden"} sm:h-[30px] sm:w-[45px] h-[25px] w-[37px] outline-none hover:bg-cyan-600 bg-cyan-500 rounded-[7px] font-semibold`
                }
                >Go</button>
            </form>    
        </div>
    )
}

export default Login