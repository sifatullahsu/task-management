import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="px-4 py-12 md:py-20 bg-cyan-600 text-white border-t">
      <div className="container">
        <div className="flex items-center justify-center flex-shrink-0">
          <img src={logo} className='w-40 md:w-56 bg-white px-5 py-2 rounded' alt="" />
        </div>
        <ul className="flex flex-wrap justify-center mt-6 space-x-4 sm:space-x-8">
          <li><Link to=''>Instagram</Link></li>
          <li><Link to=''>Facebook</Link></li>
          <li><Link to=''>Twitter</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;