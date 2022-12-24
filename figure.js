const round=(n)=>(String(Math.round(n*100)/100).padEnd(6,' '));

let time=0;
let tick=.1;
let maxTime=20;

let speed=0;
let targetSpeed=35;

let accel=0;
let accelRate=3;
let maxAccel=6;
let targetAccel=5;

for (let time=tick; time<=maxTime; time+=tick){

    const oldAccel = accel;
    const maxAccelAdd = accelRate*tick;

    let whenDecelNeedsToStart=(accel*accel)/accelRate;
    if (targetSpeed-speed<=whenDecelNeedsToStart){
        targetAccel=0;
    }else{
        targetAccel=maxAccel;
    }

    if (accel>targetAccel){
        accel-=maxAccelAdd;
        if (accel<targetAccel) accel=targetAccel;
    }else if (accel<targetAccel){
        accel+=maxAccelAdd;
        if (accel>targetAccel) accel=targetAccel;
    }
    if (accel>maxAccel) accel=maxAccel;
    if (accel<-maxAccel) accel=-maxAccel;

    const avgAccel = (accel+oldAccel)/2;

    speed+=avgAccel*tick;

    console.log(round(time), '\t',"Accel: "+round(accel), '\t',"Speed: "+round(speed), '\t', "Start: "+round(whenDecelNeedsToStart));
}

(accel*accel)/accelRate