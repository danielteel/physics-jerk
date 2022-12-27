time=0;
tick=0.1;


let speed = {
    current: 0,
    target: 100,

    accel: 0,
    accelRate: 2,
    maxAccel: 6
}

console.log(maxDistanceCanTravelAndComeToStop(6, 1, 5, 10));


function maxDistanceCanTravelAndComeToStop(startSpeed, accel, maxSpeed, tickTime){
    //returns null if we cant come to a stop in alloted tickTime

    let distanceTravelled=0;

    if (startSpeed<0){
        const timeToSpeedInitialUp = Math.abs(startSpeed)/accel;
        if (timeToSpeedInitialUp>tickTime) return null;
        distanceTravelled=startSpeed/2*timeToSpeedInitialUp;
        tickTime-=timeToSpeedInitialUp;
        startSpeed=0;
    }

    const timeToSlowInitialDown = startSpeed/accel;
    if (timeToSlowInitialDown>tickTime) return null;

    if (startSpeed>maxSpeed){
        const timeToGetToMaxSpeed = (startSpeed-maxSpeed)/accel;
        tickTime-=timeToGetToMaxSpeed;
        distanceTravelled+=(startSpeed+maxSpeed)/2*timeToGetToMaxSpeed;
        startSpeed=maxSpeed;
    }

    const timeToRise = maxSpeed/accel - startSpeed/accel;
    const timeToFall = maxSpeed/accel;

    if (timeToRise+timeToFall < tickTime){
        distanceTravelled+=(maxSpeed + startSpeed)/2*timeToRise;
        distanceTravelled+=(maxSpeed/2)*timeToFall;

        distanceTravelled+=(tickTime-timeToRise-timeToFall)*maxSpeed;
    } else if (timeToRise+timeToFall > tickTime){
        return null;
    } else {
        const maxSpeedChange = tickTime*accel;
        distanceTravelled+=maxSpeedChange/4*tickTime;
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
