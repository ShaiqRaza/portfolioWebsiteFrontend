const About = ()=>{
    return(
        <div className="flex sm:flex-row flex-col justify-center items-center h-[60%] w-full">
            <div className="flex justify-center items-center sm:w-1/2 w-full">
                <img src='/images/khusham.jpg' alt="Image!" className="rounded-full z-20 lg:w-[250px] md:w-[220px] sm:w-[180px] w-[140px] lg:h-[250px] md:h-[220px] sm:h-[180px] h-[140px]"/>
                <div className="absolute z-10 rounded-full lg:w-[170px] md:w-[150px] sm:w-[110px] w-[90px] lg:h-[170px] md:h-[150px] sm:h-[110px] h-[90px] bg-white animate-pingSlow"></div>
            </div>
            <div className="sm:w-1/2 w-full">
                <h1>Hi, i am Muhammad Khusham Ali</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime.
                </p>
            </div>
        </div>
    )
}

export default About