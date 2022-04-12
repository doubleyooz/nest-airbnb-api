import { Test, TestingModule } from '@nestjs/testing';
import { Address } from '../../../src/models/addresses/interfaces/address.interface';
import { AddressController } from '../../../src/models/addresses/address.controller';
import { AddressService } from '../../../src/models/addresses/address.service';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../../../src/models/addresses/address.entity';
import { add1, add2, add3_fake } from '../../mocks/address.mock';
import { getMessage } from '../../../src/common/helpers/message.helper';

describe('AddressService', () => {
    let service: AddressService;

    const temp1 = { ...add1 };
    const temp2 = { ...add2 };

    const mockAddressRepository = {
        createAddress: jest.fn().mockImplementation((dto) => dto),
        findByProp: jest.fn().mockImplementation(() => {
            return [
                { id: 'a', ...temp1 },
                { id: 'b', ...temp2 },
            ];
        }),
        findById: jest.fn().mockImplementation((str: object) => {
            const keys = Object.keys(str);
            const result =
                temp1[keys[0]] === str[keys[0]]
                    ? { id: 'a', ...temp1 }
                    : temp2[keys[0]] === str[keys[0]]
                    ? { id: 'b', ...temp2 }
                    : 'a' === str[keys[0]]
                    ? { id: 'a', ...temp1 }
                    : 'b' === str[keys[0]]
                    ? { id: 'b', ...temp2 }
                    : undefined;

            if (!result) {
                throw new NotFoundException(getMessage('address.notfound'));
            }
            return result;
        }),
        deleteById: jest
            .fn()
            .mockImplementation((_id: string) => {
               
                const result =
                    'a' === _id
                        ? { id: 'a', ...temp1 }
                        : 'b' === _id
                        ? { id: 'b', ...temp2 }
                        : undefined;

                if (!result) {
                    throw new NotFoundException(getMessage('address.notfound'));
                }
            }),
    };
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AddressController],
            providers: [
                AddressService,
                {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: mockAddressRepository,
                },
            ],
        }).compile();

        service = module.get<AddressService>(AddressService);
    });

    it('should be defined', async () => {
        expect(service).toBeDefined();
    });

    it('should create an address', async () => {
        expect(await service.createAddress(temp1)).toEqual({
            street: add1.street,
            city: add1.city,
            state: add1.state,
            zipCode: add1.zipCode,
            country: add1.country,
        });

        expect(mockAddressRepository.createAddress).toBeCalledWith(temp1);
    });

    it('should list by property searched', async () => {
        expect(await service.findByProp({street: add1.street})).toEqual([
            {
                id: expect.any(String),
                street: add1.street,
                city: add1.city,
                state: add1.state,
                zipCode: add1.zipCode,
                country: add1.country,
            }
        ]);

        expect(mockAddressRepository.findByProp).toBeCalledWith({street: add1.street});
    });

    it('should find an address by its id', async () => {
        expect(await service.findById(temp1._id)).toEqual({
            _id: expect.any(String),
            street: temp1.street,
            city: temp1.city,
            state: temp1.state,
            zipCode: temp1.zipCode,
            country: temp1.country,
        });

        // prettier-ignore
        expect(mockAddressRepository.findById).toBeCalledWith(temp1._id);

        expect(await service.findById(temp2._id)).toEqual({
            _id: expect.any(String),
            street: temp1.street,
            city: temp1.city,
            state: temp1.state,
            zipCode: temp1.zipCode,
            country: temp1.country,
        });

        // prettier-ignore
        expect(mockAddressRepository.findById).toBeCalledWith(temp2._id);

        try {           
            expect(await await service.findById(add1.country)).toThrow(
                NotFoundException,
            );
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe(getMessage('address.notfound'));
        }

        // prettier-ignore
        expect(mockAddressRepository.findById).toBeCalledWith(add1.country);
    });


});
