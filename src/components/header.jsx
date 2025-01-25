import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react'

const Header = ()=>{

    const [isScrolled, setIsScrolled] = useState(false);

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
                `lg:mt-[3vh] sm:mt-[2vh] mt-[1vh] w-[96vw] px-[3vw] rounded-md shadow-2xl font-semibold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px] text-white fixed z-50 flex items-center justify-between bg-blue-900 ${isScrolled? "sm:h-[11vh] h-[9vh]": "sm:h-[12vh] h-[10vh]"}`
            }>
                <div className='md:gap-[60px] xs:gap-[35px] sm:gap-[50px] xss:gap-[25px] gap-[20px] flex items-center'>
                    <NavLink 
                        to='/' 
                        className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                        }>
                        Home
                    </NavLink>
                    <NavLink 
                        to='/projects' 
                        className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                        }>
                        Projects
                    </NavLink>
                    <NavLink 
                        to='/docs' 
                        className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                        }>
                        Docs
                    </NavLink>
                </div>
                <NavLink 
                    to='/login'
                    className={({isActive})=>
                        `${isActive? "text-cyan-400": "text-white hover:text-cyan-400"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                    }>
                    <FontAwesomeIcon icon={faPen} className='cursor-pointer lg:text-[20px] md:text[19px] sm:text-[18px] xs:text-[17px] text-[16px]' />
                </NavLink>           
            </div>
        </div>
    )
}

export default Header