const expressLoader = require('./express')
const routesLoader = require('../routes')
const passportLoader = require('./passport')

module.exports = (app) => {
    
    //Load in express midlewares
    const expressApp = expressLoader(app)

    const passport = passportLoader(expressApp)

    //load in routes
    routesLoader(app, passport)

    app.use((err, req, res, next) => {
        const {message, status} = err
        return res.status(status).send({message})
    })

}