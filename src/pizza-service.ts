import bleno from '@abandonware/bleno';
import {Pizza} from './pizza';

import {PizzaCrustCharacteristic} from './pizza-crust-characteristic';
import {PizzaToppingsCharacteristic} from './pizza-toppings-characteristic';
import {PizzaBakeCharacteristic} from './pizza-bake-characteristic';
import { getServiceUuid } from './ServiceDefinition';

export class PizzaService extends bleno.PrimaryService {
  constructor(public pizza: Pizza) {
    super({
      uuid: getServiceUuid('Pizza'),
      characteristics: [
        new PizzaCrustCharacteristic(pizza),
        new PizzaToppingsCharacteristic(pizza),
        new PizzaBakeCharacteristic(pizza)
      ]
    });
  }
};
