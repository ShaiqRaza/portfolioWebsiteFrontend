import '../css/scrollbar.css'

const Skill = ({
    name,
    description
}) => {
    return (
        <div className="bg-gray-800 p-6 rounded-md shadow-md hover:bg-blue-700 transition-all mb-2 break-inside-avoid">
            <h3 className="font-bold text-xl mb-3 uppercase text-blue-400">{name}</h3>
            <p className="text-sm text-gray-300 break-words text-left">
                {description}
            </p>
        </div>
    );
}

const Skills = () => {
    return (
        <div className="w-full text-white flex flex-col items-center lg:pt-12 md:pt-10 pt-8">
            <h2 className="text-center font-bold text-2xl lg:text-3xl mb-6 text-blue-500 animate__animated animate__fadeIn">My Skills</h2>
            <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-2">
                <Skill name="HTML" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="CSS" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus quasi cumque sequi suscipit voluptatum aspernatur minus quasi cumque sequi suscipit voluptatum aspernatur minus quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="JavaScript" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="C++" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="DSA" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, modi impedit vel, doloribus at. Ipsa, maxime." />
                <Skill name="OOP" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sunt ad explicabo eligendi quasi cumque sequi suscipit voluptatum aspernatur minus, vitae, maxime quasi cumque sequi suscipit voluptatum aspernatur minus distinctio modi impedit vel, doloribus at. Ipsa, maxime." />
            </div>
        </div>
    );
};

export default Skills;