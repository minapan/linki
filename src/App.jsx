import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import LandingPage from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
import { RouterProvider } from 'react-router-dom'
import UrlProvider from './context'
import RequireAuth from './components/requied-auth'
import NotFoundPage from './pages/404'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/dashboard',
        element: 
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/link/:id',
        element: 
        <RequireAuth>
          <Link />
        </RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />,
      },
      {
        path: '/error/404', 
        element: <NotFoundPage/>,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]
  }
])
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
