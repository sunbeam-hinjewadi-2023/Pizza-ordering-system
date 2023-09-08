const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

const app = express()

// used for logging on the console
app.use(morgan('combined'))
app.use(express.json())
app.use(cors('*'))
app.use(express.static('uploads'))

// express middleware to check if user exists
app.use((request, response, next) => {
  if( request.url === '/user/register' || request.url === '/user/login') 
    next()
  else {
    // get the token from request header
    const token = request.headers['token']
    console.log(`token = ${token}`)

    if (token === null) {
      response.send(utils.createResult('missing token'))
      return
    }

    try {
      // decode the token and get the payload
      const payload = jwt.decode(token, config.secret)

      // add the info to the request so that every api can use the payload
      request.payload = payload

      next()
    } catch (ex) {
      response.send('wrong token')
    }
  }
})

// add the routers
const routerUser = require('./routes/user')
const routerProduct = require('./routes/product')
const routerOrder = require('./routes/orders')
const routerCart = require('./routes/cart')
const routerAdminDashboard = require('./routes/admin')

app.use('/user', routerUser)
app.use('/product', routerProduct)
app.use('/order', routerOrder)
app.use('/cart', routerCart)
app.use('/admin', routerAdminDashboard)

app.listen(4000, '0.0.0.0', () => {
  console.log('Server started at port 4000')
})
