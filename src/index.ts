const timer = (usermin: number, usersec: number, callback: any) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }

  //Check type 
  function isInteger(x: number) { return typeof x === "number" && isFinite(x) && Math.floor(x) === x; }

  //To get 2 digit number
  function pad2(number:number) {
    return (number < 10 ? '0' : '') + number
 }

 try {
  if(typeof(usermin) != "number") throw 'minutes should be integer.';
  if(typeof(usersec) != "number") throw 'seconds should be integer';
  if(!isInteger(usermin)) throw 'minutes should be integer'; 
  if(!isInteger(usersec)) throw 'seconds should be integer';
  if(usermin > 59) throw 'minutes can not be greater than 59';
  if(usersec > 59) throw 'seconds can not be greater than 59';
  let timer = setInterval(myTimer ,1000);
  let min = usermin;
  let sec = usersec;
  function myTimer () {
      if(min==0 && sec==0){
          clearInterval(timer);
          callback({min: pad2(0), sec: pad2(0), error:false, errMsg:''})
          return 
      }
      callback({ min:pad2(min), sec:pad2(sec) ,error:false, errMsg:''});
      if(min != 0 && sec == 0){
          min--;
      }
      if(sec != 0){
          sec--;
      }else if(min == 0 && sec == 0){
          sec = 59;
      }else if(min != 0 && sec == 0){
          sec = 59;
      }
  }
} catch(err) {
  callback({min:pad2(0),sec: pad2(0),error: true, errMsg: err})
}

  
};

timer(1,20,(p) => console.log(p));
