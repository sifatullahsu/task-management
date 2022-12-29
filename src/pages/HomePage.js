import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';

const HomePage = () => {
  return (
    <>
      <div className="container px-6 py-8 md:py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <img className="w-28 h-28 mb-3 block md:hidden" src={hero} alt="" />
              <h1 className="text-3xl font-bold text-cyan-600 lg:text-5xl">Task Management<br /> Web App</h1>

              <p className="mt-4 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>

              <Link to='/login' className="px-5 py-2 mt-6 inline-block text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:bg-cyan-500">Login Now</Link>
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img className="w-full h-full lg:max-w-3xl px-10 hidden md:block" src={hero} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;