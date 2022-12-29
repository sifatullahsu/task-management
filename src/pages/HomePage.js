import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';

const HomePage = () => {
  return (
    <div>
      <div class="container px-6 py-16 mx-auto">
        <div class="items-center lg:flex">
          <div class="w-full lg:w-1/2">
            <div class="lg:max-w-lg">
              <h1 class="text-3xl font-bold text-cyan-600 lg:text-5xl">Task Management<br /> Web App</h1>

              <p class="mt-4 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>

              <Link to='/login' class="px-5 py-2 mt-6 inline-block text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:bg-cyan-500">Login Now</Link>
            </div>
          </div>

          <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img class="w-full h-full lg:max-w-3xl px-10" src={hero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;