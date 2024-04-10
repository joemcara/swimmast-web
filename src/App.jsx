import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@mantine/core';
import Register from './Register/Register.jsx';
const Base = lazy(() => import("./Base/Base.jsx"));
const Home = lazy(() => import("./Home/Home.jsx"));
const Curso = lazy(() => import("./Cursos/Curso.jsx"))
const Update = lazy(() => import("./Update/Update.jsx"));
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound.jsx"));

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
          element: <Curso />
        },
        {
          path: "*",
          index: true,
          element: <PageNotFound />
        },
      ]
    },
  ])
  return (
    <Suspense
      fallback={<Loader />}
    >
      <RouterProvider router={router} />
    </Suspense>


  )
}

export default App
