const path = require('path');
const fs = require("fs-extra");

const src = path.join('src', 'assets');
const dest = path.join('dist/question-editor-library/assets/');

fs.copy(src, dest, function (err) {
    if (err) {
        console.log('An error occured while copying assets folder.', err);
        return console.error(err)
    }
    console.info('Copied assets folder');
});