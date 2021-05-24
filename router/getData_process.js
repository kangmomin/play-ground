const app = require('express').Router()

app.get('/getData_process/:selected/:mode', (req, res) => {
    let mode = req.params.mode
    let selected = req.params.selected
    let data = req.store

    let result = {}
    for (_data in data) {
        result[_data] = {
            lat : data[_data].lat,
            lon : data[_data].lon,
            name : data[_data].name,
            maxPersonnel : data[_data].maxPersonnel,
            nowPersonnel : data[_data].nowPersonnel,
            isOpen : data[_data].isOpen,
            desceription : data[_data].description,
            icon : data[_data].icon
        }
    }

    res.send(result)
})

module.exports = app