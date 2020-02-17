const fs = require('fs');

exports.getList = function (folder) {
    let list = [];
    fs.readdirSync(folder).forEach(file => {
        list.push(file);
    });
    return list
};