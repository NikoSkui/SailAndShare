/**
 * Load modules required
 */
const slug = require('slug')
/**
 * Load models required
 */
const Article  = require('../models/articleModel.js'),
      Category = require('../models/categoryModel.js')
/**
 * Defined dev mode
 */
let dev = process.env.NODE_ENV === 'development'

module.exports = {


    // Read all articles
    index: (req,res) => {
        // Find all Articles
        Article.find({}).select('title slug picture').exec((err, articles) => {
            if (err && !dev) throw err
            res.render('blog/index', {articles:articles})
        })
    },
    // Read one article
    show: (req,res) => {
        // Find all Articles
        Article.findById(req.params.id).populate('categories').exec((err, article) => {
            if (err && dev) res.status(500).send(err).end()
            if (err && !dev) throw err
            res.json(article)
        })
    }

}

// function render(datas) {
//     res.render('blog/index', {
//         articles:datas
//     });
// }