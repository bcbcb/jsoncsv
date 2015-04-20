var assert = require('assert');
var request = require('superagent');

var server = require('./server.js');
var jsontocsv = require('./jsontocsv.js');

var serverUrl = 'http://localhost:8080';
var endpointUrl = serverUrl + '/api/convert';


describe('JSON to CSV', function () {

  describe('CSV formatting', function () {

    xit('should validate that JSON can be transformed into CSV', function (done) {
      assert.equal(false, true);
    }); 

    it('should return a CSV formatted string for valid JSON', function (done) {

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
        .end(function (req, res) {
          assert.equal(200, res.statusCode);
          done();
        });
    });

    xit('should respond with CSV after posting valid JSON', function (done) {
    });

  });

});
