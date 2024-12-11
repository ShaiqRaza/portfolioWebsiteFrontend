import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Header = ()=>{
    return(
        <div className="font-semibold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px] text-white fixed z-50 flex items-center justify-between lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8 bg-blue-900 w-full lg:h-[90px] md:h-[85px] sm:h-[80px] xs:h-[70px] xss:h-[65px] h-[60px]">
            <div className='md:gap-[60px] xs:gap-[35px] sm:gap-[50px] xss:gap-[25px] gap-[20px] flex items-center'>
                <NavLink to='/' className={({isActive})=>
                    `${isActive? "text-slate-800": "text-white"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                }>Home</NavLink>
                <NavLink to='/projects' className={({isActive})=>
                    `${isActive? "text-slate-800": "text-white"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                }>Projects</NavLink>
                <NavLink to='/docs' className={({isActive})=>
                    `${isActive? "text-slate-800": "text-white"} font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
                }>Docs</NavLink>
            </div>
            <FontAwesomeIcon icon={faBars} className='cursor-pointer lg:text-[20px] md:text[19px] sm:text-[18px] xs:text-[17px] text-[16px]' />
        </div>
    )
}

export default Header