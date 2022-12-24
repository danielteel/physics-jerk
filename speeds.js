function newAccelAndSpeed(timeDelta, rateOfAccel, oldAccel, oldSpeed){
    const newAccel = oldAccel+rateOfAccel*timeDelta;
    const averageAccel = (newAccel+oldAccel)/2;

    const newSpeed = oldSpeed+averageAccel*timeDelta;
    
    return [newAccel, newSpeed];
}

let speed=0, accel=0, rateOfAccel=1;
let time=0;

while (speed<100){
    [accel, speed] = newAccelAndSpeed(time, rateOfAccel, 0, 0);
    console.log(time, accel, speed);
    time++;
}
const climbTime=time-1;
while (speed>100){
    [accel, speed] = newAccelAndSpeed(time-climbTime, -rateOfAccel, 15, 112.5);
    console.log(time, accel, speed);
    time++;
}