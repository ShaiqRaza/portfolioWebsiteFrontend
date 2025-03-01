import {NavLink, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react'
import axios from 'axios'

const Header = ({
    isLogged,
    setIsLogged
})=>{

    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = ()=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, {withCredentials: true})
        .then((response)=>{
            setIsLogged(!response.data.success);
            navigate('/')
        })
        .catch((err)=>{
            setIsLogged(true);
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            // Check if the page is scrolled
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return(
        <div className='w-full flex justify-center'>
            <div className={
                `lg:mt-[4vh] sm:mt-[3vh] mt-[2vh] w-[92vw] sm:px-[2vw] px-[3vw] rounded-md shadow-2xl font-black lg:font-bold sm:font-extrabold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px] text-white fixed z-50 flex items-center justify-between bg-blue-900 ${isScrolled? "sm:h-[11vh] h-[9vh]": "sm:h-[12vh] h-[10vh]"}`
            }>
                <div className='md:gap-[60px] xs:gap-[35px] sm:gap-[50px] xss:gap-[25px] gap-[20px] flex items-center'>
                    <NavLink 
                        to='/' 
                        className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"}`
                        }>
                        Home
                    </NavLink>
                    <NavLink 
                        to='/projects' 
                        className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"}`
                        }>
                        Projects
                    </NavLink>
                    <NavLink 
                        to='/docs' 
                        className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"}`
                        }>
                        Docs
                    </NavLink>
                </div>
                <div className='flex lg:gap-12 md:gap-11 sm:gap-10 xs:gap-8 gap-6 font-black lg:font-bold sm:font-extrabold '>
                    {
                        isLogged 
                        && <button onClick={handleLogout} className='lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px] font-black lg:font-bold sm:font-extrabold text-white hover:text-cyan-400'>Logout</button>
                    }          
                        <NavLink 
                        to={isLogged? '/admin/update': '/login'}
                        className={({isActive})=>
                            `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"}`
                        }>
                        <FontAwesomeIcon icon={faPen} className='cursor-pointer lg:text-[20px] md:text[19px] sm:text-[18px] xs:text-[17px] text-[16px]' />
                    </NavLink> 
                </div>
                </div>
        </div>
    )
}

export default Header