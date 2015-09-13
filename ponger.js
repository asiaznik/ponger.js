/**
 * @fileoverview Ponger
 *
 * Try:
 *   node ponger.js --host "http://localhost"
 *
 * @author artur.siaznik@gmail.com (Artur Siaznik)
 */

var http = require('http');
var flags = require('flags');

flags.defineString('host', 'localhost', ' A domain name or IP address of the server to issue the request to.');
flags.defineInteger('port', 80, 'Port of remote server.');
flags.defineString('path', '/', 'Request path.');
flags.defineInteger('times', 100, 'Times.');

flags.parse();

var requestOptions = {
    method: 'HEAD',
    host: flags.get('host').replace(/http:\/\//, ''),
    port: flags.get('port'),
    path: flags.get('path')
};

var sendRequest = function (time) {
    var req = http.request(requestOptions, function (response) {
        console.log('(' + time + ') Status: ' + response.statusCode);
        if (response.statusCode != 200) {
            console.log('' + response.statusMessage);
        }

        // Send another request (in sequence)
        if (time + 1 <= flags.get('times')) {
            sendRequest(time + 1);
        }
    });
    req.end();
};

sendRequest(1);
