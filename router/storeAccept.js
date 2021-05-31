const app = require('express').Router()

app.get('/storeAccept', (req, res) => {
    if(!req.session.login) return res.writeHead(302, {Location: '/'}).end()
    let userId = req.session.userId,
        stores = req.store,
        unacceptedStore = new Array()
    
    for (store of stores) {
        if (!store.waitingState) {
            unacceptedStore.push(store)
        }
    }
    res.render('storeAccpet', {
        userId: userId,
        stores: unacceptedStore
    })
    
})

module.exports = app