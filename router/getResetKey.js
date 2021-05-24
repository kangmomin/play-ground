const app = require('express').Router()
const nodemailer = require('nodemailer')

app.get('/getResetKey/:id', (req, res) => {
    let userInfo = req.userInfo, 
        userId = req.params.id,
        certified = ''

    userInfo = user(userId, userInfo)
    if(userInfo === undefined) return res.send(false)
    certified = userInfo.checkKey

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'momin108902@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'uthopgkglwccyxky'          // gmail 계정의 비밀번호를 입력
        }
    })

    let mailOptions = {
        from: 'momin108902@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: userInfo.email,                     // 수신 메일 주소
        subject: '[Play-Ground] 본인 인증 메일',   // 제목
        text: `thanks for use "Play-Ground"! \n here is your reset key \n click : http://koldin.myddns.me:3005/resetPwd/${certified}`  // 내용
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.send(false)
        }
        else {
            console.log('Email sent: ' + info.response)
            res.send(true)
        }
    })
})

function user(userId, userInfo) {
    for (row of userInfo) {
        if(row.name == userId) {
            return row
        }
    }
    return undefined
}

module.exports = app