import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

type Props = {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
