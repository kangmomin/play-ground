const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "PG", port: 3306 })

app.get('*', async (req, res, next) => {
    mysqli.query('SELECT * FROM stores', (err, row) => {
        req.store = row
        mysqli.query('SELECT * FROM userInfo', (err, row) => {
            req.userInfo = row
            next()
        })
    })
})

module.exports = app