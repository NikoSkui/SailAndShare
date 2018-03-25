/**
 * Load modules required
 */
const mongoose = require('mongoose'),
      slug     = require('mongoose-slug-generator')

mongoose.plugin(slug)

// Category Schema
let categorySchema = new mongoose.Schema({
    name: String,
    slug: { type: String, slug: "name" }
})

categorySchema .virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'categories'
})

let Categories = module.exports = mongoose.model('categories', categorySchema)
