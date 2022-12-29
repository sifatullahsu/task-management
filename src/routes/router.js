import AddTask from "../pages/AddTask";
import CompletedTasks from "../pages/CompletedTasks";
import DashPage from "../pages/DashPage";
import EditTask from "../pages/EditTask";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyTasks from "../pages/MyTasks";
import RegisterPage from "../pages/RegisterPage";
import DashTemp from "../templates/DashTemp";
import MainTemp from "../templates/MainTemp";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTemp></MainTemp>,
    children: [
      {
        path: '',
        element: <HomePage></HomePage>
      },
      {
        path: 'login',
        element: <LoginPage></LoginPage>
      },
      {
        path: 'register',
        element: <RegisterPage></RegisterPage>
      },
      {
        path: '/*',
        element: <ErrorPage></ErrorPage>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashTemp></DashTemp>,
    children: [
      {
        path: '',
        element: <PrivateRoute><DashPage></DashPage></PrivateRoute>
      },
      {
        path: 'add-task',
        element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
      },
      {
        path: 'my-tasks',
        element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>
      },
      {
        path: 'my-tasks/:id',
        element: <PrivateRoute><EditTask></EditTask></PrivateRoute>,
        loader: ({ params }) => params.id
      },
      {
        path: 'completed-tasks',
        element: <PrivateRoute><CompletedTasks></CompletedTasks></PrivateRoute>
      }
    ]
  }
]);