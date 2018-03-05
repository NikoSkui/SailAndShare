/**
 * Load module required
 */
const debug  = require('debug')('router') // so that the app can use reporting debug

module.exports = (app) => {

    debug('Setting up routes...')

    app.get('/', (req,res) => {
        res.render('index', {
            title: 'Hello World !',
            subtitle: 'This is my first page'
        })
    })

}