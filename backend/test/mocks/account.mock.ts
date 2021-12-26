import { Account } from '../../src/models/accounts/interfaces/account.interface';
const acc1: Account = {
    firstName: 'Jojo',
    lastName: 'Souza',
    password: 'asdkaXs@3123',
    email: 'email@gmail.com',
    birthDate: new Date('2000-06-25'),
};
const acc2: Account = {
    firstName: 'Kaka',
    lastName: 'Mantega',
    password: 'adasda@Sd3123',
    email: 'email2@email.com',
    birthDate: new Date('2001-02-13'),
};

const acc3_fake: Account = {
    firstName: 'John',
    lastName: 'Mario',
    password: 'adasdad3123',
    email: 'email2@emacom',
    birthDate: new Date('1980-03-21'),
};
export { acc1, acc2, acc3_fake };
