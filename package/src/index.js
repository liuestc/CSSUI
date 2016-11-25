var $=require('./zepto.js');
var data = require('../src/data.js');
data.getTest(function(res){
    console.log(res);
})
