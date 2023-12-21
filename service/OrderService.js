const httpError = require('http-errors')

const CartModel = require('../models/CartModel')
const Cart = new CartModel()

const OrderModel = require('../models/OrderModel')
const Order = new OrderModel()

module.exports = class OrderService{
    async productsToCart(cart, customerId){
            const response = await Order.addCartItemsToOrderItems(cart, customerId)
            return response
        }

    async makeOrder(customerId, shippingAddress){

        try{
            const response = Order.setUpOrder(customerId, shippingAddress)
            if(!response)
            {
                throw httpError(400, 'order failed')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'internal server error')
        }
    }
}
    
