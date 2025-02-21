import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = ({
  isLogged,
}) => {

  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [x, setX] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/socials`)
    .then((response)=>{
      setInstagram(response.data.data.instagram);
      setFacebook(response.data.data.facebook);
      setX(response.data.data.x);
      setPhone(response.data.data.phone);
      setLinkedin(response.data.data.linkedin);
    })
  }, [])

  return (
    <>
      {
        isLogged
        ?
        <form className='flex flex-col items-center gap-5 bg-gray-900 w-full pt-5 pb-10'>
          <div className='w-full flex gap-5 flex-wrap justify-center p-6'>
            <input type="text" name='instagram' className='bg-gray-900 border-b border-white hover:border-cyan-500 outline-none text-white p-1' value={instagram} onChange={(e)=>{setInstagram(e.target.value)}}/>
            <input type="text" name='facebook' className='bg-gray-900 border-b border-white hover:border-cyan-500 outline-none text-white p-1' value={facebook} onChange={(e)=>{setFacebook(e.target.value)}}/>
            <input type="text" name='x' className='bg-gray-900 border-b border-white hover:border-cyan-500 outline-none text-white p-1' value={x} onChange={(e)=>{setX(e.target.value)}}/>
            <input type="text" name='linkedin' className='bg-gray-900 border-b border-white hover:border-cyan-500 outline-none text-white p-1' value={linkedin} onChange={(e)=>{setPhone(e.target.value)}}/>
            <input type="text" name='phone' className='bg-gray-900 border-b border-white hover:border-cyan-500 outline-none text-white p-1' value={phone} onChange={(e)=>{setLinkedin(e.target.value)}}/>
          </div>
          <button className='px-2 py-1 border border-white hover:border-cyan-500 text-white hover:text-cyan-500 bg-gray-800 rounded-md'>Save</button>
        </form>
        :
        <div className="z-50 h-[20vh] text-sm text-gray-500 flex flex-col items-center justify-evenly bg-gray-900 py-2 w-full xs:text-[14px] text-[13px]">
        <div className="flex items-center">
          ©2024
          <a href="#" className=" ml-1 hover:underline">
            MuhammadKhushamAli
          </a>
          .  All Rights Reserved.
        </div>
  
        <div className="flex space-x-6">
          <a href="https://www.facebook.com" className=" hover:text-blue-500">
            <FaFacebook size={22} />
          </a>
          <a href="https://www.twitter.com" className=" hover:text-black">
            <FaXTwitter size={22} />
          </a>
          <a href="https://www.instagram.com" className=" hover:text-pink-500">
            <FaInstagram size={22} />
          </a>
          <a href="https://www.linkedin.com" className=" hover:text-blue-700">
            <FaLinkedin size={22} />
          </a>
        </div>
  
        <div className="flex items-center space-x-2">
          <FaPhoneAlt size={20} />
          <a href="tel:+1234567890" className=" hover:underline">
            +1 234 567 890
          </a>
        </div>
      </div>
      }
    </>
  );
};

export default Footer;
