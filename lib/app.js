const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const patchs = require('./routes/patchs');
//const users = require('./routes/users');
//const sequences = require('./routes/sequences');

app.use(morgan('dev'));

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if(req.headers['x-forwarded-proto'] === 'https') next();
        else res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.use((req, res, next) => {
    const url = '*';
    res.header('Access-Control-Allow-Origin', url);
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//app.use(express.static('./public'));
app.use('/api/patchs', patchs);
//app.use('api/users', users);
//app.use('api/sequences', sequences);

app.use(errorHandler);

module.exports = app;