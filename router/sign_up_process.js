const express = require('express')
const app = express.Router()
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "PG", port: 3306 })

mysqli.connect()

app.post('/sign_up_process', (req, res) => {
    let post = req.body

    if (post.nickName == '' || post.pwd == '') return res.writeHead(302, { Location: '/sign_up' }).end()

    let rows = req.userInfo

    for (i in rows) {
        if (post.nickName == rows[i].name) return res.status(202).send('이미 이름이 존재 합니다!<br><a href = "/sign_up">click here</a> to go login page')
        if (post.email == rows[i].email) return res.status(202).send('이미 메일이 존재 합니다!<br><a href = "/sign_up">click here</a> to go login page')
    }

    let str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let random = ''

    for (var i = 0; i < 5; i++) random += str[Math.ceil(Math.random() * str.length) - 1]
    for (var i = 0; i < 3; i++) random += num[Math.ceil(Math.random() * num.length) - 1]

    let password = crypto.createHash('sha512').update(post.pwd + random).digest('base64')

    let name = post.nickName, age = post.age, sex = post.sex,
        email = post.email, phoneNumber = post.phoneNumber, hometown = post.hometown, certified = ''

    for (let i = 0; i < 30; i++) {
        if(Math.ceil(Math.random() * 2) - 1) {
            certified += num[Math.ceil(Math.random() * num.length) - 1]
        } else {
            certified += str[Math.ceil(Math.random() * str.length) - 1]
        }
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'momin108902@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'uthopgkglwccyxky'          // gmail 계정의 비밀번호를 입력
        }
    })

    let mailOptions = {
        from: 'momin108902@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email,                     // 수신 메일 주소
        subject: '[Play-Ground] 본인 인증 메일',   // 제목
        text: `thanks for use "Play-Ground"! \n click : http://koldin.myddns.me:3005/checkKey/${certified}`  // 내용
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        }
        else {
            console.log('Email sent: ' + info.response)
        }
    })

    let params = [name, password, random, age, sex, email, phoneNumber, hometown, certified]

    mysqli.query(`INSERT INTO userinfo (name, password, random, age, sex, email, phoneNumber, hometown, checkKey) 
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, params, (err, row) => {
        if (err) throw err
        mysqli.end()
        res.redirect(`/login`)
    })
})

module.exports = app