const fs = require('fs');

exports.getList = function (req, res, next) {
    exports.list = [];
    fs.readdirSync(exports.folder).forEach(file => {
        exports.list.push(file);
    });
    next();
};