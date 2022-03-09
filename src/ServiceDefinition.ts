export const def = {
  services: {
    Pizza: {
      uuid: '13333333-3333-3333-3333-333333333337',
      characteristics: {
        pizzaCrust: {
          uuid: '13333333-3333-3333-3333=333333330001',
        },
        pizzaToppings: {
          uuid: '13333333-3333-3333-3333=333333330002',
        },
        pizzaBake: {
          uuid: '13333333-3333-3333-3333=333333330003',
        },
      }
    }
  }
};

type ServiceType = keyof (typeof def)['services'];
type CharacteristicType<S extends ServiceType = ServiceType> = keyof ((typeof def)['services'][S]['characteristics']);

type foo = CharacteristicType<'Pizza'>;

export function getServiceUuid(service: keyof (typeof def)['services']) {
  return def.services[service].uuid?.replace(/-/g, '');
}
export function getCharacteristicUuid<S extends ServiceType>(service: S, characteristic: CharacteristicType) {
  return def.services[service].characteristics[characteristic].uuid?.replace(/-/g, '');
}

export default def;
