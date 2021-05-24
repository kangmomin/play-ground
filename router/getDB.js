const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "PG", port: 3306 })

app.use((req, res, next) => {
    mysqli.query('SELECT * FROM stores', (err, row) => {
        if(err) throw err
        req.store = row
        mysqli.query('SELECT * FROM userinfo', (err, row) => {
            if(err) throw err
            req.userInfo = row
            next()
        })
    })
})

module.exports = app