/**
 * Load modules required
 */
const Fixtures = require('node-mongodb-fixtures'), // so that imports a lib for ad fixture with mongoDB
      path     = require('path')

require('dotenv').config()

// The MongoDB Connection URL
const uri = 'mongodb://'+ process.env.DB_HOST + '/' + process.env.DB_NAME;

// The MongoDB options object
const mongoOpts = {};
// const mongoOpts = {
//   ssl: true,
//   sslValidate: true,
//   sslCA: myCert,
// };

const fixtures = new Fixtures({ dir: path.join(__dirname,'fixtures') })
fixtures
    .connect(uri, mongoOpts)
    .unload()
    .catch(e => console.error(e))
    .finally(() => fixtures.disconnect());
