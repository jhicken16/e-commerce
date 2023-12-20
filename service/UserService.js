const httpError  = require('http-errors')

const CustomersModel = require('../models/CustomersModel')
const Customer = new CustomersModel()

module.exports = class UserServes {

    async getUser(id){
        
        try{
            const response = await Customer.customerById(id)
            if(!response){
                throw httpError(404, 'Recourse not found')
            }
            return response
        }
        catch(err){
            if (err.status){
                throw err
            }
            throw httpError(500, 'Internal server error')
        }
    }

    async getAllUsers() {

        try{
            const response = await Customer.allUsers()
            if(!response){
                throw httpError(404, 'Recourse not found')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            httpError(500, 'Internal server error')
        }
    }
}