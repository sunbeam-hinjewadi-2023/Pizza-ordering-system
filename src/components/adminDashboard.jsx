import { useState, useEffect } from 'react'
//import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProduct as addProductApi } from '../services/admin'
import {updateProduct as updateProductApi} from '../services/admin'
import {deleteProduct as deleteProductApi} from '../services/admin'


import { getProductList } from '../services/product'
// import ProductItem from './productItem'

function Admin() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [company, setCompany] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState([]);

    //const navigate = useNavigate()
    // const addProduct = async () => {
    //     const response = await addProductApi(
    //         title,
    //         description,
    //         company,
    //         price,
    //         image
    //       )

    //       // parse the response
    //     if (response['status'] === 'success') {
    //         toast.success('Successfully added the pizza')
    //         //navigate('/product-gallery')
    //     } else {
    //         toast.error('please try again')
    //     }
    // }

    useEffect(() => {
      loadProducts(); // Fetch products from API and update state
    }, []);
    
    const loadProducts = async () => {
      try {
        const response = await getProductList();
        if (response.status === 'success') {
          setProducts(response.data); // Update products state
        } else {
          toast.error('Error while calling get /product api');
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    const updateProduct = async (productId) => { 
      console.log(productId)
      setSelectedProduct(productId);
      setTitle(productId.title);
      setDescription(productId.description);
      setCompany(productId.company);
      setPrice(productId.price);

      if (!selectedProduct) {
        console.error('No product selected for update');
        return;
      }
    
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('company', company);
      formData.append('price', price);
      formData.append('image', image);
    
      try {
        const response = await updateProductApi(selectedProduct.id, formData);
        setTitle('');
        setDescription('');
        setCompany('');
        setPrice('');
        setImage(null);
        if (response.status === 'success') {
          toast.success('Successfully updated the product');
          setSelectedProduct(null); // Clear selected product
          loadProducts(); // Refresh the product list after successful update
        } else {
          toast.error('Please try again');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };

    const deleteProduct = async (products) => {
      console.log("delete"+products)
      try {
        const response = await deleteProductApi(products); // Call your API to delete the product
        
        if (response.status === 'success') {
          toast.success('Product deleted successfully');
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }


    const addProduct = async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('company', company);
      formData.append('price', price);
      formData.append('image', image); // Assuming 'image' is the selected file
    
      try {
        const response = await addProductApi(formData);
    
        if (response.status === 'success') {
          toast.success('Successfully added the product');
        } else {
          toast.error('Please try again');
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
    

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Admin Dashboard</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Pizza Name</label>
              <input
                type='text'
                className='form-control'
                value={selectedProduct ? selectedProduct.title : ''}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Size</label>
              <input
                type='text'
                className='form-control'
                value={selectedProduct ? selectedProduct.description : ''}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Company Name</label>
              <input
                type='text'
                className='form-control'
                value={selectedProduct ? selectedProduct.company : ''}
                onChange={(e) => {
                  setCompany(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Price</label>
              <input
                type='text'
                className='form-control'
                value={selectedProduct ? selectedProduct.price : ''}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Image</label>
              <input
                type='file'
                name='image'
                className='form-control'
                onChange={(e) => {
                  setImage(e.target.files[0])
                }}filename
              />
            </div>
              
            <div className='mb-3'>
              <button onClick={addProduct} className='btn btn-success'>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Pizza Name</th>
              <th>Size</th>
              <th>Company</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.company}</td>
                <td>{product.price}</td>
                <td>
                  <img src={`http://172.18.6.20:4000/${product.image}`} alt={product.title} width="50" height="50" />
                </td>
                <td>
                  <div className="mb-3">
                    <button onClick={() => updateProduct(product.id)} className="btn btn-success">
                      Update
                    </button>
                  </div>
                  <div className="mb-3">
                    <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

    </div>
  )

}

export default Admin