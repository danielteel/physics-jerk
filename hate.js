time=0;
tick=0.1;


let speed = {
    current: 0,
    target: 100,

    accel: 0,
    accelRate: 2,
    maxAccel: 6
}

console.log(maxDistanceCanTravelAndComeToStop(0, 1, 5, .25));


function maxDistanceCanTravelAndComeToStop(startAccel, accelRate, maxAccel, tickTime){

    let distanceTravelled=0;

    if (startAccel<0){
        const timeToSpeedInitialUp = Math.abs(startAccel)/accelRate;
        distanceTravelled=startAccel/2*timeToSpeedInitialUp;
        tickTime-=timeToSpeedInitialUp;
        startAccel=0;
    }

    const timeToSlowInitialDown = startAccel/accelRate;
    if (timeToSlowInitialDown>tickTime) return null;

    const timeToRise = maxAccel/accelRate - startAccel/accelRate;
    const timeToFall = maxAccel/accelRate;

    if (timeToRise+timeToFall < tickTime){
        distanceTravelled+=(maxAccel + startAccel)/2*timeToRise;
        distanceTravelled+=(maxAccel/2)*timeToFall;

        distanceTravelled+=(tickTime-timeToRise-timeToFall)*maxAccel;
    }else{
        const maxAccelChange = tickTime*accelRate;
        distanceTravelled+=maxAccelChange/4*tickTime;
    }

    return distanceTravelled;
}


function isAboutEquals(a, b, delta=0.01){
    if (Math.abs(a-b)<=delta){
        return true;
    }
    return false;
}

function tick(obj, timeDelta){
    const {current, target, accel, accelRate, maxAccel} = obj;
    const delta = target-current;
    const oldAccel = accel;

    const maxAccelAdd = accelRate*timeDelta;

    const startDecelAt = (accel*accel)/accelRate;

    if (error===startDecelAt){
        accel-=maxAccelAdd;

    }
}
