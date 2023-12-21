const authRouter = require('./auth')
const productRouter = require('./products')
const userRouter = require('./user')
const cartRouter = require('./cart')
const ordersRouter = require('./orders')

module.exports = (app, passport) => {
    
    authRouter(app, passport)
    productRouter(app)
    userRouter(app)
    cartRouter(app)
    ordersRouter(app)

}