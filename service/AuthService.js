const httpError = require('http-errors')
const db = require('../db/index')
const bcrypt = require('bcrypt')

const CustomerModel = require('../models/CustomersModel')

const Customer = new CustomerModel()

module.exports = class AuthService {

    async register(data) {
        
        //check if user already exists.
        const { email } = data

        try{
            const doesEmailExist = await Customer.findByEmail(email)

            if(doesEmailExist){
                throw httpError(409, 'Email already in use.')
            }

            //user doesn't exist create new user.
            return await Customer.createCustomer(data)
        }
        catch(err){
            throw httpError(500, err)
        }
        
    }
}