import {useState} from 'react'
const Login = ()=>{
    const [ishovered, sethovered] = useState(false)



    return (
        <div className="w-full h-[80vh] bg-gray-900 lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8 flex justify-center items-center">       
            <form
            onMouseEnter={
                ()=>{
                    sethovered(true);
                }
            }
            onMouseLeave={
                ()=>{
                    sethovered(false);
                }
            } 
            className="flex text-white"
            >
                <input type="text" placeholder="Enter Password" className="border-b-2 bg-gray-900 outline-none sm:h-[35px] sm:text-[16px] h-[30px] border-white hover:border-cyan-400 w-[200px]"/>
                <button type="submit" 
                className={
                    `${ishovered? "block":"hidden"} sm:h-[35px] sm:w-[45px] h-[30px] w-[37px] outline-none hover:bg-cyan-500 bg-cyan-400`
                }
                >Go</button>
            </form>    
        </div>
    )
}

export default Login