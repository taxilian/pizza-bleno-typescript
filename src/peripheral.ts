//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
import bleno from '@abandonware/bleno';

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
const name = 'RichardLovesPi';
const pizzaService = new PizzaService(new Pizza());

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
