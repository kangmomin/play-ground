const app = require('express').Router()

app.get('/', (req, res) => {
    let mode = req.cookies.mode
    let login = req.session.login || false
    let userInfo = req.userInfo
    let store = req.store
    if(login) {
        for (row of userInfo) {
            if(row.id === req.session.userId) {
                if(row.checked === 0) return res.send(`
                이메일 인증을 진행해 주십시오.
                <a href='/logout'>로그아웃</a>
                `)
            }
        }
    }
    if(mode === undefined) return res.render('selectMode')
    if(mode === 'light mode') return res.render('home', {
        login: login,
        store: store
    })
    if(mode === 'default mode') return res.render('home', {
        login: login,
        store: store
    })
    res.send('error').end()
})

module.exports = app