require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const errorHandler = require('./middleware/errorHandlerMiddleware')
const usersRouter = require('./routers/usersRouter')
const directionsRouter = require('./routers/directionsRouter')
const authRouter = require('./routers/authRouter')

const PORT = process.env.PORT || 5000

const app = express()

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

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