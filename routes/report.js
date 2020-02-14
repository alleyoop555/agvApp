var express = require('express');
var router = express.Router();

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
router.get('/GET/file/:file', (req, res)=>{
    console.log('Report file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    const report = new agvReport(file);
    report.getAll(()=> {
        res.json(report.figure);
    })
});

/* Delete file */
const fileDelete = require('../api/filedelete');
router.get('/DELETE/file/:file', (req, res, next)=>{
    console.log(req.params);
    console.log('Delete file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    fileDelete.remove(file);
    next();
    },
    (res, req)=>{
        req.redirect('/report');
    });


module.exports = router;
