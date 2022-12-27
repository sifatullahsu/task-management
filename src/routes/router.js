import AddTask from "../pages/AddTask";
import CompletedTasks from "../pages/CompletedTasks";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyTasks from "../pages/MyTasks";
import RegisterPage from "../pages/RegisterPage";
import MainTemp from "../templates/MainTemp";

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
        path: 'add-task',
        element: <AddTask></AddTask>
      },
      {
        path: 'my-tasks',
        element: <MyTasks></MyTasks>
      },
      {
        path: 'completed-tasks',
        element: <CompletedTasks></CompletedTasks>
      },
      {
        path: '/*',
        element: <ErrorPage></ErrorPage>
      }
    ]
  }
]);