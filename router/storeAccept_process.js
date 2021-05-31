const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "PG", port: 3306 })

app.post('/storeAccept_process', async (req, res) => {
    if(!req.session.login) return res.send(false)
    let post = req.body,
        userInfos = req.userInfo
        stores = req.store,
        userId = req.session.userId,
        storeId = post.storeId

    let checked = await checkingUser(userInfos, stores)
    if (!checked) return res.send(false)
   
    mysqli.query(`UPDATE stores SET waitingState = 1 WHERE id = ${storeId}`, (err, row) => {
        if(err) return res.send('update err')
        res.send(true)
    })
})
    
async function checkingUser(userInfos, stores) {
    for (userInfo of userInfos) {
        if(userId === userInfo.id) {
            if(!userInfo.admin) return false
            return true
        }
    }    
}

module.exports = app