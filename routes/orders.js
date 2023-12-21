const express = require('express')
const router = express.Router()

const OrderService = require('../service/OrderService')
const Orders = new OrderService()

module.exports = (app) => {
    app.use('/orders', router)

    router.get('', async (request, response, next) => {

        try{
            const orderTable = await Orders.getOrders()
            
            response.status(200).send(orderTable)
        }
        catch(err){
            next(err)
        }
        
    })

    router.get('/:userId', async (request, response, next) => {

        const { userId } = request.params

        try{
            const usersOrders = await Orders.ordersById(userId)
            response.status(200).send(usersOrders)
        }
        catch(err){
            next(err)
        }
    })
}