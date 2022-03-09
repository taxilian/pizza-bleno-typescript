import {EventEmitter} from 'events';

export enum PizzaCrust {
  NORMAL =   0,
  DEEP_DISH,
  THIN,
};

export const PizzaToppings = {
  NONE:           0,
  PEPPERONI:      1 << 0,
  MUSHROOMS:      1 << 1,
  EXTRA_CHEESE:   1 << 2,
  BLACK_OLIVES:   1 << 3,
  CANADIAN_BACON: 1 << 4,
  PINEAPPLE:      1 << 5,
  BELL_PEPPERS:   1 << 6,
  SAUSAGE:        1 << 7,
};

export enum PizzaBakeResult {
  HALF_BAKED= 0,
  BAKED,
  CRISPY,
  BURNT,
  ON_FIRE,
};

export class Pizza extends EventEmitter {
  toppings = PizzaToppings.NONE;
  crust = PizzaCrust.NORMAL; 

  bake(temperature: number) {
    var time = temperature * 10;
    console.log('baking pizza at', temperature, 'degrees for', time, 'milliseconds');
    setTimeout(() => {
      const result =
        (temperature < 350) ? PizzaBakeResult.HALF_BAKED:
        (temperature < 450) ? PizzaBakeResult.BAKED:
        (temperature < 500) ? PizzaBakeResult.CRISPY:
        (temperature < 600) ? PizzaBakeResult.BURNT:
                              PizzaBakeResult.ON_FIRE;
      this.emit('ready', result);
    }, time);
  }
};
