import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GoogleMapsApiModule } from '../google-maps-api/google-maps-api.module';
import { GoogleMapsApiService } from '../google-maps-api/google-maps-api.service';
import User from '../users/entity/users.entity';
import { AddressService } from './address.service';
import CreateAddressDto from './dto/create-address.dto';
import Address from './entity/address.entity';

describe('AddressService', () => {
  let service: AddressService;
  let spyGoogleMapsApiService: jest.SpyInstance;
  const address = {
    lat: '-23.564',
    lng: '-46.654',
  };
  const user = {
    id: 1,
    email: 'test@email.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: {
            create: jest.fn().mockReturnValue(address),
          },
        },
      ],
      imports: [GoogleMapsApiModule],
    }).compile();

    service = module.get<AddressService>(AddressService);
    spyGoogleMapsApiService = jest.spyOn(
      GoogleMapsApiService.prototype,
      'getCoordinates',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a new address for the user', async () => {
    const address: CreateAddressDto = {
      street: 'Street 1',
      number: '1',
      city: 'City 1',
      state: 'State 1',
      postalCode: '12345',
    };
    const userInstance = new User();

    userInstance.id = user.id;
    userInstance.email = user.email;
    spyGoogleMapsApiService.mockResolvedValueOnce(address);
    jest.spyOn(userInstance, 'save').mockResolvedValueOnce(userInstance);

    const newUser = await service.createAddress({
      address,
      user: userInstance,
    });
    expect(newUser).toEqual(userInstance);
    expect(spyGoogleMapsApiService).toHaveBeenCalledWith(address);
  });

  it('Should throw an error if address is not valid', async () => {
    const address: CreateAddressDto = {
      street: 'Street 1',
      number: '1',
      city: 'City 1',
      state: 'State 1',
      postalCode: '12345',
    };
    const userInstance = new User();

    userInstance.id = user.id;
    userInstance.email = user.email;
    spyGoogleMapsApiService.mockRejectedValueOnce(new Error('Invalid address'));

    await expect(
      service.createAddress({
        address,
        user: userInstance,
      }),
    ).rejects.toThrow('Invalid address');
  });
});
