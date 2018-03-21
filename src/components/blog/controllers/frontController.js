/**
 * Load modules required
 */
// const slug = require('slug')
/**
 * Load models required
 */
const Articles  = require('../models/articleModel.js'),
      Categories = require('../models/categoryModel.js')
/**
 * Defined dev mode
 */
let dev = process.env.NODE_ENV === 'development'

module.exports = {


    // Read all articles
    index: (req,res) => {
        // Find all Categories
        Categories.find({}).exec()
        .then(categories => {
            let access = res.locals.user?1:0
            // Find all Articles
            return Articles
             .find({})
             .where('status').equals('true')
             .or([
                 {'access':null},
                 {'access':{$lte: access}}
             ])
             .populate('categories','-_id slug')
             .sort('-_id')
             .exec()
            .then(articles => {
                articles.forEach(article => {
                    article.categoriesClass = []
                    if(article.categories)
                    article.categories.forEach(category => {
                        article.categoriesClass.push(category.slug)
                    })
                    if (article.access > 0) {
                        article.categoriesClass.push('membre')
                    }
                })
                res.render('blog/index', {articles, categories})
            })
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    // Read one article
    show: (req,res) => {
        // Find all Articles
        Articles.findById(req.params.id).populate('categories').exec((err, article) => {
            if (err && dev) res.status(500).send(err).end()
            if (err && !dev) throw err
            res.json(article)
        })
    }

}
