const assert = require('assert');
const u = require('../utility/utility');

describe('Data management', function(){
  describe('Get data', function(){
    it('Should return the test data set', function(){
      u.getFileData('test', 'testData.json')
      .then((data) => {
        assert.equal(data[0].title == "Test1");
      })
      .catch((err) => {
        console.log(err);
      })
    })
  })
})
