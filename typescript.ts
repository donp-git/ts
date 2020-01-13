interface iCoffee {
    water: number;
    beans: number;
    milk: number | boolean;
}

class Coffee implements iCoffee {
    water: number;
    beans: number;
    milk: number | boolean;

    constructor(
        water: number,
        beans: number,
        milk: number | boolean = false) {
        this.water = water;
        this.beans = beans;
        if (typeof milk != 'boolean') {
            this.milk = milk
        }
    }
}


abstract class Ingredients {
    maxLevel: number;
    levelWater: number;
    levelBeans: number;
    levelMilk: number;

    checkLevel(ingredient: string, amount: number, current: number) {
        if (amount + current >= this.maxLevel) {
            throw new Error(`Too much ${ingredient}`)
        } else {
            return amount + current;
        }
    }

// This is retarded. I know.
    setLevel(water: number, beans: number, milk?: number) {
        if (water > this.levelWater || beans > this.levelBeans || milk > this.levelMilk) {
            throw new Error("Please add new Ingredients");
        } else {
            setTimeout(() => {
                this.levelWater -= water;
                console.log('Boiling water');
                setTimeout(() => {
                    this.levelBeans -= beans;
                    console.log('Grinding beans');
                    setTimeout(() => {
                        if (milk) {
                            this.levelMilk -= milk;
                            console.log('Adding milk')
                        }
                    }, milk * 1000);
                }, beans * 1000);
            }, water * 1000);
        }
    }
}

class ALEF extends Ingredients {
    maxLevel: number;
    levelWater: number;
    levelBeans: number;
    levelMilk: number;

    constructor(
        // private Ingredients: Ingredients // ??
        water: number,
        beans: number,
        milk: number,
    ) {
        super();
        this.levelWater = water;
        this.levelBeans = beans;
        this.levelMilk = milk;
        this.maxLevel = 10;
    }

    public async getAmericano() {
        try {
            this.setLevel(2, 1);
        } catch (Error) {
            console.log(Error)
        }
        return new Coffee(2, 1);
    }

    public async getLatte() {
        try {
            this.setLevel(1, 1, 1);
        } catch (Error) {
            console.log(Error)
        }
        return new Coffee(1, 1, 1)
    }

    // i've tried
    public async getEspresso() {
        try {
            this.setLevel(1, 1)
        } catch (Error) {
            console.log(Error)
        }
        return new Coffee(1, 1)
    }

    public async getFlatWhite() {
        try {
            this.setLevel(1, 1, 2);
        } catch (Error) {
            console.log(Error)
        }
        return new Coffee(1, 1, 2)
    }


    public setWater(water: number): void {
        this.levelWater = this.checkLevel('water', water, this.levelWater);
    }

    public setBeans(beans: number): void {
        this.levelBeans = this.checkLevel('beans', beans, this.levelBeans);
    }

    public setMilk(milk: number): void {
        this.levelMilk = this.checkLevel('Milk', milk, this.levelMilk);
    }
}