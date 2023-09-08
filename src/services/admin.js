import axios from 'axios'
import { createUrl, log } from '../utils/utils'

// export async function addProduct(
//   title,
//   description,
//   company,
//   price,
//   image
// ) {
//       const url = createUrl('/admin/')
      
//         // get the current user's token from session storage
//         const { token } = sessionStorage
//         console.log(token);

//         // create a header to send the token
//         const header = {
//           headers: {
//             token,
//           } }

//          // 
//   const body = {
//     title,
//     description,
//     company,
//     price,
//     image,
//   }
//   try{
//     console.log(body)
//     const response = await axios.post(url, body,header)
//     log(response.data)
//     return response.data
//   } catch (ex) {
//     log(ex)
//     return null
//   }
// }


export async function addProduct(formData) {
  const url = createUrl('/admin');

  try {

    // get the current user's token from session storage
    const { token } = sessionStorage
    console.log(token);

    const response = await axios.post(url, formData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function updateProduct(formData) {
  const url = createUrl('/admin');

  try {

    // get the current user's token from session storage
    const { token } = sessionStorage
    console.log(token);

    const response = await axios.put(url, formData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function deleteProduct(productId) {
  console.log("adminjs"+productId)
  const url = createUrl(`/admin/${productId}`); // Make sure to provide the correct endpoint for deleting a specific product
  console.log(productId)
  try {
    // Get the current user's token from session storage
    const token = sessionStorage.getItem('token');

    const response = await axios.delete(url, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });

    // Check the response status and return appropriate data
    if (response.status === 200) {
      return { status: 'success', message: 'Product deleted successfully' };
    } else {
      return { status: 'error', message: 'Failed to delete product' };
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return { status: 'error', message: 'An error occurred while deleting the product' };
  }
}