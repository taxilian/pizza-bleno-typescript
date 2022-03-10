
// Must be set before bleno is included the first time
import os from 'os';
const name = `PizzaSquat-${os.hostname()}`;
process.env.BLENO_DEVICE_NAME = name;

//
// Pizza
// * has crust
// * has toppings
// * can be baked
//
import {Pizza} from './pizza';

//
// The BLE Pizza Service!
//
import {PizzaService} from './pizza-service';

//
// A name to advertise our Pizza Service.
//
const pizzaService = new PizzaService(new Pizza());


//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
import bleno from '@abandonware/bleno';

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [pizzaService.uuid], function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("begin advertising...");
      }
    });
  }
  else {
    console.log("Stop advertising");
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('Advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      pizzaService
    ]);
  } else {
    console.warn("Error advertising: ", err);
  }
});

bleno.on("accept", address => console.log("Accept", address));
bleno.on("addressChange", address => console.log("addressChange", address));
bleno.on("advertisingStart", err => console.log("Advertising... ", err));
bleno.on("advertisingStartError", err => console.log("Advertising start error", err));
bleno.on("advertisingStop", () => console.log("Advertising Stop"));
bleno.on("disconnect", address => console.log(`Disconnect from ${address}`));
bleno.on("mtuChange", mtu => console.log("New MTU", mtu));
bleno.on('platform', platform => console.log(`Platform: ${platform}`));
bleno.on("rssiUpdate", rssi => console.log(`RSSI: ${rssi}`) );
bleno.on("servicesSet", err => console.log(`Services set`, err) );
bleno.on("servicesSetError", err => console.log(`Services set err:`, err) );
bleno.on("stateChange", newState => console.log("State Change", newState));
