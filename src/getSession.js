var https = require('https');
var fs  = require('fs');

var options = {
  hostname: 'example.com',
  port: 83,
  path: '/v1/api?a=b',
  method: 'GET',
  key: fs.readFileSync('/path/to/private-key/key.pem'),
  cert: fs.readFileSync('/path/to/certificate/client_cert.pem'),  
  passphrase: 'password'
};

var req = https.request(options, function(res) {
console.log(res.statusCode);
res.on('data', function(d) {
  process.stdout.write(d);
  });
});

req.end()