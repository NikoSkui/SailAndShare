/**
 * Load modules required
 */
const slug    = require('slug'),
      path    = require('path'),
      fs      = require('fs'),
      imgProc = require(path.resolve('./src/config/imgProcessor'))  // for manipulate file uploaded

/*
 * Load models required
 */
const Articles   = require('../models/articleModel'),
      Categories = require('../models/categoryModel')
/**
 * Defined dev mode
 */
let dev = process.env.NODE_ENV === 'development'

module.exports = {

    // Read all articles
    index: (req,res) => {
        // Find all Articles
        Articles.find({}).select('title excerpt picture access status').exec((err, articles) => {
            if (err && dev) res.status(500).send(err).end()
            if (err && !dev) throw err
            res.render('admin/blog/index', {articles:articles})
        })
    },

    // Read one article
    show: (req,res) => {
        // Find all Categories
        Categories.find({}).exec()
        .then(categories => {
            // Find all Articles
            return Articles.findById(req.params.id).exec()
            .then(article => {
                res.render('admin/blog/edit', {article,categories})
            })
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },

    // Create one article
    create: (req,res) => {
        new Articles({}).save()
        .then(article => {
            console.log(article)
            res.redirect('/admin/blog/' + article._id)
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },

    // Update one article
    edit: (req,res) => {
        // Find all Articles
        Articles.findById(req.params.id).exec()
        .then(article => {

            console.log(req.body.status)

            article.title      = req.body.title
            article.excerpt    = req.body.excerpt
            article.content    = req.body.content
            article.access     = req.body.access
            article.status     = req.body.status
            article.categories = req.body.categories
            if (req.file) {
                imgProc.convertImg(req.file)
                if(article.picture) {
                    fs.unlinkSync(path.resolve('./public/images/blog/thumb/' + article.picture))
                    fs.unlinkSync(path.resolve('./public/images/blog/big/' + article.picture))
                }
                article.picture = req.file.filename
            }

            return article.save()
        })
        .then(article => {
            res.redirect('/admin/blog')
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },

    // Delete one article
    delete: (req,res) => {
        Articles.findByIdAndRemove(req.params.id).exec()
        .then((article) => {
            if(article.picture) {
                fs.unlinkSync(path.resolve('./public/images/blog/thumb/' + article.picture))
                fs.unlinkSync(path.resolve('./public/images/blog/big/' + article.picture))
            }
            res.redirect('/admin/blog')
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    }

}
