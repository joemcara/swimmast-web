import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@mantine/core';
import Register from './Register/Register.jsx';
const Base = lazy(() => import("./Base/Base.jsx"));
const Home = lazy(() => import("./Home/Home.jsx"));
const Update = lazy(() => import("./Update/Update.jsx"));

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
          element: <Register />
        }
      ]
    },
    {
      path: "/actualizar",
      element: <Base />,
      children: [
        {
          index: true,
          element: <Update />
        }
      ]
    },
    {
      path: "/cursos",
      element: <Base />,
      children: [
        {
          index: true,
          element: <Home />
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
