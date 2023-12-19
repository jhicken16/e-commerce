const authRouter = require('./auth')
const productRouter = require('./products') 

module.exports = (app, passport) => {
    
    authRouter(app, passport)
    productRouter(app)

}