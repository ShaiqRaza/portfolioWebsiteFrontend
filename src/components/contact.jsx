import React, { useState } from 'react';
import '../css/scrollbar.css';

const Contact = () => {
    const [ishovered, sethovered]=useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="w-full text-white flex flex-col items-center lg:pt-12 md:pt-10 pt-8">
            <h2 className="text-center font-bold text-3xl lg:text-4xl mb-6 text-blue-500 animate__animated animate__fadeIn">Contact Me</h2>

            <form onSubmit={handleSubmit} onMouseEnter={()=>{
                sethovered(true)
            }}  onMouseLeave={()=>{
                sethovered(false)
            }} className={
                `w-full max-w-lg ${ishovered? "bg-gradient-to-r from-blue-600 to-indigo-600": "bg-gray-800"} p-10 rounded-lg transform transition-all duration-300 shadow-2xl`
            }>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-lg font-semibold text-white">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full sm:px-4 px-3 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="message" className="block text-lg font-semibold text-white">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
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
        </div>
    );
};

export default Contact;
