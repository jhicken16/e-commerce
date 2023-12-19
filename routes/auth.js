const express = require('express')
const router = express.Router()

//temp imports
const db = require('../db/index')
const bcrypt = require('bcrypt')

const AuthService = require('../service/AuthService')
const Authentication = new AuthService

module.exports = (app, passport) => {

    console.log('auth passport', passport)

    app.use('/auth', router)
    
    router.post('/register', async (request, response, next) => {
        //request contains name, email and password
        const data = request.body
        try {
            const res = await Authentication.register(data)
            console.log(res)
            response.status(200).send(res)
        } catch(err){
            next(err)
        }
    })

    router.post('/login', passport.authenticate('local') ,async (request, response, next) => {
        
        const data = request.body
        console.log('login triggered')
        response.status(200).send("login supposedly successful")
    })
    
}