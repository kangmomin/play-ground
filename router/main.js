const app = require('express').Router()

app.get('/', (req, res) => {
    let mode = req.cookies.mode
    if(mode === undefined) return res.render('selectMode')
    if(mode === 'light mode') return res.render('home')
    if(mode === 'default mode') return res.render('home')
    res.send('error')
})

module.exports = app