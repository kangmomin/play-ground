const port = 3005
const express = require('express')
const app = express()
const bp = require('body-parser')
const cp = require('cookie-parser')
const compression = require('compression')
const favicon = require('serve-favicon')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')

const main = require('./router/main')
const selectMode_process = require('./router/selectMode_process')
const deleteCookies = require('./router/deleteCookies')
const getData_process = require('./router/getData_process')
const getDB = require('./router/getDB')

app.use(express.json())
app.use(cp())
app.post('*', bp.urlencoded({ extended: false}))
app.set('views', __dirname + '/public')
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
app.use(compression())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}))
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')))
app.use('*', getDB)

app.get('/', main)
app.get('/deleteCookies', deleteCookies)
app.get('/getData_process/:selected/:mode', getData_process)

app.post('/selectMode_process', selectMode_process)

app.listen(port, () => { console.log(`project play-ground is running on port ${port}`) })