var convert = function (json) {
  var csv = '';
  var errorMessage = 'Invalid JSON';

  // Validate JSON
  if (!Array.isArray(json)) {
    return errorMessage;
  }
  if (json.length === 0) {
    return errorMessage;
  }
  for (var k = 0; k < json.length; k++) {
    if (typeof json[k] !== 'object') {
      return errorMessage;
    }
  }

  // Build first row of CSV
  var properties = Object.keys(json[0]);
  csv += properties.join(',');

  for (var i = 0; i < json.length; i++) {
    // Start new row of data
    csv += '\n';
    for (var j = 0; j < properties.length; j++) {
      // Error if properties don't match up
      if (json[i][properties[j]] === undefined) {
        return errorMessage;
      } else {
        csv += json[i][properties[j]];
      }
      // Add comma except for last value of row
      if (j + 1 < properties.length) {
        csv += ',';
      }
    }
  }

  return csv;
};

exports.convert = convert;
