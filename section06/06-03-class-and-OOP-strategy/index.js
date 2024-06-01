class FlyParts {
    run = () => {
        console.log('날아서 도망가자!!')
    }
}

class RunParts {
    run = () => {
        console.log('달려서 도망가자!!')
    }
}

class Monster{
    power = 10;
    parts;

    constructor(parts,power) {
        if (typeof power === "number") {
            this.power = power
        }
        if (parts) {
            this.parts = parts
        }
    }

    attack() {
        console.log('공격!!')
        console.log('내 공격력은 '+ this.power + '야!!')
    }

    run = () => {
        this.parts.run()
    }
}

const myMonster1 = new Monster(new FlyParts());

myMonster1.attack();
myMonster1.run();

const myMonster2 = new Monster(new RunParts());
myMonster2.attack()
myMonster2.run()
