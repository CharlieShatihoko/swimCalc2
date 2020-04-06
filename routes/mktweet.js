//表示する文を作成
function makeTweet (timeData) {
  var body = []; 
  body  = `50m :${timeData.timeMin[0]}-${timeData.timeSec[0]}-${timeData.timeDeg[0]}    `;
  
  for(let i = 1; i<timeData.rapNumber; i++) {
    var length = (i+1) * 50;
    body = `${body} ${length}m :${timeData.timeMin[i]}-${timeData.timeSec[i]}-${timeData.timeDeg[i]}  (${timeData.rapSec[i]}-${timeData.rapDeg[i]})   `;
  }
  return body;
};

module.exports = {
  makeTweet
};