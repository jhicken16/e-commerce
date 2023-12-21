const authRouter = require('./auth')
const productRouter = require('./products')
const userRouter = require('./user')
const cartRouter = require('./cart')

module.exports = (app, passport) => {
    
    authRouter(app, passport)
    productRouter(app)
    userRouter(app)
    cartRouter(app)

}