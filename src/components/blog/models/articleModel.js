/**
 * Load modules required
 */
const mongoose = require('mongoose'),
      slug     = require('mongoose-slug-generator')

mongoose.plugin(slug)

// Article Schema
let articleSchema = new mongoose.Schema({
    title:   String,
    slug: { type: String, slug: "title" },
    excerpt: String,
    content: String,
    status:  Boolean,
    access:  Number,
    picture: String,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'
        }
    ]
})

let Articles = module.exports = mongoose.model('articles', articleSchema)
