import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Header = ()=>{
    return(
        <div className="fixed text-white z-50 font-semibold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px] flex items-center justify-between lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8 bg-blue-900 w-full lg:h-[90px] md:h-[85px] sm:h-[80px] xs:h-[70px] xss:h-[65px] h-[60px]">
            <div className='md:gap-[60px] xs:gap-[50px] gap-[40px] flex items-center'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/projects'>Projects</NavLink>
            </div>
            <FontAwesomeIcon icon={faBars} className='cursor-pointer lg:text-[20px] md:text[19px] sm:text-[18px] xs:text-[17px] text-[16px]' />
        </div>
    )
}

export default Header