import { protectedRoute } from 'src/hoc'
import MainLayout from 'src/layouts/MainLayout'

function Cart() {
  return <div>Cart</div>
}

export default protectedRoute(Cart, MainLayout)
