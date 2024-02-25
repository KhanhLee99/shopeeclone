import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import URLs from './constants/url'
import { AppContext } from './contexts/app.context'

import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={URLs.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={URLs.productList} />
}

export default function useRouteElements() {
  let element = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: URLs.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: URLs.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: URLs.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: URLs.productList,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])

  return element
}
