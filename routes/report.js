const express = require('express');
const router = express.Router();
const multer = require('multer');

/* GET report page. */
const fileList = require('../api/filelist');
const folder = './uploads/report';
router.get('/', (req, res)=>{
    let list = fileList.getList(folder);
    res.render('report', {list: list})
});

/* Get file list */
router.get('/api/filelist', (req, res)=>{
    console.log('----------');
    console.log('Get file list');
    let list = fileList.getList(folder);
    res.json({list: list})
});

/* Report file */
const agvReport = require('../api/agvreport');
router.get('/api/report/:file', (req, res)=> {
    console.log('----------')
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
router.post('/api/upload', upload.single('uploadfile'),
    (req, res)=> {
    console.log('----------');
    console.log(`Upload file: ${req.file.filename}`);
    res.json({result: true})
});


/* Delete file */
const fileDelete = require('../api/filedelete');
router.get('/api/delete/:file', (req, res)=> {
    console.log('----------');
    console.log('Delete file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    fileDelete.remove(file);
    res.json({result: true});
    });


module.exports = router;
