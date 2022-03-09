import bleno from '@abandonware/bleno';
import {Pizza} from './pizza';
import { getCharacteristicUuid } from './ServiceDefinition';


export class PizzaBakeCharacteristic extends bleno.Characteristic {
  constructor(public pizza: Pizza) {
    super({
      uuid: getCharacteristicUuid('Pizza', 'pizzaBake'),
      properties: ['notify', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Bakes the pizza and notifies when done baking.'
        })
      ]
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
      var temperature = data.readUInt16BE(0);
      console.log(`Preparing to write new temperature: ${temperature}`);
      this.pizza.once('ready', result => {
        if (this.updateValueCallback) {
          var data = new Buffer(1);
          data.writeUInt8(result, 0);
          this.updateValueCallback(data);
          console.log("Called update value callback:", data);
        }
      });
      this.pizza.bake(temperature);
      callback(this.RESULT_SUCCESS);
    }
  }
};
