var assert = require('assert');
var request = require('superagent');

var server = require('./server.js');
var jsontocsv = require('./jsontocsv.js');

var serverUrl = 'http://localhost:8080';
var endpointUrl = serverUrl + '/api/convert';


describe('validation', function () {
  var errorMessage = "Invalid JSON";

  it('should error if input is not array', function (done) {
    assert.equal(jsontocsv.convert(123), errorMessage);
    assert.equal(jsontocsv.convert('asdf'), errorMessage);
    assert.equal(jsontocsv.convert({}), errorMessage);
    done();
  });

  it('should error if array is empty', function (done) {
    assert.equal(jsontocsv.convert([]), errorMessage);
    done();
  });

  it('should error if array contains non-objects', function (done) {
    assert.equal(jsontocsv.convert([{},1]), errorMessage);
    done();
  });
  
});

describe('converter', function () {

  it('should return 1 row for 1 element', function (done) {
    var json1 = [
      {
        "first":"Brenard",
        "last":"Cubacub",
        "gender":"male"
      }
    ];
    var csv1 = 'first,last,gender\nBrenard,Cubacub,male';
    assert.equal(jsontocsv.convert(json1), csv1);
    done();
  });

  it('should transform JSON with all matching fields', function (done) {
    var json2 = [
      {
        "name": "Adam",
        "lastName": "Smith",
        "gender": "male",
        "country": "Scotland"
      },
      {
        "name": "George",
        "lastName": "Washington",
        "gender": "male",
        "country": "USA"
      },
      {
        "name": "Marie",
        "lastName": "Curie",
        "gender": "female",
        "country": "France"
      }
    ];
    var csv2 = 'name,lastName,gender,country' + 
      '\nAdam,Smith,male,Scotland' +
      '\nGeorge,Washington,male,USA' +
      '\nMarie,Curie,female,France';
    assert.equal(jsontocsv.convert(json2), csv2);
    done();
  });

  it('should insert empty string for undefined values', function (done) {
    var json3 = [
      {
        "first":"George",
        "last":"Washington",
        "gender":"male"
      },
      {
        "first":"Bob"
      }
    ];
    var csv3 = 'first,last,gender\nGeorge,Washington,male\nBob,,';
    assert.equal(jsontocsv.convert(json3), csv3);
    done();
  });

  it('should ignore fields not specified in the first row', function (done) {
    var json4 = [
      {
        "first":"George",
        "last":"Washington"
      },
      {
        "first":"Bob",
        "gender":"male"
      }
    ];
    var csv4 = 'first,last\nGeorge,Washington\nBob,';
    assert.equal(jsontocsv.convert(json4), csv4);
    done();
  });

});


describe('server', function () {
  
  before(function (done) {
    server.start();
    done();
  });

  it('should return 200 from JSON POST request', function (done) {
    request.post(endpointUrl)
      .set('Content-Type', 'application/json')
      .send('{"test":"testing"}')
      .end(function (err, res) {
        assert.equal(200, res.statusCode);
        done();
      });
  });

  it('should respond with CSV after POSTing valid JSON', function (done) {
    var json2 = [
      {
        "name": "Adam",
        "lastName": "Smith",
        "gender": "male",
        "country": "Scotland"
      },
      {
        "name": "George",
        "lastName": "Washington",
        "gender": "male",
        "country": "USA"
      },
      {
        "name": "Marie",
        "lastName": "Curie",
        "gender": "female",
        "country": "France"
      }
    ];
    var csv2 = 'name,lastName,gender,country' + 
      '\nAdam,Smith,male,Scotland' +
      '\nGeorge,Washington,male,USA' +
      '\nMarie,Curie,female,France';

    request.post(endpointUrl)
      .send(json2)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        assert.equal(csv2, res.text);
        assert.equal(200, res.statusCode);
        done();
      });
  });

});
