const app = require('express').Router()

app.post('/selectMode_process', (req, res) => {
    res.cookie('mode', req.body.mode)
    res.writeHead(302, { Location: '/' }).end()
})

module.exports = app