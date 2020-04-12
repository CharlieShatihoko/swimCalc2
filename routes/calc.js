
//タイムの文字列をカンマ取り出して配列化
function rapCalcutator( str , req){
  console.info(str);
  var tmp = [];
  var timeData = {
    timeMin: [],
    timeSec: [],
    timeDeg: [],
    rapSec: [],
    rapDeg: [],
    secTime: [],
    rapNumber: 0
  };

  var sessionData = req.session;
  var split = [];
  split[0] = 0;
  var rap = [];
  rap[0] = 0;

  //全データをオブジェクトで管理
  //データを加工して扱えるようにする
  str = str.replace('{"content":"','');
  tmp = str.split(" ");
  timeData.rapNumber = tmp.length;

  for(let i=0; i<timeData.rapNumber; i++){
    if(((tmp[i]).split('-')).length === 3){
    timeData.timeMin[i] = parseInt(tmp[i].split('-')[0]);
    timeData.timeSec[i] = parseInt(tmp[i].split('-')[1]);
    timeData.timeDeg[i] = parseInt(tmp[i].split('-')[2]);
    timeData.secTime[i] = timeData.timeMin[i] * 60 + timeData.timeSec[i] + timeData.timeDeg[i]/100;
    split[i+1] = timeData.secTime[i];
    }else if(((tmp[i]).split('-')).length===2){
      timeData.timeMin[i] = 0;
      timeData.timeSec[i] = parseInt(tmp[i].split('-')[0]);
      timeData.timeDeg[i] = parseInt(tmp[i].split('-')[1]);
      timeData.secTime[i] = timeData.timeMin[i] * 60 + timeData.timeSec[i] + timeData.timeDeg[i]/100;
      split[i+1] = timeData.secTime[i];
    }else{
      console.error('cant modified');
    }
  }
  
  rap[1] = 0;
    //データ配列化完了
    //ラップ配列の計算
    for(let t =1; t<=timeData.rapNumber-1; t++){
      timeData.rapSec[t] = parseInt(timeData.secTime[t] - timeData.secTime[t-1]);
      //console.info(timeData.secTime[t] - timeData.secTime[t-1]);
      console.info(timeData.rapSec[t]);
      timeData.rapDeg[t] = parseInt(((timeData.secTime[t] - timeData.secTime[t-1])*100) % 100);
      //console.info((timeData.secTime[t] - timeData.secTime[t-1])*100);
      console.info((timeData.rapDeg[t]));
      //タイムデータはオブジェクトtimeDataに保管
      //rapDegは二桁の正の整数
      rap[t] = timeData.secTime[t] - timeData.secTime[t-1] ;
    }

    sessionData.split = timeData.secTime;
    sessionData.rap = rap;

  return timeData;//timeDataを返す
};

module.exports = {rapCalcutator};