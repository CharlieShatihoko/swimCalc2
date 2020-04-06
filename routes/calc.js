
//タイムの文字列をカンマ取り出して配列化
function rapCalcutator( str ){
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
  //全データをオブジェクトで管理
  //データを加工して扱えるようにする
  str = str.replace('{"content":"','');
  tmp = str.split(" ");
  console.info(tmp);
  timeData.rapNumber = tmp.length;
  console.info(timeData.rapNumber);
  console.info(tmp[0]);
  console.info(tmp[0].split('-'));
  console.info(((tmp[0]).split('-')).length);

  for(let i=0; i<timeData.rapNumber; i++){
    if(((tmp[i]).split('-')).length === 3){
    timeData.timeMin[i] = parseInt(tmp[i].split('-')[0]);
    timeData.timeSec[i] = parseInt(tmp[i].split('-')[1]);
    timeData.timeDeg[i] = parseInt(tmp[i].split('-')[2]);
    timeData.secTime[i] = timeData.timeMin[i] * 60 + timeData.timeSec[i] + timeData.timeDeg[i]/100;
    console.info(timeData.timeMin[i],timeData.timeSec[i],timeData.timeDeg[i]);
    }else if(((tmp[i]).split('-')).length===2){
      timeData.timeMin[i] = 0;
      timeData.timeSec[i] = parseInt(tmp[i].split('-')[0]);
      timeData.timeDeg[i] = parseInt(tmp[i].split('-')[1]);
      timeData.secTime[i] = timeData.timeMin[i] * 60 + timeData.timeSec[i] + timeData.timeDeg[i]/100;
    }else{
      console.error('cant modified');
    }
  }
    //データ配列化完了
    //ラップ配列の計算
    for(let t =1; t<=timeData.rapNumber; t++){
      timeData.rapSec[t] = parseInt(timeData.secTime[t] - timeData.secTime[t-1]);
      timeData.rapDeg[t] = timeData.secTime[t] - timeData.secTime[t-1] - parseInt(timeData.secTime[t]) + parseInt(timeData.secTime[t-1]);
      //タイムデータはオブジェクトtimeDataに保管
    }
  return timeData;//timeDataを返す
};

module.exports = {rapCalcutator};