import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}

export default memo(MainLayout)
