var fs = require('fs');


const dataDir = "data";
const dataFile = "data.json";

var getJson = () => {
  var dataContent = fs.readFileSync(dataDir + "/" + dataFile, "utf8");
  return dataContent;
}

module.exports = {
  getJson
}
