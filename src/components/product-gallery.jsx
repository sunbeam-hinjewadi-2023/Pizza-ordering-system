import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProductList } from '../services/product'
import ProductItem from './productItem'

function ProductGallery() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // get the list of products from server
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const response = await getProductList()
    if (response['status'] === 'success') {
      setProducts(response['data'])
    } else {
      toast.error('Error while calling get /product api')
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Menus</h1>
      <div className='row' style={{ marginTop: 50 }}>
        {products.map((product) => {
          return <ProductItem product={product} />
        })}
      </div>
    </div>
  )
}

export default ProductGallery
