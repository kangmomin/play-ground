const app = require('express').Router()

app.get('/addStore', (req, res) => {
    if(req.session.login !== true) return res.redirect('/login')
    
    res.render('addStore')
})

module.exports = app