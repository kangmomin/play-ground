const app = require('express').Router()
const crypto = require('crypto')

app.post('/login_process', (req, res) => {
    let post = req.body
    let userInfo = req.userInfo
    if(post.username.replace(/\s/g, '') == '' || post.pass.replace(/\s/g, '') =='') return res.writeHead(302, {Location: '/login'}).end()
    for(row of userInfo) {
        if(row == null) return res.status(200).send('DB connect error <a href="/login">로그인창으로 돌아가기</a>')
        if(row.name === post.username) {
            let pwd = crypto.createHash('sha512').update((post.pass + row.random)).digest('base64')
            let id = row.id
            if(row.password != pwd) return res.status(200).send('비밀번호가 틀렸습니다. <a href="/login">로그인창으로 돌아가기</a>')
            req.session.login = true
            req.session.username = post.username
            req.session.userId = id
            return res.writeHead(302, { Location: `/` }).end()
        }
    }
    res.send('아이디가 틀렸습니다. <a href="/login">로그인창으로 돌아가기</a>')
})

module.exports = app