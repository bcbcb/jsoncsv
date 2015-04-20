var convert = function (json) {
  var csv = '';

  // Build first row of CSV
  var properties = Object.keys(json[0]);
  csv += properties.join(',');

  for (var i = 0; i < json.length; i++) {
    // Start new row of data
    csv += '\n';
    for (var j = 0; j < properties.length; j++) {
      csv += json[i][properties[j]];
      // Add comma unless it's the last column
      if (j + 1 < properties.length) {
        csv += ',';
      }
    }
  }

  return csv;
};

exports.convert = convert;
