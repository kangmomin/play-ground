const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "PG", port: 3306 })

mysqli.connect()

app.get('/checkKey/:key', async (req, res) => {
    let key = req.params.key, userInfo = req.userInfo

    for (row of userInfo) {
        if(row.checkKey === key) {
            await wait(row, res)
            return res.writeHead(302, {Location:'/'}).end()
        }
    }
    res.send('존재 하지 않는 키 값입니다.').end()
})

async function wait (row, res) {
    let str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let certified = ''
    for (let i = 0; i < 30; i++) {
        if(Math.ceil(Math.random() * 2) - 1) {
            let random = Math.ceil(Math.random() * num.length) - 1
            certified += num[random]
        } else {
            let random = Math.ceil(Math.random() * str.length) - 1
            certified += str[random]
        }
    }
    mysqli.query(`UPDATE userinfo SET checked=1, checkKey="${certified}" WHERE id=${row.id}`, (err, row) => {
        if (err) throw err   
        mysqli.end()
        return true
    })
}

module.exports = app