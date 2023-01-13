function speedAtTime(time, initialAccel, accelRate, maxAccel, target){
    if (time<0) return null;
    
    const initialUnderAccel=initialAccel/accelRate;
    const speedAtZero = initialAccel**2/2/accelRate;
    const totalTime = Math.sqrt(Math.abs(target+initialAccel**2/(accelRate*2)) * (4/accelRate) ) - initialUnderAccel;
    const riseHalfTime = (totalTime+initialUnderAccel)/2 - initialUnderAccel;

    if (riseHalfTime<0) return null;


    const maxAccelTime = (totalTime-riseHalfTime);
    const highestAccelReached = maxAccelTime*accelRate;
    if (highestAccelReached>maxAccel){
        const totalTime = howLongToGetToTarget(target, accelRate, maxAccel, initialAccel);
        const timeToMaxAccel = maxAccel/accelRate;
        const startOfConstantAccel = Math.abs(initialUnderAccel) + timeToMaxAccel;
        const endOfConstantAccel = totalTime-timeToMaxAccel;
        if (time<=startOfConstantAccel){
            return (accelRate*(time+initialUnderAccel)**2)/2 - speedAtZero;
                
        }else if (time>startOfConstantAccel && time<=endOfConstantAccel){
            return (accelRate*(startOfConstantAccel+initialUnderAccel)**2)/2 - speedAtZero + (time-startOfConstantAccel)*maxAccel;

        }else if (time<totalTime){
            return (accelRate*(time-totalTime)**2)/-2+target;
        }else{
            return target;
        }
    }

    if (time<=riseHalfTime){
        return (accelRate*(time+initialUnderAccel)**2)/2 - speedAtZero; 
    }
    if (time<=totalTime){
        return (accelRate*(time-totalTime)**2)/-2+target;
    }
    return target;
}


function howLongToGetToTarget(delta, accelRate, maxAccel, initialAccel){
    if (initialAccel>0){
        return howLongToGetToTarget2(delta, accelRate, maxAccel, initialAccel);
    }
    const absVal = Math.abs((delta+initialAccel**2/(accelRate*2))*4/accelRate);
    let timeToTarget = Math.sqrt(absVal) - initialAccel/accelRate;

    if (timeToTarget<Math.abs(initialAccel/accelRate)) return null;
    if (initialAccel<0 && delta>0 && timeToTarget<=0) return null;
    if (initialAccel>0 && delta<0 && timeToTarget<=0) return null;
    if (timeToTarget<0) return null;


    const riseHalfTime = (timeToTarget+initialAccel/accelRate)/2 - initialAccel/accelRate;

    const maxAccelTime = (timeToTarget-riseHalfTime);
    const highestAccelReached = maxAccelTime*accelRate;
    if (highestAccelReached>maxAccel){
        const timeToMax = maxAccel/accelRate;
        const timeAboveMax = maxAccelTime-timeToMax;
        const speedToMakeUp = accelRate*timeAboveMax**2;
        timeToTarget+=speedToMakeUp/maxAccel;
    }

    return timeToTarget;
}


function howLongToGetToTarget2(delta, accelRate, maxAccel, initialAccel){
    console.log('howLongToGetToTarget2');
    console.log('\tdelta', delta);
    console.log('\taccelRate', accelRate);
    console.log('\tmaxAccel', maxAccel);
    console.log('\tinitialAccel', initialAccel);
    const distanceToZeroFromInitial = initialAccel**2/accelRate/2;
    if (delta===distanceToZeroFromInitial){
        return initialAccel/accelRate;
    }
    const willOvershoot = distanceToZeroFromInitial > delta;

    if (willOvershoot===false){
        const distanceToMaxFromInitial = (initialAccel**2 - maxAccel**2)/accelRate/2;
        const timeToMaxFromInitial = (initialAccel-maxAccel)/accelRate;
        const distanceToZeroFromMax = maxAccel**2/accelRate/2;
        const timeToZeroFromMax = maxAccel/accelRate;

        const distanceToMakeUp = delta - distanceToMaxFromInitial - distanceToZeroFromMax;
        const timeToMakeUp = distanceToMakeUp/maxAccel;

        return timeToMaxFromInitial+timeToZeroFromMax+timeToMakeUp;
    }else{

    }
}


console.log(howLongToGetToTarget(10, 1, 2, 4));
