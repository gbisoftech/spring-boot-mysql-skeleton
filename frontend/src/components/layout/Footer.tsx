// components/Footer.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c1f26] text-white px-20 py-6">
      <div className="">
        {/* Top Row (Links) */}
        <div
          className="hidden md:flex flex-col md:flex-row justify-end 
                      items-center space-y-4 md:space-y-0"
        >
          <div className="flex space-x-6 text-sm md:text-base">
            <a href="#" className="hover:text-gray-400">About us</a>
            <a href="#" className="hover:text-gray-400">Help Center</a>
            <a href="#" className="hover:text-gray-400">Contact us</a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-600 hidden md:block" />

        {/* Bottom Row (Icons) */}
        <div className="flex justify-center md:justify-end space-x-6 text-xl">
          <a href="#" className="hover:text-pink-400" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} style={{ color: '#DE3B40' }} />
          </a>
          <a href="#" className="hover:text-blue-500" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} style={{ color: '#4C8AFF' }} />
          </a>
          <a href="#" className="hover:text-blue-400" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} style={{ color: '#5378D0' }} />
          </a>
          <a href="#" className="hover:text-blue-400" aria-label="Youtube">
            <FontAwesomeIcon icon={faYoutube} style={{ color: 'FF4C4C' }} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
