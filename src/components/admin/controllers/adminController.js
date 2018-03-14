/**
 * Defined dev mode
 */
let dev = process.env.NODE_ENV === 'development'

module.exports = {

    // Admin home
    index: (req,res) => {
        let options = {
            "page":"dashboard"
        }
        res.render('admin/index',{options:options})
    },
}
