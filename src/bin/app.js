import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const PORT = 8081;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/index.htm', function(req, res) {
    res.sendFile(__dirname + '/' + 'index.htm');
});
app.get('/bundle.js', function(req, res) {
    res.sendFile(__dirname + '/' + 'bundle.js');
});
app.get('/whiteBack.png', function(req, res) {
    res.sendFile(__dirname + '/' + 'whiteBack.png');
}); //
app.use((req, res, next) => {
    const err = new Error(req.url, 'Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        error: err,
        errorMsg: err.message,
    });
});

app.listen(PORT, function() {
    console.log(`Liseteb at ${PORT}`);
});

module.exports = app;
