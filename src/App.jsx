import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@mantine/core';
const Base = lazy(() => import("./Base/Base.jsx"));
const Home = lazy(() => import("./Home/Home.jsx"));
const Curso = lazy(() => import("./Cursos/Curso.jsx"))

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Base />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    // Change "element" keys with actual component to navigate like Update, Courses...
    {
      path: "/registrar",
      element: <Base />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: "/actualizar",
      element: <Base />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: "/cursos",
      element: <Base />,
      children: [
        {
          index: true,
          element: <Curso />
        }
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
