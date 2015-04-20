var express = require('express');

var app = express();

app.set('host', 'localhost');
app.set('port', 8080);

app.post('/api/convert', function (req, res){
  res.sendStatus(200);
});

exports.start = function () {
  app.listen(app.get('port'));
  console.log('Server is listening on http://' + app.get('host') + ':' + app.get('port'));
};
