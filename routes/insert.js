'use strict';
var Record = require('../models/record');

function insertToDatabase (sessionData){
  //styleIdを決定する
  var styleId = 0;
  if (sessionData.pool===1){ styleId = styleId+1000;}
  else{ styleId = styleId+2000;}
  
  switch(sessionData.style){
    case 'fly': styleId = styleId+100;
    case 'ba' : styleId = styleId+200;
    case 'br' : styleId = styleId+300;
    case 'fr' : styleId = styleId+400; 
  };

  styleId = styleId +  parseInt(sessionData.length)/10;


  //Recordに登録
  Record.upsert({
    competitionId : parseInt(sessionData.nameOfMeet),
    swimmerId : parseInt(sessionData.nameOfSwimmer),
    split : sessionData.split,
    rap : sessionData.rap,
    styleId : parseInt(styleId)
  });
}

module.exports = {insertToDatabase};