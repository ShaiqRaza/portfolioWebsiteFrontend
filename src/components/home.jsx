import About from './about'
import Skills from './skills'
import Contact from './contact'
const home = ()=>{
    return (
        <div className="w-full lg:py-[90px] md:py-[85px] sm:py-[80px] xs:py-[70px] xss:py-[65px] py-[60px] bg-gray-900 lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8">
            <About/>
            <Skills/>
            <Contact/>
        </div>
    )
}
export default home