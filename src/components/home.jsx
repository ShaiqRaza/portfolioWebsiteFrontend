import About from './about'
import Skills from './skills'
import Contact from './contact'
import { useOutletContext } from "react-router-dom";
const home = ()=>{

    const { isLogged } = useOutletContext();

    return (
        <div className="w-full px-[5vw] lg:pt-[15vh] sm:pt-[14vh] pt-[11vh] bg-gray-900">
            <About isLogged={isLogged}/>
            <Skills isLogged={isLogged}/>
            <Contact isLogged={isLogged}/>
        </div>
    )
}
export default home