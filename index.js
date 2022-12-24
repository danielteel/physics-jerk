const isAboutEquals = (num1, num2, epsilon = 0.004) => Math.abs(num1 - num2) < epsilon;

let speed = 0;
let targetSpeed = 106;

let accel = 0;
const accelAccel = 1;
const maxAccel = 9;
let targetAccel=maxAccel;



let lastSign=1;
if (speed>targetSpeed) lastSign=-1;

while (!isAboutEquals(speed, targetSpeed) || !isAboutEquals(accel, 0, 1)){

    const speedToBe=speed+accel;

    const speedDelta = speedToBe - targetSpeed;
    const accelDelta = targetAccel - accel;
    
    let sign=1;
    if (speedToBe>targetSpeed) sign=-1;
    
    targetAccel=maxAccel*sign;
    if (Math.abs(speedDelta)<=distNeeded(accel, 0, accelAccel)){
        targetAccel=accelAccel*sign;
    }

    if (!isAboutEquals(accel, targetAccel)){
        
        let accelAdd = 0;
        if (accelDelta>0) accelAdd = accelAccel;
        if (accelDelta<0) accelAdd = -accelAccel;
    
        if (Math.abs(accelAdd)>Math.abs(accelDelta)){
            accelAdd=Math.abs(accelDelta)*Math.sign(accelAdd);
        }
    
        accel += accelAdd;
    }

    speed+=accel;

    console.log(speed, accel);
}



function distNeeded(current, target, step){
    const delta = Math.abs(target-current);
    step=Math.abs(step);

    return delta*(delta+step)/step/2;
}