const app = require('express').Router()

app.get('/deleteCookies', (req, res) => {
    res.clearCookie('mode')
    res.redirect('/')
})

module.exports = app