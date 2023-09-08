import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCartItems as getCartItemsApi } from '../services/cart'
import { placeOrder as placeOrderApi } from '../services/order'
import CartItem from './cartItem'

function Cart() {
  const [items, setItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const getCartItems = async () => {
    const response = await getCartItemsApi()
    if (response['status'] === 'success') {
      setItems(response['data'])
      let price = 0
      for (const item of response['data']) {
        price += item['quantity'] * item['price']
      }
      setTotalPrice(price)
    } else {
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])

  const placeOrder = async () => {
    const response = await placeOrderApi(totalPrice)
    if (response['status'] === 'success') {
      toast.success('Successfully placed your order')
      getCartItems()
    } else {
      toast.error(response['error'])
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 20 }}>Cart</h1>
      {items.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <h5>
            Sorry!! Your cart is empty at the moment. Please add few products to
            place an order.
          </h5>
          <Link to='/product-gallery'>Browse Menus</Link>
        </div>
      )}

      {items.map((item) => {
        return <CartItem getCartItems={getCartItems} item={item} />
      })}
      {items.length > 0 && (
        <div>
          Subtotal ({items.length} items): ₹{' '}
          <span style={{ marginRight: 20, fontSize: 20, fontWeight: 'bold' }}>
            {totalPrice}
          </span>
          <button onClick={placeOrder} className='btn btn-success'>
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
