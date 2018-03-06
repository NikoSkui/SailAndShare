datas = {
    title: 'Hello World !',
    subtitle: 'This is my first page'
}

module.exports = (req,res) => {
    return render(datas)
    function render(datas) {
        res.render('landingPage/index', datas);
    }
}