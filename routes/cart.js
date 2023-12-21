const express = require('express')
const router = express.Router()

const CartService = require('../service/CartService')
const Cart = new CartService()

//temporarily import orderservice
const OrderService = require('../service/OrderService')
const Order = new OrderService()

module.exports = (app) => {
    app.use('/cart', router)

    router.get('/:userId', async (request, response, next) => {
        console.log('cart called')
        const { userId } = request.params

        try{
            const usersCart = await Cart.usersCart(userId)
            response.status(200).send(usersCart)
        }
        catch(err) {
            next(err)
        }
        
    })

    router.put('/:userId', (request, response, next) => {

        //should be logged in for this getting id from sessions object

        const { userId } = request.params
        const { productId, quantity } = request.body

        try{
            const productAdded = Cart.productToCart(userId, productId, quantity)
             response.status(200).send(productAdded)
        }
        catch(err){
            next(err)
        }
       
    })

    router.post('/checkout', async (request, response, next) => {

        const { userId } = request.body
        const { order_info } = request.body
        console.log(order_info)

        try{

            const cart = await Cart.usersCart(userId)

            //set up order
            const order = await Order.makeOrder(userId, order_info.shipping)
            console.log(order)

            const addProductToOrderItems = await Order.productsToCart(cart, order.id)

            response.status(420).send(addProductToOrderItems)
        }
        catch(err){
            console.log(err)
            next(err)
        }

    })
}