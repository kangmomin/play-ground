const app = require('express').Router()

app.post('/storeAccept_process', (req, res) => {
    let post = req.body

    console.log(`post : ${post}`)
})

module.exports = app