const express = require('express')
const router = express.Router()

const ProductServices = require('../service/ProductService')
const ProductInteraction = new ProductServices()

module.exports = (app) => {

    app.use('/products', router)

    //Should add middleware to make sure query is not being abused
    router.get('/', async (request, response, next) => {

        //Really you would want more option to take out of the query and apply to the database such as limit and last product or some way for organizing content.
        const { category } = request.query

        try{
            const products = await ProductInteraction.list(category)
            response.status(200).send(products)
        }
        catch(err){
            next(err)
        }
    })

    router.get('/:productId', async (request, response, next) => {

        const { productId } = request.params
        console.log(productId)
        
        try{
            const product = await ProductInteraction.product(productId)
            response.status(200).send(product)
        }
        catch(err){
            console.log(err)
            next(err)
        }
    })
}