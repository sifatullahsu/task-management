import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';
import logo from '../assets/logo.png';

const Header = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout()
      .then(result => {
        toast.success('Logout successfull..');
        navigate('/login');
      })
      .catch(err => {
        toast.error('Somthing is wrong..')
        console.log(err);
      })
  }

  return (
    <>
      <header className="bg-cyan-600 text-white border-b">
        <div className="container flex justify-between mx-auto">
          <Link to='/' className="flex items-center p-2">
            <img src={logo} className='w-40 bg-white px-5 py-2 rounded' alt="" />
          </Link>
          <ul className="items-stretch hidden space-x-3 md:flex">
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
          <button className="flex justify-end items-center p-4 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;