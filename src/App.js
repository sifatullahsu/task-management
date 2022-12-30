import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './sass/app.scss';
import { router } from './routes/router';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContextComp';

function App() {
  const { dark } = useContext(AuthContext);

  return (
    <div className={dark ? 'theme-dark' : 'theme-light'}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
