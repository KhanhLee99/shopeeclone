import { privateRoute } from 'src/hoc'
import MainLayout from 'src/layouts/MainLayout'

function Cart() {
  return <div>Cart</div>
}

export default privateRoute(Cart, MainLayout)
