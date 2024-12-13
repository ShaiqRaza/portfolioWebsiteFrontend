import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="z-50 h-[20vh] text-sm text-gray-500 flex flex-col items-center justify-center bg-gray-900 py-8 w-full xs:text-[14px] text-[13px]">
      {/* Copyright Section */}
      <div className="flex items-center mb-4">
        © 2024
        <a href="#" className="hover:underline ml-1">
          MuhammadKhushamAli
        </a>
        .  All Rights Reserved.
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-6 mb-4">
        <a href="https://www.facebook.com" className=" hover:text-blue-500">
          <FaFacebook size={22} />
        </a>
        <a href="https://www.twitter.com" className=" hover:text-blue-400">
          <FaTwitter size={22} />
        </a>
        <a href="https://www.instagram.com" className=" hover:text-pink-500">
          <FaInstagram size={22} />
        </a>
        <a href="https://www.linkedin.com" className=" hover:text-blue-700">
          <FaLinkedin size={22} />
        </a>
      </div>

      {/* Contact Information */}
      <div className="flex items-center space-x-2">
        <FaPhoneAlt size={20} />
        <a href="tel:+1234567890" className=" hover:underline">
          +1 234 567 890
        </a>
      </div>
    </div>
  );
};

export default Footer;
