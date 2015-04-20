var convert = function (json) {
  var properties;
  var row;
  var csv = '';
  var delimiter = ',';
  var errorMessage = 'Invalid JSON';

  // Validate JSON
  if (!Array.isArray(json) || json.length === 0) {
    return errorMessage;
  }
  for (var k = 0; k < json.length; k++) {
    if (typeof json[k] !== 'object') {
      return errorMessage;
    }
  }

  // Build first row
  properties = Object.keys(json[0]);
  csv += properties.join(delimiter);

  // Build the rest of the rows
  for (var i = 0; i < json.length; i++) {
    row = '';
    for (var j = 0; j < properties.length; j++) {
      if (row !== '') {
        row += ',';
      } 
      if (json[i][properties[j]] !== undefined) {
        row += json[i][properties[j]];
      }
    }
    csv += '\n' + row;
  }
  return csv;
};

exports.convert = convert;
