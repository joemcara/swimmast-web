import { Suspense, lazy } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@mantine/core';
const Home = lazy(() => import("./Home/Home.jsx"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, //<Base/>,
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
