import About from './about'
import Skills from './skills'
import Contact from './contact'
const home = ()=>{
    return (
        <div className="w-full lg:pt-[90px] md:pt-[85px] sm:pt-[80px] xs:pt-[70px] xss:pt-[65px] pt-[60px] bg-gray-900 lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8">
            <About/>
            <Skills/>
            <Contact/>
        </div>
    )
}
export default home