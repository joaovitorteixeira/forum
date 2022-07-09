import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './entity/users.entity';
import { UsersService } from './users.service';
import * as sinon from 'sinon';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import UserRegisterDto from './dto/user-register.dto';

describe('UsersService', () => {
  const userCreate: UserRegisterDto = {
    email: 'test@email.com',
    firstName: 'Test',
    lastName: 'User',
    telephone: '123456789',
    password: 'test',
    confirmPassword: 'test',
    address: {
      number: '1',
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      postalCode: '12345',
    },
  };
  const userId = 1;
  let service: UsersService;

  beforeEach(async () => {
    const { address, ...user } = userCreate;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(user),
            findOne: jest.fn().mockResolvedValue({ ...user, id: userId }),
          },
        },
      ],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Should create a new user', async () => {
    const { address, ...userExpected } = userCreate;
    const spyEventEmitter = sinon.spy(EventEmitter2.prototype, 'emit');

    await expect(service.register(userCreate)).resolves.toEqual(userExpected);
    expect(spyEventEmitter.calledOnce).toBe(true);
    expect(
      spyEventEmitter.calledWith('user.created', {
        address,
        user: userExpected,
      }),
    ).toBe(true);
  });

  it('Should find a user by id', async () => {
    const { address, ...baseUser } = userCreate;
    const userExpected = { ...baseUser, id: userId };

    await expect(service.findOne(userId)).resolves.toEqual(userExpected);
  });

  it('Should find a user by email', async () => {
    const { address, ...baseUser } = userCreate;
    const userExpected = { ...baseUser, id: userId };

    await expect(service.findOne(userExpected.email)).resolves.toEqual(
      userExpected,
    );
  });
});
