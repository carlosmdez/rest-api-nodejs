require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT

const usersRoutes = require('./routes/users.routes')

// Middlewares
app.use(cors())
app.use(express.json()) // Lectura y parseo del body
app.use(express.static('public'))

// Routes
app.use('/api/users', usersRoutes)

// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
