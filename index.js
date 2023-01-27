import { JerkValue } from "./JerkValue.js";

const speed = new JerkValue(0, 0, 2.5, 5);
speed.newTarget(0, 20);

for (let i=0;i<=10;i+=1){
    console.log(Math.round(i*100)/100,'\t', Math.round(speed.getCurrentValue(i)*100)/100);
    if (speed.getCurrentValue(i) === speed.target){
        speed.newTarget(i, 10);
    }
}