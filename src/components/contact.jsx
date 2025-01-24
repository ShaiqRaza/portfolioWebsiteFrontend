import dotenv from 'dotenv'
dotenv.config();
import { useState, useEffect } from 'react';
import '../css/scrollbar.css';
import axios from 'axios'

const Contact = () => {
    const [ishovered, sethovered] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({name:e.target[0].value, email:e.target[1].value, message:e.target[2].value});
    };

    useEffect(()=>{
        if(formData){
            axios.post(`${process.env.BACKEND_URL}/contact/send-email`, formData);
            setIsSubmit(true);
        }
    }, [formData])

    return (
        <div className="w-full text-white flex flex-col items-center lg:pt-12 md:pt-10 pt-8">
            {
                isSubmit
                ? <h1>Thank you for contacting me.</h1>
                : <>
                    <h2 className="text-center font-bold text-3xl lg:text-4xl mb-6 text-blue-500 animate__animated animate__fadeIn">Contact Me</h2>

                    <form onSubmit={handleSubmit} onMouseEnter={()=>{
                        sethovered(true)
                    }}  onMouseLeave={()=>{
                        sethovered(false)
                    }} className={
                        `w-full ${ishovered? "bg-gradient-to-r from-blue-600 to-indigo-600": "bg-gray-800"} p-10 rounded-lg transform transition-all duration-300`
                    }>
                        <div className='grid sm:grid-cols-2 gap-[5%]'>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-lg font-semibold text-white">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full sm:px-4 px-3 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-lg font-semibold text-white">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full sm:px-4 px-3 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-lg font-semibold text-white">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="w-full custom-scrollbar sm:px-4 px-3 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                                rows="3"
                            />
                        </div>

                        <button type="submit" className={
                            `w-full ${ishovered? "bg-gray-800 hover:bg-gray-900":"bg-gradient-to-r from-blue-600 to-indigo-600"}  text-white p-4 rounded-lg font-semibold transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`
                        }>
                            Send Message
                        </button>
                    </form>
                </>
            }
        </div>
    );
};

export default Contact;