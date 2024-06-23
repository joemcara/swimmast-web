import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@mantine/core';
import axios from 'axios';
const Base = lazy(() => import("./Base/Base.jsx"));
const Home = lazy(() => import("./Home/Home.jsx"));
const Register = lazy(() => import("./Register/Register.jsx"));
const Course = lazy(() => import("./Courses/Course.jsx"))
const Update = lazy(() => import("./Update/Update.jsx"));
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound.jsx"));
const Logout = lazy(() => import("./Login/Logout.jsx"));
const Login = lazy(() => import("./Login/Login.jsx"))
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Base />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />
        },
        {
          path: "/registrar",
          index: true,
          element: <Register />,
        },
        {
          path: "/actualizar",
          index: true,
          element: <Update />
        },
        {
          path: "/cursos",
          index: true,
          element: <Course />
        },
        {
          path: "*",
          index: true,
          element: <PageNotFound />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/logout",
      element: <Logout />
    }
  ])
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  return (
    <Suspense
      fallback={<Loader />}
    >
      <RouterProvider router={router} />
    </Suspense>


  )
}

export default App
