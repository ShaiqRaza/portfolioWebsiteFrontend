import { useState, useEffect } from 'react';
import '../css/scrollbar.css';
import axios from 'axios'
import {useScrollbarAnimation} from '../hooks/useScrollbarAnimation.jsx';

const Contact = ({isLogged}) => {
    const [formData, setFormData] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useScrollbarAnimation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({name:e.target[0].value, email:e.target[1].value, message:e.target[2].value});
    };

    useEffect(()=>{
        if(formData){
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact/send-email`, formData);
            setIsSubmit(true);
        }
    }, [formData])

    return (
        <div className="w-full text-white flex flex-col items-center lg:pt-12 md:pt-10 pt-8 gap-4 fade-in">
            {
                isSubmit
                ? <h1 className='mb-6 text-xl'>Thank you for <span className='text-cyan-500'>contacting</span> me.</h1>
                : <>
                    <h2 className="text-center font-bold text-2xl lg:text-3xl mb-6 text-cyan-500">Contact Me</h2>
                    <form className={`w-full bg-gray-800 lg:p-8 md:p-6 sm:p-5 p-4 rounded-lg`} onSubmit={handleSubmit}>
                        <div className='grid sm:grid-cols-2 gap-4 pb-4'>
                            <div>
                                <label htmlFor="name" className="block lg:text-base sm:text-sm text-xs font-semibold text-white">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full sm:px-3 px-2 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white hover:border-cyan-400 outline-none rounded-lg text-white transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block lg:text-base sm:text-sm text-xs font-semibold text-white">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full sm:px-3 px-2 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white rounded-lg text-white hover:border-cyan-400 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block lg:text-base sm:text-sm text-xs font-semibold text-white">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="w-full custom-scrollbar sm:px-3 px-2 sm:py-2 py-1 mt-2 bg-transparent border-2 border-white rounded-lg text-white hover:border-cyan-400 outline-none transition-all"
                                rows="3"
                            />
                        </div>

                        <button type="submit" className={`w-full bg-cyan-700 hover:bg-cyan-800 text-white p-4 rounded-lg font-semibold transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                            Send Message
                        </button>
                    </form>
                </>
            }
        </div>
    );
};

export default Contact;