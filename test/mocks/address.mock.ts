import { Address } from '../../src/models/addresses/interfaces/address.interface';
const add1: Address = {
    street: 'Saint street',
    city: 'New Hamburg',
    state: 'Texas',
    zipCode: '12992335',
    country: 'United States',
    references: 'next door'
};
const add2: Address = {
    street: 'Groove street',
    city: 'Los Angeles',
    state: 'California',
    zipCode: '13213123',
    country: 'United States'
};

const add3_fake: Address = {
    street: 'Groove street',
    city: 'Los Angeles',
    state: 'California',
    zipCode: '13213123',
    country: 'Brazil'
};
export { add1, add2, add3_fake };
