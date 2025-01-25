import About from './about'
import Skills from './skills'
import Contact from './contact'
const home = ()=>{
    return (
        <div className="w-full px-[5vw] lg:pt-[15vh] sm:pt-[14vh] pt-[11vh] bg-gray-900">
            <About/>
            <Skills/>
            <Contact/>
        </div>
    )
}
export default home