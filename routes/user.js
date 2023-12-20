const express = require('express')
const router = express.Router()

const UserService = require('../service/UserService')
const UserInteraction = new UserService()

module.exports = (app) => {

    app.use('/user', router)

    //get all users
    router.get('/users', async (request, response, next) => {

        try{
            const users = await UserInteraction.getAllUsers()
            response.status(200).send(users)
        }
        catch(err){
            next(err)
        }
        
    })

    //Get user by id
    router.get('/users/:userId', async (request, response, next) => {

        const { userId } = request.params

        try{
            const user = await UserInteraction.getUser(userId)
            response.status(200).send(user)
        }
        catch(err){
            next(err)
        }
        
    })

    //Update users

}