import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AppContext } from './contexts/app.context'

type Props = {
  children?: React.ReactNode
}

export const privateRoute = (WrappedComponent: () => JSX.Element, Layout: ({ children }: Props) => JSX.Element) => {
  const newComponent = () => {
    const { isAuthenticated } = useContext(AppContext)

    return isAuthenticated ? (
      <Layout>
        <WrappedComponent />
      </Layout>
    ) : (
      <Navigate to='/login' />
    )
  }

  return newComponent
}
