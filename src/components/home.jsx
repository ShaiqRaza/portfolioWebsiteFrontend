import About from './about'
import Skills from './skills'
import Contact from './contact'
const home = ()=>{
    return (
        <div className="w-full px-[5vw] lg:pt-[90px] md:pt-[85px] sm:pt-[80px] xs:pt-[70px] xss:pt-[65px] pt-[60px] bg-gray-900">
            <About/>
            <Skills/>
            <Contact/>
        </div>
    )
}
export default home