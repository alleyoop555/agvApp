var express = require('express');
var router = express.Router();
const multer = require('multer');

/* Get file list of the folder */
var fileList = require('../api/filelist');
fileList.folder = './uploads/report';

/* GET report page. */
router.get('/', fileList.getList, (req, res)=>{
    res.render('report', {
        list: fileList.list,
    })
});

/* Get report */
var agvReport = require('../api/agvreport');
router.get('/GET/file/:file', (req, res)=> {
    console.log('Report file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    const report = new agvReport(file);
    report.getAll(()=> {res.json(report.figure);})
});

/* Upload file */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, './uploads/report')},
    filename: function (req, file, cb) {cb(null, file.originalname)}
});
const upload = multer({ storage: storage });
router.post('/POST/myfile/', upload.single('myfile'),
    (req, res)=> {
    console.log(req.file);
    res.redirect('/report');
});


/* Delete file */
const fileDelete = require('../api/filedelete');
router.get('/DELETE/file/:file', (req, res, next)=> {
    console.log(req.params);
    console.log('Delete file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    fileDelete.remove(file);
    next();
    },
    (req, res)=> {
        res.redirect('/report');
    });


module.exports = router;
