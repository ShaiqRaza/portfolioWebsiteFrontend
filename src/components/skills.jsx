import '../css/scrollbar.css'

const Skill = ({
    name,
    description
}) => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg shadow-md hover:bg-blue-700 transition-all">
            <h3 className="font-bold text-xl mb-3 uppercase text-blue-400">{name}</h3>
            <p className="text-sm text-gray-300 overflow-y-auto h-[40px] break-words custom-scrollbar">
                {description}
            </p>
        </div>
    );
}

const Skills = () => {
    return (
        <div className="w-full text-white flex flex-col items-center lg:pt-12 md:pt-10 pt-8">
            <h2 className="text-center font-bold text-2xl lg:text-3xl mb-6 text-blue-500 animate__animated animate__fadeIn">My Skills</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
                <Skill name="HTML" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="CSS" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="JavaScript" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
            </div>
        </div>
    );
};

export default Skills;
