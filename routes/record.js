'use strict';
var express = require('express');
var router = express.Router();
var Record = require('../models/record');

router.get('/row', function(req, res, next){
  Record.findAll({
    order:[['"recordId"', 'DESC']]
  }).then((records)=>{
    res.render('recordRow',{
      records
    });
  });
  
});

module.exports = router;