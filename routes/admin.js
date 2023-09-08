const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('../utils')

// for uploading file(s)
const multer = require('multer')
const upload = multer({ dest: 'uploads' })

// image in the single method is the key client has to use
// when uploading a file
// router.post('/', upload.single('image'), (request, response) => {
//   const { title, description, price, company } = request.body

//   // request has a property named file which gives details of uploaded file
//   // console.log(request.file)
//   const filename = request.file.filename

//   db.query(
//     `insert into product (title, description, price, company, image) values (?, ?, ?, ?, ?)`,
//     [title, description, price, company, filename],
//     (error, result) => {
//       response.send(utils.createResult(error, result))
//     }
//   )
// })

router.post('/', upload.single('image'), (request, response) => {
  const { title, description, company, price } = request.body

  // request has a property named file which gives details of uploaded file
     console.log(request.file)
     const filename = request.file.filename
     console.log(filename)
  db.query(
    `insert into product (title, description, company, price, image) values (?, ?, ?, ?, ?)`,
    [title, description, company, price, filename],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.delete('/:productId', (request, response) => {
  const productId = request.params.productId;
  console.log(productId)
  db.query(
    `DELETE FROM product WHERE id = ?`,
    [productId],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: 'Error deleting product' });
      } else {
        if (result.affectedRows === 0) {
          response.status(404).json({ error: 'Product not found' });
        } else {
          response.status(200).json({ message: 'Product deleted successfully' });
        }
      }
    }
  );
});

router.put('/:productId', (request, response) => {
  const productId = request.params.productId;
  console.log(productId)
  const { title, description, price, company } = request.body;
  //const filename = request.file.filename;

  db.query(
    `UPDATE product SET title = ?, description = ?, price = ?, company = ?, image = ? WHERE id = ?`,
    [title, description, price, company, productId],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.get('/', (request, response) => {
  const statement = `SELECT id, title, description, company, price, image FROM product`
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get('/:id', (request, response) => {
  const id = request.params.id
  const statement = `SELECT * FROM product WHERE id=?`
  db.query(statement, [id], (error, products) => {
    if (products.length === 0) {
      response.send(utils.createResult('no products'))
    } else {
      response.send(utils.createResult(error, products[0]))
    }
  })
})

module.exports = router
