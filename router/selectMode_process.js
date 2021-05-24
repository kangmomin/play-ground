const app = require('express').Router()

app.post('/selectMode_process', (req, res) => {
    res.cookie('mode', req.body.mode)
    res.redirect('/')
})

module.exports = app