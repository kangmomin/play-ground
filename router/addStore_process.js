const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "PG", port: 3306 })

app.post('/addStore_process', (req, res) => {
    let post = req.body
    let des = space(escaping(post.des)),
        name = space(escaping(post.name)),
        maxPersonnel = space(escaping(post.maxPersonnel)),
        lat = space(escaping(post.lat)),
        lon = space(escaping(post.lon)),
        logo = space(escaping(post.logo))
    if((des === null) || (name === null) || (maxPersonnel === null) || (lat === null) || (lon === null) || (logo === null)) {
        return res.send('null')
    }
    let params = [name, lat, lon, maxPersonnel, des, logo]
    mysqli.query('INSERT INTO stores (name, lat, lon, maxPersonnel, description, logo) VALUES (?, ?, ?, ?, ?, ?)', params, (err, row) => {
        mysqli.end()
        res.send(row)
    })
})

function escaping(key) {
    key.replace("<script", "<'script'")
    key.replace("</script>", "<'/script'>")
    return key
}

function space(key) {
    if(key.replace(/\s/g, '') == '') {
        return null
    }
    return key
}

module.exports = app