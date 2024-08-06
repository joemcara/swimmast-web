import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loader } from "@mantine/core";
import axios from "axios";
const Base = lazy(() => import("./Base/Base.jsx"));
const Home = lazy(() => import("./Home/Home.jsx"));
const RegisterSwimmer = lazy(() => import("./Register/RegisterSwimmer.jsx"));
const RegisterCourse = lazy(() => import("./Register/RegisterCourse.jsx"));
const Course = lazy(() => import("./Courses/Course.jsx"));
const UpdateSwimmer = lazy(() => import("./Update/UpdateSwimmer.jsx"));
const UpdateCourse = lazy(() => import("./Update/UpdateCourse.jsx"));
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound.jsx"));
const Logout = lazy(() => import("./Login/Logout.jsx"));
const Login = lazy(() => import("./Login/Login.jsx"));
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Base />,
            children: [
                {
                    path: "/",
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/registrar-usuario",
                    index: true,
                    element: <RegisterSwimmer />,
                },
                {
                    path: "/registrar-curso",
                    index: true,
                    element: <RegisterCourse />,
                },
                {
                    path: "/actualizar-usuario",
                    index: true,
                    element: <UpdateSwimmer />,
                },
                {
                    path: "/actualizar-curso",
                    index: true,
                    element: <UpdateCourse />,
                },
                {
                    path: "/cursos",
                    index: true,
                    element: <Course />,
                },
                {
                    path: "*",
                    index: true,
                    element: <PageNotFound />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/logout",
            element: <Logout />,
        },
    ]);
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
