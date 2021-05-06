const app = require('express').Router()

app.get('/getData_process/:selected/:mode', (req, res) => {
    let mode = req.params.mode
    let selected = req.params.selected
    let data = req.store

    let lat = new Array(), lon = new Array(), name = new Array(), maxPersonnel = new Array(),
            nowPersonnel = new Array(), isOpen = new Array(), description = new Array(), icon = new Array()
    let result
    for (_data in data) {
        lat.push(data[_data].lat)
        lon.push(data[_data].lon)
        name.push(data[_data].name)
        maxPersonnel.push(data[_data].maxPersonnel)
        nowPersonnel.push(data[_data].nowPersonnel)
        isOpen.push(data[_data].isOpen)
        description.push(data[_data].description)
        icon.push(data[_data].icon)
    }

    result = {
        lat: lat,
        lon: lon,
        name: name,
        maxPersonnel: maxPersonnel,
        nowPersonnel: nowPersonnel,
        isOpen: isOpen,
        description: description,
        icon: icon
    }

    res.send(result)
})

module.exports = app