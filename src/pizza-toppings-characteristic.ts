
import bleno from '@abandonware/bleno';
import {Pizza} from './pizza';
import { getCharacteristicUuid } from './ServiceDefinition';

export class PizzaToppingsCharacteristic extends bleno.Characteristic {
  constructor(public pizza: Pizza) {
    super({
      uuid: getCharacteristicUuid('Pizza', 'pizzaToppings'),
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Gets or sets the pizza toppings.'
        }),
      ],
    });
  }
  
  onWriteRequest(data: Buffer, offset: number, withoutResponse: boolean, callback: (result: number) => void) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 2) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
      this.pizza.toppings = data.readUInt16BE(0);
      console.log("New pizza toppings setting:", this.pizza.toppings);
      callback(this.RESULT_SUCCESS);
    }
  }

  onReadRequest(offset: number, callback: (result: number, data?: Buffer) => void) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, void 0);
    }
    else {
      var data = new Buffer(2);
      data.writeUInt16BE(this.pizza.toppings, 0);
      console.log("Read toppings request returning:", this.pizza.toppings);
      callback(this.RESULT_SUCCESS, data);
    }
  }
};
