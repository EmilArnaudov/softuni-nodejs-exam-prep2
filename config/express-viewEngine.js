const { engine } = require('express-handlebars');

function setViewEngine(app) {
    app.engine('hbs', engine({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
}   

module.exports = setViewEngine;