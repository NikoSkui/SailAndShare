/**
 * Load modules required
 */
const mongoose = require('mongoose'),
      slug     = require('mongoose-slug-generator'),
      bcrypt   = require('bcryptjs')

mongoose.plugin(slug)

// User Schema
let userSchema = new mongoose.Schema({
    fullname: { type: String, required: true},
    slug:     { type: String, slug:     "fullname" },
    email:    { type: String, required: true},
    password: { type: String},
    avatar:   { type: String},
    picture:  { type: String},
    role:     { type: String, default:  "membre"},
},
{
    timestamps: true
})

let Users = module.exports = mongoose.model('users', userSchema)

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
