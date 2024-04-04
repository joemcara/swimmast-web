import { Suspense, lazy } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@mantine/core';
const Home = lazy(() => import("./Home/Home.jsx"));
const Update = lazy(() => import("./Update/Update.jsx"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Update/> ,//<Base/>
      children: [
        {
          index: true,
          element: <Update />
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
