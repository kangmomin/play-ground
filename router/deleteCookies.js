const app = require('express').Router()

app.get('/deleteCookies', (req, res) => {
    res.clearCookie('mode')
    res.writeHead(302, {Location:'/'}).end()
})

module.exports = app