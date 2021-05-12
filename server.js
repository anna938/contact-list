var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const path = require('path');

app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('photo')

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
        //return res.json({
        //    image: req.file.path
        //});

    })

});

//const router = express.Router();

//// Upload Image
//router.post("/upload", upload.single('photo'), (req, res, next) => {
//    return res.json({
//        image: req.file.path
//    });
//});

//module.exports = router;


app.listen(8000, function () {

    console.log('App running on port 8000');

});