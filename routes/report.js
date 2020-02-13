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

router.post('/:file/report', (req, res)=>{
    console.log(JSON.stringify(req.body));
    res.json({
        result: true,
    })
});

module.exports = router;
