require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = process.env.PORT

const usersRoutes = require('./routes/users.routes')
const authRoutes = require('./routes/auth.routes')
const categoriesRoutes = require('./routes/categories.routes')
const productsRoutes = require('./routes/products.routes')
const searchRoutes = require('./routes/search.routes')
const uploadsRoutes = require('./routes/uploads.routes')

// DB Connection
mongoose.connect(process.env.MONGODB_CNN)

// Middlewares
app.use(cors())
app.use(express.json()) // Lectura y parseo del body
app.use(express.static('public'))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
  })
)

// Routes
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/uploads', uploadsRoutes)

// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
