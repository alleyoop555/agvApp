const fs = require('fs');

exports.remove = function (file) {
    fs.unlinkSync(file);
};