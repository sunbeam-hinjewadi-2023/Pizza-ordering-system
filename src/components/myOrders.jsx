import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getMyOrders as getMyOrdersApi } from '../services/order'
import { getProductList } from '../services/product'
function MyOrders() {
  const [orders, setOrders] = useState([])
  

  const getMyOrders = async () => {
    const response = await getMyOrdersApi()
    if (response['status'] === 'success') {
      setOrders(response['data'])
    } else {
      toast.error(response['error'])
    }
  }

  useEffect(() => {
    getMyOrders()
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>My Orders</h1>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Pizza Name</th>
              <th>Size</th>
              <th>Company</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
              {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.productTitle}</td>
                <td>{order.productDescription}</td>
                <td>{order.company}</td>
                <td>{order.productPrice}</td>
                <td>
                  <img src={`http://172.18.6.20:4000/${order.productImage}`} alt={order.productTitle} width="50" height="50" />
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrders
