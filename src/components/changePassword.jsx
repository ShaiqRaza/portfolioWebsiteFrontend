import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ChangePassword = ()=>{
    const [error, setError] = useState(null);
    const  navigate = useNavigate();

    const handleSubmission = (e)=>{
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/update`, {password: e.target[1].value, currentPassword: e.target[0].value}, { withCredentials: true })
            .then(response => {
                navigate('/');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
    }

    return (
        <div className="w-full h-[80vh] lg:pt-[15vh] sm:pt-[14vh] pt-[11vh] bg-gray-900 lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8 flex justify-center items-center">       
            <form className="flex lg:gap-3 gap-4 flex-col justify-center items-center text-white" onSubmit = {handleSubmission}>
                {
                    error && <p className="relative bottom-[5vh] text-red-500">{error}</p>
                }
                <input type="password" placeholder="Current Password" className="pl-1 border-b-2 bg-gray-900 outline-none sm:h-[35px] sm:text-[16px] h-[30px] border-white hover:border-cyan-500 w-[200px]"/>
                <input type="password" placeholder="New Password" className="pl-1 border-b-2 bg-gray-900 outline-none sm:h-[35px] sm:text-[16px] h-[30px] border-white hover:border-cyan-500 w-[200px]"/>
                <button type="submit" 
                className={
                    `px-2 py-1 outline-none hover:bg-cyan-600 bg-cyan-500 rounded-[3px] font-semibold`
                }
                >Update</button>
            </form>    
        </div>
    )
}

export default ChangePassword