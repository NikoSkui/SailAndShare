/**
 * Load modules required
 */
const mongoose = require('mongoose')

// Category Schema
let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

categorySchema .virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'categories'
})

let Categories = module.exports = mongoose.model('categories', categorySchema)
