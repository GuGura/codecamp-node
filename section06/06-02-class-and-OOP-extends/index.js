// class Date{
//     qqq = 3;
//
//     getFullYear(){
//
//     }
//
//     getMonth(){
//
//     }
//
// }
const date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth()+1);


class Monster {
    power = 10

    constructor(power) {
        if (typeof power === "number") {
            this.power = power
        }
    }

    attack() {
        console.log('공격!!')
        console.log('내 공격력은 '+ this.power + '야!!')
    }

    run = () => {
        console.log('도망가!!')
    }
}

class FlyingMonster extends Monster {

    constructor(power) {
        super(power + 1);
    }

    run = () => {
        console.log('날아라~~')
    }
}

class RunningMonster extends Monster {

    run = () => {
        console.log('달려라~~')
    }
}

const myMonster1 = new FlyingMonster(30);

myMonster1.attack();
myMonster1.run();

const myMonster2 = new RunningMonster();
myMonster2.attack()
myMonster2.run()
