var express = require('express');
var router = express.Router();

/* GET report page. */
router.get('/', function(req, res) {
    res.render('report');
});

module.exports = router;
