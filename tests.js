var assert = require('assert');
var request = require('superagent');

var server = require('./server.js');
var jsontocsv = require('./jsontocsv.js');

var serverUrl = 'http://localhost:8080';
var endpointUrl = serverUrl + '/api/convert';

describe('JSON to CSV', function () {

  describe('CSV formatting', function () {

    describe('validation', function () {
      var errorMessage = "Invalid JSON";

      it('should error if input is not array', function (done) {
        assert.equal(jsontocsv.convert(123), errorMessage);
        assert.equal(jsontocsv.convert('asdf'), errorMessage);
        assert.equal(jsontocsv.convert({}), errorMessage);
        done();
      });

      it('should error if array is empty', function (done) {
        assert.equal(jsontocsv.convert('[]', errorMessage));
        done();
      });

      it('should error if the number of properties of each element are not the same', function (done) {
        var invalid1 = [
          {
            "first":"George",
            "last":"Washington"
          },
          {
            "first":"Bob"
          }
        ];
        assert.equal(jsontocsv.convert(invalid1), errorMessage);
        done();
      });
      
      it('should error if property names of each element are not the same', function (done) {
        var invalid2 = [
          {
            "first":"George",
            "last":"Washington"
          },
          {
            "first":"Bob",
            "gender":"male"
          }
        ];

        assert.equal(jsontocsv.convert(invalid2), errorMessage);
        done();
      });

    });

  });

  describe('converter', function () {

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

    it('should respond with CSV after posting valid JSON', function (done) {
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

});
