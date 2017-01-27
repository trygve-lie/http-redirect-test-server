'use strict';

const request = require('request');

request({
    method: 'POST',
    url: 'http://localhost:9000/redirect',
    followAllRedirects: true,
    form:{
        text:'test'
    }
}, (error, response, body) => {
    console.log(body);
});
