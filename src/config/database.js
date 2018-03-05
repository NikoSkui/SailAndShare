/**
 * Load module required
 */
const debug    = require('debug')('database'), // so that the app can use reporting debug
      mongoose = require('mongoose')           // so that imports the Mongoose Db module

module.exports = () => {

    debug('Initialized connection...')

    const uri = 'mongodb://'+ process.env.DB_HOST + '/' + process.env.DB_NAME

    mongoose.connect(uri).then(
        () => { debug('Connected to MongoDB...') },
        (err) => { debug(err)}
    )

}