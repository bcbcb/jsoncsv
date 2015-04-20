var assert = require('assert');
var request = require('superagent');
var server = require('./server.js');

var serverUrl = 'http://localhost:8080';
var endpointUrl = serverUrl + '/api/convert';

describe('JSON to CSV', function () {

  describe('API', function () {

    it('should return 200 from JSON POST request', function (done) {
      request.post(endpointUrl)
        .set('Content-Type', 'application/json')
        .send('{"test":"testing"}')
        .end(function (req, res) {
          assert.equal(200, res.statusCode);
          done();
        });
    });

  });

  xdescribe('CSV formatting', function () {

    it('should validate that JSON can be transformed into CSV', function (done) {
      assert.equal(false, true);
    }); 

    it('should respond with a CSV formatted string for valid JSON', function (done) {
      assert.equal(false, true);
    });

  });

});
