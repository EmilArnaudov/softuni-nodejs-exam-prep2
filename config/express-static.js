const express = require('express');
const path = require('path');

function setUpStaticFiles(app) {
    console.log(path.normalize(path.join(__dirname, '../public')));
    app.use(express.static(path.normalize(path.join(__dirname, '../public'))));
}


module.exports = setUpStaticFiles;