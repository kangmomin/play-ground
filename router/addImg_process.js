const app = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'F:/문서/node.js/play-ground/public/img/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetyp = file.mimetype;
        if (
            extension !== '.jpg' &&
            extension !== '.jpeg' &&
            extension !== '.png' &&
            extension !== '.gif' &&
            mimetyp !== 'image/png' &&
            mimetyp !== 'image/jpg' &&
            mimetyp !== 'image/gif' &&
            mimetyp !== 'image/jpeg'
        ) {
            return cb(null, false);
        }
        cb(null, true)
    }
})
app.post('/addImg_process', upload.single('img'), (req, res) => {
    if(req.file === undefined || req.file === null) return res.send('null').end()
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let log = fs.readFileSync('F:/문서/node.js/play-ground/public/log/imgGenerator.txt', 'utf8')
    let date = new Date()
    log += `[${date}] : ${ip} {${req.file.filename}}\n`
    fs.writeFileSync('F:/문서/node.js/play-ground/public/log/imgGenerator.txt', log)
    res.send({ result : req.file.filename}).end()
})

module.exports = app