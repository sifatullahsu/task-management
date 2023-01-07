import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';
import logo from '../assets/logo.png';
import { FaMoon, FaSun } from 'react-icons/fa';
import { setLocalStorage } from '../utilities/utilities';
import { slide as Menu } from 'react-burger-menu'

const Header = () => {
  const { user, userLogout, dark, setDark } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuToggle, setMenuToggle] = useState(false);

  const handleLogout = () => {
    userLogout()
      .then(result => {
        toast.success('Logout successfull..');
        navigate('/login');
      })
      .catch(err => {
        toast.error('Somthing is wrong..')
      })
  }

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuToggle);

    return () => document.body.classList.remove('overflow-hidden');
  }, [menuToggle])

  const handleDarkMode = (mode) => {
    setDark(mode);
    setLocalStorage('darkMode', mode);
  }

  const menu = () => {
    return (
      <ul className="items-stretch flex">
        <li className="flex">
          <Link to='/' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Home</Link>
        </li>
        {
          user ?
            <>
              <li className="flex">
                <Link to='/dashboard' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Dashboard</Link>
              </li>
              <li className="flex">
                <button onClick={handleLogout} className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Logout</button>
              </li>
            </>
            :
            <>
              <li className="flex">
                <Link to='/login' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Login</Link>
              </li>
              <li className="flex">
                <Link to='/register' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Register</Link>
              </li>
            </>
        }
      </ul>
    );
  }

  return (
    <>
      <Menu
        width={'200px'}
        isOpen={menuToggle}
        disableOverlayClick
        customBurgerIcon={false}
        onClose={() => setMenuToggle(!menuToggle)}
        disableAutoFocus
      >
        {menu()}
      </Menu>
      <header className="bg-cyan-600 text-white border-b">
        <div className="container flex justify-between mx-auto">
          <Link to='/' className="flex items-center p-2">
            <img src={logo} className='w-40 bg-white px-5 py-2 rounded' alt="" />
          </Link>
          <div className='flex justify-end'>
            <div className='items-stretch hidden space-x-3 md:flex'>
              {menu()}
            </div>
            <div className='flex items-center pl-5'>
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={dark}
                onChange={() => handleDarkMode(!dark)}
              />
              <label htmlFor="checkbox" className="label">
                <FaMoon className="fas fa-moon"></FaMoon>
                <FaSun className='fas fa-sun'></FaSun>
                <div className='ball'></div>
              </label>
            </div>
            <button onClick={() => setMenuToggle(!menuToggle)} className="flex justify-end items-center p-4 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;