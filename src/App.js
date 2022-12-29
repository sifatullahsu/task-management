import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './sass/app.scss';
import { router } from './routes/router';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
