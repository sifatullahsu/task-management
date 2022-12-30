import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GitHubSignIn from '../components/GitHubSignIn';
import GoogleSignIn from '../components/GoogleSignIn';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthContextComp';

const LoginPage = () => {
  const { userLogin, userLoading, setUserLoading, getUserJwt } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then(result => {
        getUserJwt(result.user.email)
          .then(data => {
            localStorage.setItem('task-token', data.token);
            toast.success('Login Successful..');
            form.reset();
            navigate(from, { replace: true });
            setUserLoading(false);
          })
      })
      .catch((err) => {
        toast.error(err.message);
        setUserLoading(false);
      })
  }



  if (userLoading) {
    return <Loading isCenter={true} isHeight={true}></Loading>
  }

  return (
    <div className='container py-10'>
      <div className="auth-form w-full max-w-md mx-auto p-8 border space-y-3 bg-zinc-50 text-gray-800">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleForm} className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input type="text" name="email" id="email" placeholder="email" className="w-full px-4 py-3 border-gray-300 bg-white border text-gray-800 focus:border-cyan-600" />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 border-gray-300 bg-white border text-gray-800 focus:border-cyan-600" />
          </div>
          <button type='submit' className="block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">Login</button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <GoogleSignIn from={from}></GoogleSignIn>
          <GitHubSignIn from={from}></GitHubSignIn>
        </div>
        <p className="text-xs text-center sm:px-6 text-gray-600">Don't have an account?
          <Link to='/register' className="underline text-gray-800">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;