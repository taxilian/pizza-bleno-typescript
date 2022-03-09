import bleno from '@abandonware/bleno';
import {Pizza, PizzaCrust} from './pizza';
import { getCharacteristicUuid } from './ServiceDefinition';

export class PizzaCrustCharacteristic extends bleno.Characteristic {
  constructor(public pizza: Pizza) {
    super({
      uuid: getCharacteristicUuid('Pizza', 'pizzaCrust'),
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Gets or sets the type of pizza crust.'
        })
      ]
    });
  }
  
  onWriteRequest(data: Buffer, offset: number, withoutResponse: boolean, callback: (result: number) => void) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 1) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
      var crust = data.readUInt8(0);
      switch (crust) {
        case PizzaCrust.NORMAL:
        case PizzaCrust.DEEP_DISH:
        case PizzaCrust.THIN:
          this.pizza.crust = crust;
          console.log(`Setting pizza crust to ${crust}`);
          callback(this.RESULT_SUCCESS);
          break;
        default:
          callback(this.RESULT_UNLIKELY_ERROR);
          break;
      }
    }
  }

  onReadRequest(offset: number, callback: (result: number, data?: Buffer) => void) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else {
      var data = new Buffer(1);
      console.log(`Read request for crust: returning ${this.pizza.crust}`);
      data.writeUInt8(this.pizza.crust, 0);
      callback(this.RESULT_SUCCESS, data);
    }
  }
}
