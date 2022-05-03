/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/


class Ingridient {
    constructor(name, count) {
        this.name = name;
        this.count = count;
    }
}


class Bolognese extends Dish {
    #requireIngredients;

    constructor() {
        super(10);
        this.#requireIngredients = {
            'spaghetti': 1, 'meat': 1,'tomato': 2,
        };
    }

    getIngridients() {
        return this.#requireIngredients;
    }
}


class MashedPotatoes extends Dish {
    #requireIngredients;

    constructor() {
        super(8);
        this.#requireIngredients = {
            'potato': 1,
        };
    }

    getIngridients() {
        return this.#requireIngredients;
    }
}


class Steak extends Dish {
    #requireIngredients;

    constructor() {
        super(7);
        this.#requireIngredients = {
            'meat': 1,
        };
    }

    getIngridients() {
        return this.#requireIngredients;
    }
}


class SteakAndFries extends Dish {
    #requireIngredients;

    constructor() {
        super(15);
        this.#requireIngredients = {
            'meat': 1,
            'potato': 1,
        };
    }

    getIngridients() {
        return this.#requireIngredients;
    }
}


class Kitchen {
    constructor() {
        this.currentIngridients = {}
        this.orderVect = []
    }
    
    addToFridge(ingredients) {
        for(const i in ingredients) {
            this.currentIngridients[ingredients[i].name] = ingredients[i].count;
        }
    }

    reserveIngridients(order) {
        for (const [k, v] of Object.entries(order.getIngridients())) {
            if (this.currentIngridients[k] < v) {
                return false;
            }
        }
        
        for(const [k, v] of Object.entries(order.getIngridients())) {
            this.currentIngridients[k] -= v;
        }

        return true;
    }


    order(orderDish) {
        if (this.reserveIngridients(orderDish)) {
            this.orderVect.push(orderDish)
        } else {
            throw new Error('Error: No ingridient in fridge')
        }
    }



    async cookFastestOrder() {

        let idxMinimum = 0;
        let cookTimeMinimum = 9999999999;

        if (!this.orderVect.length) {
            throw new Error('Error: There is currently no orders.')
        }

        for (const orderIdx in this.orderVect) {

            if (cookTimeMinimum > this.orderVect[orderIdx].cookingTime) {
                idxMinimum = orderIdx;
                cookTimeMinimum = this.orderVect[orderIdx].cookingTime;    
            }
        }


        let finalOrder = this.orderVect[idxMinimum];
        this.orderVect.splice(idxMinimum, 1);

        return await finalOrder.cook();
    }

    async cookAllOrders() {

        let ordersGeneral = [];

        if (!this.orderVect.length) {
            throw new Error('Error: There is currently no orders.')
        }

        while(this.orderVect.length) {
            ordersGeneral.push(await this.orderVect.pop().cook())
        }
        
        return ordersGeneral;
    }
}


async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    try {
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    } catch (err) {
        console.log(err)
        console.log('....')
    }

}

test();