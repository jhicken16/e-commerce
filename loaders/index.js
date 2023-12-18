const expressLoader = require('./express')
const routesLoader = require('../routes')

module.exports = (app) => {
    
    //Load in express midlewares
    const expressApp = expressLoader(app)

    //load in routes
    routesLoader(app)

    app.use((err, req, res, next) => {
        const {message, status} = err

        return res.status(status).send({message})
    })

}