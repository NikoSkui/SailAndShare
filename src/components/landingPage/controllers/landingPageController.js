/*
 * Load models required
 */
const Articles   = require('../../blog/models/articleModel')

module.exports = (req,res) => {
    // Find all Articles
    Articles
    .find({})
    .where('status').equals('true')
    .or([
        {'access':null}
    ])
    .sort('-_id')
    .limit(3)
    .exec((err, articles) => {
        if (err && dev) res.status(500).send(err).end()
        if (err && !dev) throw err
        res.render('landingPage/index', {articles:articles})
    })
}