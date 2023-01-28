export class JerkValue {
    constructor(startValue, startTime, accelRate, maxAccel){
        this.startValue=startValue;
        this.startTime=startTime;
        this.accelRate=accelRate;
        this.maxAccel=maxAccel;
        this.initialAccel=0;
        this.target=startValue;
    }

    setMaxAccel(newMaxAccel){
        this.maxAccel=newMaxAccel;
    }
    setAccelRate(newAccelRate){
        this.accelRate=newAccelRate;
    }

    setTarget(currentTime, newTarget){
        const newStartValue = this.getCurrentValue(currentTime);
        const newInitialAccel = this.getCurrentAccel(currentTime);
        this.startTime=currentTime;
        this.startValue=newStartValue;
        this.initialAccel=newInitialAccel;
        this.target=newTarget;
    }

    getCurrentValue(currentTime){
        return this.startValue+speedAtTime(currentTime-this.startTime, this.initialAccel, this.accelRate, this.maxAccel, this.target-this.startValue);
    }

    getCurrentAccel(currentTime){
        return accelerationAtTime(currentTime-this.startTime, this.initialAccel, this.accelRate, this.maxAccel, this.target-this.startValue);
    }
}

export function accelerationAtTime(time, initialAccel, accelRate, maxAccel, target){
    const totalTime = howLongToGetToTarget(target, accelRate, maxAccel, initialAccel);
    if (time>=totalTime) return 0;

    if (initialAccel<0){
        return -accelerationAtTime(time, 0-initialAccel, accelRate, maxAccel, -target);
    }

    const distanceToZeroFromInitial = initialAccel**2/accelRate/2;

    const willOvershoot = distanceToZeroFromInitial > target;

    if (willOvershoot===false){
        if (target===distanceToZeroFromInitial){
            //acceleration is constantly decreasing to zero and we'll meet the target
            return initialAccel-time*accelRate;
        }
        const timeToMid = ((0-initialAccel/accelRate)+totalTime)/2;
        const timeToMax = (maxAccel-initialAccel)/accelRate;

        if (timeToMid<timeToMax){
            //Max accel never reached
            if (time<timeToMid){
                //Increasing acceleration
                return initialAccel+time*accelRate;
            }
            //Decreasing acceleration
            return (initialAccel+timeToMid*accelRate)-(time-timeToMid)*accelRate;
        }else{
            //Max accel is reached at some point
            const timeToZeroFromMax = maxAccel/accelRate;

            if (time<Math.abs(timeToMax)){
                //The increasing acceleration up to the maximum acceleration
                if (timeToMax<=0){
                    //return (accelRate*(time-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
                }
                //return (accelRate*(time+(initialAccel/accelRate))**2)/2 - (accelRate*(initialAccel/accelRate)**2)/2;
            }else if (time<=totalTime-timeToZeroFromMax){
                //We are at the max acceleration
                if (timeToMax<=0){
                    const base = (accelRate*(-timeToMax-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
                    //return base+maxAccel*(time+timeToMax);
                }else{
                    const base = (accelRate*(timeToMax+(initialAccel/accelRate))**2)/2 - (accelRate*(initialAccel/accelRate)**2)/2;
                    //return base+maxAccel*(time-timeToMax);
                }
            }else if (time<=totalTime){
                //We are reducing acceleration from max to 0
                //return target+accelRate*(time-totalTime)**2/-2
            }else{
                //We're at the target
                return 0;
            }
        }

    }else{
        //We are going to overshoot the target
        const timeToZero = initialAccel/accelRate;
        const fallTime = totalTime-timeToZero;
        const needsLimit = fallTime/2*accelRate > maxAccel;

        if (needsLimit===false){
            if (time <= timeToZero+fallTime/2){
                //return (accelRate*(time-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
            }else if (time<=totalTime){
                //return (accelRate*(totalTime-time)**2/2)+target;
            }
            return 0;
        }else{
            if (time<=timeToZero+maxAccel/accelRate){
                //return (accelRate*(time-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
            }else if (time<=totalTime-maxAccel/accelRate){
                const constStartTme = timeToZero+maxAccel/accelRate;
                //return (accelRate*(constStartTme-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2-(time-constStartTme)*maxAccel;
            }
            //return (accelRate*(totalTime-time)**2/2)+target;
        }
    }
}


export function speedAtTime(time, initialAccel, accelRate, maxAccel, target){
    if (initialAccel<0){
        return -speedAtTime(time, 0-initialAccel, accelRate, maxAccel, -target);
    }
    const distanceToZeroFromInitial = initialAccel**2/accelRate/2;

    const willOvershoot = distanceToZeroFromInitial > target;

    const totalTime = howLongToGetToTarget(target, accelRate, maxAccel, initialAccel);
    if (time>=totalTime) return target;

    if (willOvershoot===false){
        if (target===distanceToZeroFromInitial){
            if (time<totalTime){
                return target-accelRate*(totalTime-time)**2/2;
            }
            return target;
        }
        const timeToMid = ((0-initialAccel/accelRate)+totalTime)/2;
        const timeToMax = (maxAccel-initialAccel)/accelRate;

        if (timeToMid<timeToMax){
            if (time<timeToMid){
                return (accelRate*(time+(initialAccel/accelRate))**2)/2 - (accelRate*(initialAccel/accelRate)**2)/2;
            }
            return target-(accelRate*(totalTime-time)**2)/2;
        }else{
            const timeToZeroFromMax = maxAccel/accelRate;

            if (time<Math.abs(timeToMax)){
                if (timeToMax<=0){
                    return (accelRate*(time-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
                }
                return (accelRate*(time+(initialAccel/accelRate))**2)/2 - (accelRate*(initialAccel/accelRate)**2)/2;
            }else if (time<=totalTime-timeToZeroFromMax){
                if (timeToMax<=0){
                    const base = (accelRate*(-timeToMax-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
                    return base+maxAccel*(time+timeToMax);
                }else{
                    const base = (accelRate*(timeToMax+(initialAccel/accelRate))**2)/2 - (accelRate*(initialAccel/accelRate)**2)/2;
                    return base+maxAccel*(time-timeToMax);
                }
            }else if (time<=totalTime){
                return target+accelRate*(time-totalTime)**2/-2
            }else{
                return target;
            }
        }

    }else{
        const timeToZero = initialAccel/accelRate;
        const fallTime = totalTime-timeToZero;
        const needsLimit = fallTime/2*accelRate > maxAccel;

        if (needsLimit===false){
            if (time <= timeToZero+fallTime/2){
                return (accelRate*(time-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
            }else if (time<=totalTime){
                return (accelRate*(totalTime-time)**2/2)+target;
            }
            return target;
        }else{
            if (time<=timeToZero+maxAccel/accelRate){
                return (accelRate*(time-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2;
            }else if (time<=totalTime-maxAccel/accelRate){
                const constStartTme = timeToZero+maxAccel/accelRate;
                return (accelRate*(constStartTme-(initialAccel/accelRate))**2)/-2 + (accelRate*(initialAccel/accelRate)**2)/2-(time-constStartTme)*maxAccel;
            }
            return (accelRate*(totalTime-time)**2/2)+target;
        }
    }
}



export function howLongToGetToTarget(delta, accelRate, maxAccel, initialAccel){
    if (initialAccel<0){
        return (howLongToGetToTarget(0-delta, accelRate, maxAccel, -initialAccel));
    }

    const distanceToZeroFromInitial = initialAccel**2/accelRate/2;
    if (delta===distanceToZeroFromInitial){
        return initialAccel/accelRate;//If slowing down immediately will end up at the target speed exactly
    }
    const willOvershoot = distanceToZeroFromInitial > delta;

    const distanceToZeroFromMax = maxAccel**2/accelRate/2;
    const timeToZeroFromMax = maxAccel/accelRate;

    if (willOvershoot===false){
        if (initialAccel>maxAccel){
            //If the initial acceleration needs to be brought down to the max allowed, and there is an amount of time where accel is capped at max accel
            const timeToFallToMax = (initialAccel-maxAccel)/accelRate;

            const distanceDuringFallToMax = (initialAccel**2 - maxAccel**2)/accelRate/2;
            
            const linearDelta = delta-distanceDuringFallToMax-distanceToZeroFromMax;
            
            return (linearDelta/maxAccel)+timeToFallToMax+timeToZeroFromMax;
        }else{
            //How long it will take without consideration of max accel
            const priorTime = initialAccel/accelRate;
            const absVal = Math.abs((delta+initialAccel**2/(accelRate*2))*4/accelRate);
            let timeToTarget = Math.sqrt(absVal)-priorTime;

            const riseHalfTime = (timeToTarget+priorTime)/2 - priorTime;
            const maxAccelTime = (timeToTarget-riseHalfTime);
            const highestAccelReached = maxAccelTime*accelRate;

            if (highestAccelReached>maxAccel){
                //If max accel is reached, add that to the time taken
                const timeToMax = maxAccel/accelRate;
                const timeAboveMax = maxAccelTime-timeToMax;
                const speedToMakeUp = accelRate*timeAboveMax**2;
                timeToTarget+=speedToMakeUp/maxAccel;
            }

            return timeToTarget;
        }
    }else{
        const timeToZeroFromInitial = initialAccel/accelRate;
        const newDelta = distanceToZeroFromInitial - delta;
        if (distanceToZeroFromMax*2 < newDelta){
            //If there is a moment where the acceleration is capped at max accel
            const distanceToMakeUp = newDelta - distanceToZeroFromMax*2;
            const timeToMakeUp = distanceToMakeUp/maxAccel;

            return timeToZeroFromInitial + timeToZeroFromMax*2 + timeToMakeUp;
        }else{
            //If max acceleration is never reached
            const absVal = Math.abs((newDelta)*4/accelRate);
            const timeToFall = Math.sqrt(absVal);

            return timeToZeroFromInitial+timeToFall;
        }
    }
}