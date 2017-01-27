'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

const trim = (html) => {
    return html.trim().replace(/\>[\s]+\</g,'><');
};

const bodyIndex = (action) => {
    const html = `
        <!doctype html>
        <html>
            <body>
                <ul>
                    <li><a href="/test/post/301">Test a HTTP POST to a 301 redirect</a></li>
                    <li><a href="/test/post/302">Test a HTTP POST to a 302 redirect</a></li>
                    <li><a href="/test/post/307">Test a HTTP POST to a 307 redirect</a></li>
                    <li><a href="/test/post/308">Test a HTTP POST to a 308 redirect</a></li>
                </ul>
            </body>
        </html>
    `;
    return trim(html);
};

const bodyForm = (action) => {
    const html = `
        <!doctype html>
        <html>
            <body>
                <form action="${action}" method="post">
                    <input type="text" name="text" value="test">
                    <button type="submit">Post</button>
                </form>
            </body>
        </html>
    `;
    return trim(html);
};

const bodyDestination = (method, body) => {
    const html = `
        <!doctype html>
        <html>
            <body>
                <p>Redirect was a ${method} - body of request: ${JSON.stringify(body)}</p>
            </body>
        </html>
    `;
    return trim(html);
};


app.get('/', (req, res, next) => {
    res.status(200).send(bodyIndex());
});


app.get('/test/post/301', (req, res, next) => {
    res.status(200).send(bodyForm('/redirect/post/301'));
});

app.get('/test/post/302', (req, res, next) => {
    res.status(200).send(bodyForm('/redirect/post/302'));
});

app.get('/test/post/307', (req, res, next) => {
    res.status(200).send(bodyForm('/redirect/post/307'));
});

app.get('/test/post/308', (req, res, next) => {
    res.status(200).send(bodyForm('/redirect/post/308'));
});


app.post('/redirect/post/301', (req, res, next) => {
    console.log('/redirect/post/301 - got post - body:', req.body);
    console.log('/redirect/post/301 - redirecting to /destination');
    res.redirect(301, '/destination');
});

app.post('/redirect/post/302', (req, res, next) => {
    console.log('/redirect/post/302 - got post - body:', req.body);
    console.log('/redirect/post/302 - redirecting to /destination');
    res.redirect(302, '/destination');
});

app.post('/redirect/post/307', (req, res, next) => {
    console.log('/redirect/post/307 - got post - body:', req.body);
    console.log('/redirect/post/307 - redirecting to /destination');
    res.redirect(307, '/destination');
});

app.post('/redirect/post/308', (req, res, next) => {
    console.log('/redirect/post/308 - got post - body:', req.body);
    console.log('/redirect/post/308 - redirecting to /destination');
    res.redirect(308, '/destination');
});


app.post('/destination', (req, res, next) => {
    console.log('/destination - got POST - body:', req.body);
    res.status(200).send(bodyDestination('POST', req.body));
});

app.get('/destination', (req, res, next) => {
    console.log('/destination - got GET - body:', req.body);
    res.status(200).send(bodyDestination('GET', req.body));
});


app.listen(process.env.PORT || process.argv[2], () => {
    console.log('http server running at port', process.env.PORT || process.argv[2]);
});
