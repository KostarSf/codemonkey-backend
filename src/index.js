require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const errorHandler = require('./middleware/errorHandlerMiddleware')
const usersRouter = require('./routers/usersRouter')
const directionsRouter = require('./routers/directionsRouter')
const authRouter = require('./routers/authRouter')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/directions', directionsRouter)
app.use(express.static(__dirname + '/public'));
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()