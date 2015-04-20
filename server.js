var express = require('express');
var bodyParser = require('body-parser');
var jsontocsv = require('./jsontocsv.js');
var app = express();

app.set('host', 'localhost');
app.set('port', 8080);
app.use(bodyParser.json());

app.post('/api/convert', function (req, res){
  res.end(jsontocsv.convert((req.body)));
});

exports.start = function () {
  app.listen(app.get('port'));
  console.log('Server is listening on http://' + app.get('host') + ':' + app.get('port'));
};
