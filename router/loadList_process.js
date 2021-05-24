const app = require('express')()

app.get('/loadList_process', (req, res) => {
    let storeInfo = req.store
    let latList = new Array(), nameList = new Array()
    let lonList = new Array(), result = new Array()

    for (store of storeInfo) {
        nameList.push(store.name)
        latList.push(store.lat)
        lonList.push(store.lon)
    }
    result.push(nameList, latList, lonList)
    console.log(result)
    res.send(result)
})

module.exports = app