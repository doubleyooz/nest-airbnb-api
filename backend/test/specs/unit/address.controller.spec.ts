import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../../../src/models/addresses/address.controller';
import { AddressService } from '../../../src/models/addresses/address.service';
import { add1, add3_fake } from '../../mocks/address.mock';

describe('AddressController', () => {
    let controller: AddressController;

    const mockAddressService = {
        createaddress: jest.fn((dto) => {
            return {
                ...dto,
            };
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AddressController],
            providers: [AddressService],
        })
            .overrideProvider(AddressService)
            .useValue(mockAddressService)
            .compile();

        controller = module.get<AddressController>(AddressController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a address', () => {
        expect(controller.create(add1)).toEqual({
            street: expect.stringMatching(add1.street),
            city: expect.stringMatching(add1.city),
            state: expect.stringMatching(add1.state),
            zipCode: expect.stringMatching(add1.zipCode),
            country: expect.stringMatching(add1.country),
        });
    });
});
