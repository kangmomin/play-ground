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
const addStore = require('./router/addStore')
const addImg_process = require('./router/addImg_process')
const addStore_process = require('./router/addStore_process')
const login_process = require('./router/login_process')
const sign_up_process = require('./router/sign_up_process')
const logout = require('./router/logout')
const checkKey_process = require('./router/checkKey_process')
const getResetKey = require('./router/getResetKey')
const loadList_process = require('./router/loadList_process')
const storeAccept = require('./router/storeAccept')
const storeAccept_process = require('./router/storeAccept_process')

const oneDayTime = 1000 * 60 * 60 * 24 * 30

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
    store: new FileStore(),
    cookie: {
        maxAge: oneDayTime
    }
}))
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')))
app.use(getDB)

app.get('/', main)
app.get('/deleteCookies', deleteCookies)
app.get('/getData_process/:selected/:mode', getData_process)
app.get('/addStore', addStore)
app.get('/login', (req, res) => {res.render('login')})
app.get('/sign_up', (req, res) => {res.render('sign_up')})
app.get('/about', (req, res) => {res.render('blog/about.ejs')})
app.get('/logout', logout)
app.get('/checkKey/:key', checkKey_process)
app.get('/getResetKey/:id', getResetKey)
app.get('/loadList_process', loadList_process)
app.get('/storeAccept', storeAccept)

app.post('/login_process', login_process)
app.post('/sign_up_process', sign_up_process)
app.post('/addStore_process', addStore_process)
app.post('/addImg_process', addImg_process)
app.post('/selectMode_process', selectMode_process)
app.post('/storeAccept_process', storeAccept_process)

app.listen(port, () => { console.log(`project play-ground is running on port ${port}`) })