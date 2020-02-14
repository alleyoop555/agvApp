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
router.get('/GET/file/:file/', (req, res)=>{
    console.log('Report file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    let report = new agvReport(file);
    report.getAll(()=> {
        res.json(report.figure);
    })
});

/* Delete file */
router.get('/DELETE/file/:file/', (req, res)=>{
    console.log('Delete file: ' + req.params.file);
    const file = './uploads/report/' + req.params.file;
    res.send(JSON.stringify({
        result: true,
    }));
});

module.exports = router;
